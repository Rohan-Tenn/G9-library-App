import React, { useEffect, useState } from "react";
import "./Books.css";

const Books = () => {
  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState("");
  const [message, setMessage] = useState("");
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]); 

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/books");
      const data = await res.json();
      setBooks(data);
      setResults(data);
    } catch (err) {
      console.error("Loading Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/api/books/${bookId}` // PUT when editing note
      : "http://localhost:5000/api/books";          // POST when adding note

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          book_id: bookId, 
          title,
          author,
          genre,
          isbn,
          pub_year: year,
        }),
      });

      if (!res.ok) throw new Error("Failed to save book");

      const data = await res.json();
      setMessage(data.message || (isEditing ? "Book Updated" : "Book Added"));

   
      setBookId("");
      setTitle("");
      setAuthor("");
      setGenre("");
      setIsbn("");
      setYear("");
      setIsEditing(false);

      getBooks();
    } catch (err) {
      setMessage(err.message);
    }
  };

    const editBook = (book) => {
      setBookId(book.BOOK_ID);
      setTitle(book.TITLE);
      setAuthor(book.AUTHOR);
      setGenre(book.GENRE);
      setIsbn(book.ISBN);
      setYear(book.PUB_YEAR);
      setIsEditing(true); 
};



  const deleteBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data.message || "Book Deleted");
      getBooks();
    } catch (err) {
      setMessage("Error deleting book: " + err.message);
    }
  };

  const handleSearch = () => {
    const query = search.toLowerCase();
    const filtered = books.filter(
      (book) =>
        book.TITLE.toLowerCase().includes(query) ||
        book.AUTHOR.toLowerCase().includes(query) ||
        book.GENRE.toLowerCase().includes(query)
    );
    setResults(filtered);
  };

  return (
    <div><br /><br /><br /><br /><br /><br /><br />
      <h2>Search Books</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search author or genre"
      />
      <button onClick={handleSearch}>Search by Genre/Author</button>

      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <input value={bookId} onChange={(e) => setBookId(e.target.value)} placeholder="Book ID" readOnly={isEditing}/>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
        <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
        <input value={isbn} onChange={(e) => setIsbn(e.target.value)} placeholder="ISBN" readOnly={isEditing}/>
        <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="Publication Year" />
        <button type="submit">{isEditing ? "Update Book" : "Add Book"}</button>

      </form>

      {message && <p>{message}</p>}

      <h2>{isEditing ? "Edit Book" : "Add New Book"}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Author</th><th>Genre</th>
            <th>ISBN</th><th>Year</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((book) => (
            <tr key={book.BOOK_ID}>
              <td>{book.BOOK_ID}</td>
              <td>{book.TITLE}</td>
              <td>{book.AUTHOR}</td>
              <td>{book.GENRE}</td>
              <td>{book.ISBN}</td>
              <td>{book.PUB_YEAR}</td>
              <td>{book.STATUS}</td>
              <td>
                <button onClick={() => deleteBook(book.BOOK_ID)}>Delete</button>
                <button onClick={() => editBook(book)}>Edit</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;