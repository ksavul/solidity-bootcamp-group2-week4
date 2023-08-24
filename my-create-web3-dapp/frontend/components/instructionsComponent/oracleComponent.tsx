import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import config from "../../../backend/artifacts/contracts/CallOracle.sol/CallOracle.json";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const contractConfig = {
  abi: config.abi,
};

function QueryComponent() {
  const [result, setResult] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false); // Track button click

  // Add maxTime here, for example, 60 * 60 * 24 * 90 (90 days)
  const maxTime = 60 * 60 * 24 * 90;

  const { data, error } = useContractRead({
    address: "0x199839a4907ABeC8240D119B606C98c405Bb0B33",
    abi: contractConfig.abi,
    functionName: "getBtcSpotPrice",
    args: [maxTime], // Passing maxTime as an argument
  });

  useEffect(() => {
    if (error) {
      console.error("Query error:", (error as Error).message);
    } else if (data && buttonClicked) {
      // Convert the uint256 result to a string for display
      const resultPrice = data.toString();
      setResult(resultPrice);
    }
  }, [data, error, buttonClicked]);

  const handleQuery = () => {
    // Set the buttonClicked state to true on button click
    setButtonClicked(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="20px auto"
    >
      <Typography variant="h4" gutterBottom>
        BTC Price from Oracle
      </Typography>
      <Button variant="contained" color="primary" onClick={handleQuery}>
        Get Price
      </Button>
      {buttonClicked && result && (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="body1">Result: {result} USD</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default QueryComponent;
