import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

interface Vote {
  id: number;
  address: string;
  proposal: string;
  amount: string;
}
function VotesTable() {
  const [votes, setVotes] = useState<Vote[]>([]);
  useEffect(() => {
    // Fetch the votes from your database here and set them in the state
    fetch("http://localhost:3001/get-all-votes") // Replace with your API endpoint
      .then((res) => res.json())
      .then((data) => setVotes(data))
      .catch((error) => console.error("Error fetching votes:", error));
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h4" gutterBottom>
        Recent Votes
      </Typography>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Proposal</TableCell>
            <TableCell>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {votes.map((vote) => (
            <TableRow key={vote.id}>
              <TableCell>{vote.id}</TableCell>
              <TableCell>{vote.address}</TableCell>
              <TableCell>{vote.proposal}</TableCell>
              <TableCell>{vote.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default VotesTable;
