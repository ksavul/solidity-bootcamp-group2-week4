import VoteComponent from "./voteComponent";
import QueryComponent from "./queryComponent";
import DelegateComponent from "./delegateComponent";
import MintTokensForm from "./mintTokens";
import VotesTable from "./VotesTable";
import SaveVote from "./saveVote";
import OracleComponent from "./oracleComponent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function InstructionsComponent() {
  return (
    <Container component="main" maxWidth="lg">
      <Paper elevation={3} style={{ padding: "24px" }}>
        <Typography variant="h4" gutterBottom>
          Token Voting Instructions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MintTokensForm />
          </Grid>
          <Grid item xs={12} md={6}>
            <DelegateComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <VoteComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <QueryComponent />
          </Grid>
          <Grid item xs={12} md={6}>
            <OracleComponent />
          </Grid>
          <Grid item xs={12} md={12}>
            <VotesTable />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
