import { useEffect, useState } from "react";
import styles from "./instructionsComponent.module.css";
import {
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  useSignMessage,
} from "wagmi";
import { createPublicClient, getContractAddress, http } from "viem";
import { mainnet } from "viem/chains";
import config from "../../../backend/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import { getContract } from "@wagmi/core";
import { publicProvider } from "wagmi/providers/public";
import { useContractEvent } from "wagmi";
import VoteComponent from "./voteComponent";
import QueryComponent from "./queryComponent";
import DelegateComponent from "./delegateComponent";

export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>Ballot Dapp</h1>
        </div>
      </header>
      <div className={styles.get_started}>
        <VoteComponent></VoteComponent>
        <DelegateComponent></DelegateComponent>
        <QueryComponent></QueryComponent>
      </div>
    </div>
  );
}

function PageBody() {
  const { address, isConnected, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  return (
    <div>
      <WalletInfo></WalletInfo>
    </div>
  );
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div>
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>
        <WalletAction></WalletAction>
        <WalletBalance address={address}></WalletBalance>
        <TokenName></TokenName>
        <TokenBalance address={address}></TokenBalance>
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

function WalletAction() {
  const [signatureMessage, setSignatureMessage] = useState("My Input Value");

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();
  return (
    <div>
      <form>
        <label>
          Enter the message to be signed:
          <input
            type="text"
            value={signatureMessage}
            onChange={(e) => setSignatureMessage(e.target.value)}
          />
        </label>
      </form>
      <button
        disabled={isLoading}
        onClick={() =>
          signMessage({
            message: signatureMessage,
          })
        }
      >
        Sign message
      </button>
      {isSuccess && <div>Signature: {data}</div>}
      {isError && <div>Error signing message</div>}
    </div>
  );
}

function WalletBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}

function TokenName() {
  const { data, isError, isLoading } = useContractRead({
    address: "0xCC42724C6683B7E57334c4E856f4c9965ED682bD",
    //"0x10A91764A9D6376c545D9be403C47a458a9C9E03",
    abi: [
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <div>Token name: {name}</div>;
}

function TokenBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useContractRead({
    address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
    abi: [
      {
        constant: true,
        inputs: [
          {
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            name: "balance",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "balanceOf",
    args: [params.address],
  });

  const balance = typeof data === "number" ? data : 0;

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;
  return <div>Balance: {balance}</div>;
}

function RequestTokensToBeMinted(params: { address: `0x${string}` }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  if (isLoading) return <p>Requesting tokens from API ...</p>;
  if (!data) return <p>placeholder for the button</p>;
  return (
    <div>
      <p>Mind success: {data.results ? "worked" : "failed"}</p>
    </div>
  );
}

console.log("Layout: Rendering...");

console.log("Config:", config); // Log the config object to verify if it's set up correctly
const contractConfig = {
  //TODO add address/?
  abi: config.abi,
};

const contract = getContract({
  address: "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70",
  abi: contractConfig.abi,
});
