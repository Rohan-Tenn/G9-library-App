import { useEffect, useState } from "react";

export default function OverdueLoans() {
  const [overdueLoans, setOverdueLoans] = useState([]);

  useEffect(() => {
    const fetchOverdueLoans = async () => {
      const res = await fetch("http://localhost:5000/api/loans/overdue");
      const data = await res.json();
      setOverdueLoans(data);
    };
    fetchOverdueLoans();
  }, []);

  return (
    <div>
      <h2>Overdue Books & Fines:</h2>
      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Patron ID</th>
            <th>Book ID</th>
            <th>Due Date</th>
            <th>Days Overdue</th>
            <th>Fine</th>
            
          </tr>
        </thead>
        <tbody>
          {overdueLoans.map((loan) => (
            <tr key={loan.LOAN_ID}>
              <td>{loan.LOAN_ID}</td>
              <td>{loan.PATRON_ID}</td>
              <td>{loan.BOOK_ID}</td>
              <td>{new Date(loan.DUE_DATE).toLocaleDateString()}</td>
              <td>{loan.DAYS_OVERDUE?.toFixed(0)}</td>
              <td>${loan.OVERDUE_FEE?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}