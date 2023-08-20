import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import React from "react";
import { getContract } from "@wagmi/core";

const contractConfig = {
  abi: config.abi,
};

const contract = getContract({
  address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
  abi: contractConfig.abi,
});

function VoteComponent() {
  const [selectedProposal, setSelectedProposal] = useState(0);
  const [voteAmount, setVoteAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleVote = async () => {
    try {
      await contract.vote(selectedProposal, voteAmount); //TODO fix type error Property 'vote' does not exist on type 'GetContractResult<({ inputs:...
      setErrorMessage("");
      // Reset form fields after successful vote
      setSelectedProposal(0);
      setVoteAmount("");
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
