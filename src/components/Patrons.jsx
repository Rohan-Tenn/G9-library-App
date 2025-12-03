import React, { useEffect, useState } from "react";
import "./Patrons.css";
const Patrons = () => {


  const [patronId, setPatronId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [membershipNo, setMembershipNo] = useState("");
  const [message, setMessage] = useState("");
  const [patrons, setPatrons] = useState([]);

  const [results, setResults] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getPatrons();
  }, []);

  const getPatrons = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/patrons");
      const data = await res.json();
      setPatrons(data);
      setResults(data);
    } catch (err) {
      console.error("Loading Error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing
      ? `http://localhost:5000/api/patrons/${patronId}` // PUT when editing
      : "http://localhost:5000/api/patrons";            // POST when adding

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patron_id: patronId,
          address,
          phone,
          name,
          membership_no: membershipNo,

        }),
      });

      if (!res.ok) throw new Error("Failed to save patron");

      const data = await res.json();
      setMessage(data.message || (isEditing ? "Patron Updated" : "Patron Added"));

      // reset form
      setPatronId("");
      setName("");
      setAddress("");
      setPhone("");
      setMembershipNo("");
      setIsEditing(false);

      getPatrons();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const editPatron = (patron) => {
    setPatronId(patron.PATRON_ID);
    setName(patron.NAME);
    setAddress(patron.ADDRESS);
    setPhone(patron.PHONE);
    setMembershipNo(patron.MEMBERSHIP_NO);
    setIsEditing(true);
  };

  const deletePatron = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/patrons/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setMessage(data.message || "Patron Deleted");
      getPatrons();
    } catch (err) {
      setMessage("Error deleting patron: " + err.message);
    }
  };



  return (
    <div>


      <h2>{isEditing ? "Edit Patron" : "Add New Patron"}</h2>
      <form onSubmit={handleSubmit}>



        <input
          value={patronId}
          onChange={(e) => setPatronId(e.target.value)}
          placeholder="Patron ID"
          readOnly={isEditing}
        />


        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          readOnly={isEditing}
        />


        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />


        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />


        <input
          value={membershipNo}
          onChange={(e) => setMembershipNo(e.target.value)}
          placeholder="Membership No"
          readOnly={isEditing}
        />

        <button type="submit">
          {isEditing ? "Update Patron" : "Add Patron"}
        </button>
      </form>

      {message && <p>{message}</p>}

      <h2>All Patrons</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Address</th><th>Phone</th><th>Membership No</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((patron) => (
            <tr key={patron.PATRON_ID}>
              <td>{patron.PATRON_ID}</td>
              <td>{patron.NAME}</td>
              <td>{patron.ADDRESS}</td>
              <td>{patron.PHONE}</td>
              <td>{patron.MEMBERSHIP_NO}</td>
              <td>
                <button onClick={() => editPatron(patron)}>Edit Address or Number</button>
                <button onClick={() => deletePatron(patron.PATRON_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patrons;