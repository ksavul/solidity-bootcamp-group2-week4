import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Box, Typography } from "@mui/material";

function MintTokensForm() {
  const [formData, setFormData] = useState({ address: "", amount: "" });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/mint-tokens",
        formData
      );
      console.log("Minting response:", response.data);
      // You can handle the response here (e.g., show a success message)
    } catch (error) {
      console.error("Error minting tokens:", error);
      // Handle errors here (e.g., show an error message)
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      margin="20px auto"
      alignItems="center"
    >
      <Typography variant="h4">Mint Tokens</Typography>
      <div
        style={{
          width: "100%", // Initially, set the width to 100% to take full container width
          maxWidth: "270px", // Set the maximum width for larger screens
          margin: "0 auto", // Center-align the container
        }}
      >
        {" "}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <Box marginTop={2}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              required
            />
          </Box>
          <Box marginTop={2}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Mint Tokens
            </Button>
          </Box>
        </form>
      </div>
    </Box>
  );
}

export default MintTokensForm;
