import React, { useState, useEffect } from "react";
import './Home.css';

const Home = () => {
  const [bookCount, setBookCount] = useState(0);
  const [patronCount, setPatronCount] = useState(0);
  const [loanCount, setLoanCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then(res => res.json())
      .then(data => setBookCount(data.length))
      .catch(err => console.error("Error fetching books:", err));

    fetch("http://localhost:5000/api/patrons")
      .then(res => res.json())
      .then(data => setPatronCount(data.length))
      .catch(err => console.error("Error fetching patrons:", err));

    fetch("http://localhost:5000/api/loans/count")
      .then(res => res.json())
      .then(data => setLoanCount(data.borrowedBooks))
      .catch(err => console.error("Error fetching loans:", err));
  }, []);

  return (
    <div className="navspace">
      <h1>Dashboard</h1>
      <br />
      <p className="dashboard">Books Available: {bookCount}</p>
      <p className="dashboard">Patrons: {patronCount}</p>
      <p className="dashboard">Borrowed Books: {loanCount}</p>
    </div>
  );
};

export default Home;
