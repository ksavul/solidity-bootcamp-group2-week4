import React, { useState } from "react";
import axios from "axios";

function SaveVote() {
  const [formData, setFormData] = useState({
    address: "",
    proposal: "",
    amount: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/save-vote",
        formData
      );
      console.log("Minting response:", response.data);
    } catch (error) {
      console.error("Error minting tokens:", error);
    }
  };

  return (
    <div>
      <h2>Save Votes</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="proposal">Proposal:</label>
          <input
            type="text"
            id="proposal"
            name="proposal"
            value={formData.proposal}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Save Vote</button>
      </form>
    </div>
  );
}

export default SaveVote;
