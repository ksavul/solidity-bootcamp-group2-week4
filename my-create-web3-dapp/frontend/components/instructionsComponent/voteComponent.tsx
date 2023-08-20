import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import { useState } from "react";
import styles from "./instructionsComponent.module.css";
import React from "react";
import { useContractWrite } from "wagmi";

const contractConfig = {
  abi: config.abi,
};

function VoteComponent() {
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [voteAmount, setVoteAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: "0x36568e371Ab51Fa70FF8A3Ac524cAe0B8bBD9BA7",
    abi: contractConfig.abi,
    functionName: "vote",
  });

  const handleVote = async () => {
    try {
      await write({
        args: [selectedProposal, Number(voteAmount)],
      });
      // Reset form fields after successful vote
      setSelectedProposal(0);
      setVoteAmount("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error casting vote. Please try again.");
    }
  };

  return (
    <div>
      <h2>Vote Component</h2>
      <div>
        <label>Select Proposal:</label>
        <select
          value={selectedProposal}
          onChange={(e) => setSelectedProposal(Number(e.target.value))}
        >
          <option value={0}>Proposal 1</option>
          <option value={1}>Proposal 2</option>
          {/* Add more options for each proposal */}
        </select>
      </div>
      <div>
        <label>Vote Amount:</label>
        <input
          type="number"
          value={voteAmount}
          onChange={(e) => setVoteAmount(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleVote}>Vote</button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default VoteComponent;
