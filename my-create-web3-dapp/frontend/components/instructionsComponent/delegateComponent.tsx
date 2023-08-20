import { getContract } from "@wagmi/core";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import React from "react";
import {
  useContractReads,
  PublicClient,
  WalletClient,
  usePrepareContractWrite,
  useContractWrite,
  useContractEvent,
} from "wagmi";
import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";

const contractConfig = {
  abi: config.abi,
};

function DelegateComponent() {
  const contract = getContract({
    address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
    abi: contractConfig.abi,
  });

  const prepareConfig = usePrepareContractWrite({
    address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
    abi: contractConfig.abi,
    functionName: "winnerName",
  });

  const writeContract = useContractWrite(prepareConfig); //TODO figure out a solution here

  const [delegateAddress, setDelegateAddress] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelegate = async () => {
    //will be called when the "Delegate" button is clicked.
    if (writeContract?.write) {
      try {
        // Call the write method with the prepared configuration and arguments
        writeContract.write({
          args: [delegateAddress], // Arguments for the delegate method calls the write method of the writeContract object. It's attempting to execute the delegation action.
          //The write function takes an argument in the form of an object containing various configuration properties.
        });

        if (writeContract.isSuccess) {
          setTransactionStatus("Delegation successful");
          setErrorMessage("");
        } else {
          setErrorMessage("Transaction failed");
          setTransactionStatus("");
        }
      } catch (error) {
        setErrorMessage("Error delegating tokens. Please try again.");
        setTransactionStatus("");
      }
    }
  };

  return (
    <div>
      <h2>Delegate Component</h2>
      <div>
        <label>Delegate Address:</label>
        <input
          type="text"
          value={delegateAddress}
          onChange={(e) => setDelegateAddress(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleDelegate}>Delegate</button>
      </div>
      {transactionStatus && <p>{transactionStatus}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

export default DelegateComponent;
