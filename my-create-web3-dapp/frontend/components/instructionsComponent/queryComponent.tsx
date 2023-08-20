import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { getContract } from "@wagmi/core";
import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";

const contractConfig = {
  abi: config.abi,
};

const contract = getContract({
  address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
  abi: contractConfig.abi,
});

function QueryComponent() {
  const handleQuery = async () => {
    try {
      const { data, error } = await useContractRead(contract); // need to sort calling the function..Call the method directly?
      if (error) {
        console.error("Query error:", (error as Error).message);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Query error:", (error as Error).message);
    }
  };

  return (
    <div>
      <h2> Winner of ballot</h2>
      <button onClick={handleQuery}>Query</button>
    </div>
  );
}

export default QueryComponent;

/*error' is of type 'unknown'.ts?? type assertions (error as Error)type of the error object as Error. 
   TypeScript needs recognize the type of the error object? */
