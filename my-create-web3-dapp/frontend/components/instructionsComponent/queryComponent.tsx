import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
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

  const { data, error } = useContractRead({
    address: "0x36568e371Ab51Fa70FF8A3Ac524cAe0B8bBD9BA7",
    abi: contractConfig.abi,
    functionName: "winnerName", // You need to specify the function name of your contract that you want to call
  });

  useEffect(() => {
    if (error) {
      console.error("Query error:", (error as Error).message);
    } else if (data && buttonClicked) {
      // Check if button is clicked before displaying the result
      // Convert the bytes32 result to a string manually
      const resultString = bytes32ToString(data as string);
      setResult(resultString);
    }
  }, [data, error, buttonClicked]);

  const bytes32ToString = (bytes32: string) => {
    // Remove the 0x prefix and convert to a string
    let str = "";
    for (let i = 2; i < bytes32.length; i += 2) {
      const charCode = parseInt(bytes32.substr(i, 2), 16);
      if (charCode !== 0) {
        str += String.fromCharCode(charCode);
      }
    }
    return str;
  };

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
        Winner of ballot
      </Typography>
      <Button variant="contained" color="primary" onClick={handleQuery}>
        Get Winner
      </Button>
      {buttonClicked && result && (
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="body1">Result: {result}</Typography>
        </Paper>
      )}
    </Box>
  );
}

export default QueryComponent;
