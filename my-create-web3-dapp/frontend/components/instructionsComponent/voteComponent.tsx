import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import { useContractWrite } from "wagmi";

const contractConfig = {
  abi: config.abi,
};

function VoteComponent() {
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [voteAmount, setVoteAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { write } = useContractWrite({
    address: "0x36568e371Ab51Fa70FF8A3Ac524cAe0B8bBD9BA7", // Update with your contract address
    abi: contractConfig.abi,
    functionName: "vote",
  });

  const handleVote = async () => {
    try {
      await write({
        args: [selectedProposal, Number(voteAmount)],
      });
      // Reset form fields after a successful vote
      setSelectedProposal(0);
      setVoteAmount("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error casting vote. Please try again.");
    }
  };

  return (
    <Box mt={2} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h4" gutterBottom>
        Vote Component
      </Typography>
      <FormControl variant="outlined" fullWidth sx={{ width: "50%" }}>
        <InputLabel>Select Proposal</InputLabel>
        <Select
          value={selectedProposal}
          onChange={(e) => setSelectedProposal(Number(e.target.value))}
          label="Select Proposal"
        >
          <MenuItem value={0}>Proposal 1</MenuItem>
          <MenuItem value={1}>Proposal 2</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Vote Amount"
        type="number"
        value={voteAmount}
        onChange={(e) => setVoteAmount(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ width: "50%" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleVote}
        sx={{ width: "50%" }}
      >
        Vote
      </Button>
      {errorMessage && (
        <Typography
          color="error"
          variant="body2"
          gutterBottom
          sx={{ width: "50%" }}
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
}

export default VoteComponent;
