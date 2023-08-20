# Ballot dApp README

## Overview:
This repository houses the Ballot dApp, a decentralized voting application. It offers a suite of tools allowing users to seamlessly participate in a voting system that operates on the blockchain.

## Features:

1. **Voting dApp Core Functionalities**:
    - **Vote Casting**: Enables users to place their votes directly through the dApp.
    - **Vote Delegation**: Offers the flexibility for users to assign their voting rights to another participant.
    - **On-chain Result Queries**: Provides real-time access to voting results, which are stored and can be retrieved from the blockchain.

2. **Backend Vote Storage & Frontend Display** (Bonus Feature):
    - **Recent Vote Storage**: Efficiently captures and saves the latest voting activities within the backend system.
    - **Vote Display**: Provides a user-friendly interface that showcases recent voting patterns and results.

3. **Token Management**:
    - **Token Minting via API**: Facilitates a direct request for minting specific voting tokens. These tokens serve as a gateway for user participation.
    - **Engaging with Tokenized Ballot**: Once acquired, these tokens can be used by users to interact with the token-centric voting system.

4. **Oracle-based Proposal Retrieval** (Bonus Feature):
    - **Dynamic Proposal Source**: Incorporates an oracle system that pulls in proposal data from off-chain sources. This bypasses the traditional approach of hardcoding proposals, making the system more adaptable to varying voting topics.

5. **dApp Interaction Guidelines**:
    - **API-Based Token Requests**: Users can employ a singular POST method to request voting tokens through the integrated API.
    - **On-chain Operations**: Ensuring integrity, all other functionalities, from voting to querying results, occur directly on-chain, negating intermediaries.

## Setup:
1. Clone the repository.
2. Install the necessary dependencies with `npm install`.
3. Make sure the contract addresses and other necessary environment variables are properly configured.
4. Launch the dApp using `npm start`.

## Licensing:
This project operates under the MIT License.

---

*Caution: Always double-check your network and wallet connection before engaging with any dApp functionalities.*
