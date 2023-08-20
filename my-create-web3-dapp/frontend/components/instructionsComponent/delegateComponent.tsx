import { useState } from "react";
import React from "react";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import config from "../../../backend/artifacts/contracts/ERC20Votes.sol/MyToken.json";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const contractConfig = {
  abi: config.abi,
};

function DelegateComponent() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [delegate, setDelegatee] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const { config } = usePrepareContractWrite({
    address: "0x10a91764a9d6376c545d9be403c47a458a9c9e03",
    abi: contractConfig.abi,
    functionName: "delegate",
  });
  const { write } = useContractWrite(config);

  // Adding console logs
  console.log("Delegate Address:", delegate);
  console.log("Token Address:", tokenAddress);

  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="400px" // Set a fixed width
      margin="20px auto"
    >
      <Typography variant="h4" gutterBottom>
        Delegate Component
      </Typography>
      <Box mb={2} marginTop={2}>
        <TextField
          label="Delegate Address"
          value={delegate}
          onChange={(e) => setDelegatee(e.target.value)}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          // Adding a console log before calling the write function
          console.log("Calling delegate function...");
          write?.();
          console.log("Calling delegate function...FINISHED");
        }}
        sx={{ width: "56%" }}
      >
        Delegate
      </Button>
    </Box>
  );
}

export default DelegateComponent;
