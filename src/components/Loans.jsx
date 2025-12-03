import React, { useEffect, useState } from "react";

const Loans = () => {
  const [loanId, setLoanId] = useState("");
  const [patronId, setPatronId] = useState("");
  const [bookId, setBookId] = useState("");
  const [loanDate, setLoanDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [message, setMessage] = useState("");

  const [loans, setLoans] = useState([]);
  const [overdueLoans, setOverdueLoans] = useState([]);

  useEffect(() => {
    getLoans();
    getOverdueLoans();
  }, []);

  //View All Loans
  const getLoans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/loans");
      const data = await res.json();
      setLoans(data);
    } catch (err) {
      console.error("Error loading loans:", err);
    }
  };

  //View Overdue Loans
  const getOverdueLoans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/loans/overdue");
      const data = await res.json();
      setOverdueLoans(data);
    } catch (err) {
      console.error("Error loading overdue loans:", err);
    }
  };

  // Loan a Book
  const handleLoanSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          loan_id: loanId,
          patron_id: patronId,
          book_id: bookId,
          loan_date: loanDate,
          due_date: dueDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to loan book");

      const data = await res.json();
      setMessage(data.message || "Book loaned successfully");

      // reset form
      setLoanId("");
      setPatronId("");
      setBookId("");
      setLoanDate("");
      setDueDate("");

      getLoans();
    } catch (err) {
      setMessage(err.message);
    }
  };

  //Return a Book
  const returnBook = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/loans/${id}/return`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to return book");

      const data = await res.json();
      setMessage(data.message || "Book Returned Successfully");

      getLoans();
      getOverdueLoans();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h2>Loan a Book</h2>
      <form onSubmit={handleLoanSubmit}>
        <input value={loanId} onChange={(e) => setLoanId(e.target.value)} placeholder="Loan ID" />
        <input value={patronId} onChange={(e) => setPatronId(e.target.value)} placeholder="Patron ID" />
        <input value={bookId} onChange={(e) => setBookId(e.target.value)} placeholder="Book ID" />
        <input value={loanDate} onChange={(e) => setLoanDate(e.target.value)} placeholder="Loan Date (YYYY-MM-DD)" />
        <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date (YYYY-MM-DD)" />
        <button type="submit">Loan Book</button>
      </form>

      {message && <p>{message}</p>}

      <h2>All Loans</h2>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th><th>Patron ID</th><th>Book ID</th>
            <th>Loan Date</th><th>Due Date</th><th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.LOAN_ID}>
              <td>{loan.LOAN_ID}</td>
              <td>{loan.PATRON_ID}</td>
              <td>{loan.BOOK_ID}</td>
              <td>{new Date(loan.LOAN_DATE).toLocaleDateString()}</td>
              <td>{new Date(loan.DUE_DATE).toLocaleDateString()}</td>

              <td>{loan.RETURN_DATE ? new Date(loan.RETURN_DATE).toLocaleDateString() : "Not Returned"}</td>

              <td>{!loan.RETURN_DATE && (<button onClick={() => returnBook(loan.LOAN_ID)}>Return</button>)}</td>

            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  );
};

export default Loans;