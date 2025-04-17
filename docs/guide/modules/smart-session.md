# ERC-7579 Smart Session Module

## Overview

An **ERC-7579 Smart Session Module** is a plug-in component used in **modular smart accounts** (like those defined in [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337)) to grant **temporary, limited access** to a smart account.

Smart Sessions are especially useful when:
- You want to allow a third party (like a dApp or another wallet) to execute actions on your behalf.
- You want to interact with a dApp from a mobile device or frontend **without re-signing every transaction**.
- You need automation (bots, scheduled tasks) without exposing full control of your wallet.

The session module enables **delegated control** under pre-defined rules, for a **limited time**, optionally **scoped to certain actions or destinations**.

---

## What is a Smart Session?

Think of a Smart Session like a temporary API key for your smart account. It's a signed, time-limited permission slip that lets a delegate (usually another signer or application) execute certain actions on your behalf **without re-authentication**.

It uses cryptographic signatures to prove:
- The session was authorized by the account owner.
- The scope (what operations are allowed).
- The duration (how long the session is valid).

---

## How It Works

### 1. **Session Initialization**
The account owner creates a session by signing a data structure defining:
- Delegate address (who can act).
- Validity window (start time and expiry).
- Permission scope (call targets, function selectors, value limits, etc.).

This is similar to a **meta-transaction**, but for **sessions**.

### 2. **Session Module Integration**
The smart account includes an ERC-7579-compliant **session module** that validates session signatures during execution. It implements logic to:
- Verify the session signature and structure.
- Check expiration and other constraints.
- Allow the delegate to perform authorized operations.

### 3. **Session Execution**
The delegate uses the session signature to **submit a UserOperation** (or equivalent call) on behalf of the owner. The session module handles validation, ensuring it fits within the authorized constraints.

### 4. **Expiration and Revocation**
Sessions are:
- **Self-expiring** based on timestamps.
- Optionally revocable manually (depending on the module implementation).

---

## Why Is It Useful?

Smart Sessions enhance usability and security by **delegating control with granularity**:

| Benefit | Description |
|--------|-------------|
| ✅ UX Improvement | Users can approve a session once and interact freely (e.g., batch mint NFTs, play games, trade on DEXes). |
| ✅ Delegated Automation | Allow bots or scripts to act on your behalf with bounded permissions. |
| ✅ Frontend Wallets | Support session-based login and actions for dApps with mobile or embedded wallets. |
| ✅ Multi-device Sync | Authorize a mobile or browser wallet to act as a secondary device without full access. |
| ✅ Reduced Risk | Sessions are temporary and scoped, reducing attack surface compared to full key sharing. |

---

## Example Use Case

Let's say Alice wants to play a web3 game that makes frequent moves on-chain. She doesn't want to sign every action manually.

1. She authorizes a session for `GameFrontendWallet`:
   - Valid for 2 hours
   - Only allowed to call the game contract
   - Max 0.01 ETH per move

2. The `GameFrontendWallet` uses this session to send moves autonomously.

3. After 2 hours, the session expires. No further access is possible.

---

## Compatibility

Smart Session Modules are built to plug into **ERC-7579-compliant smart accounts**, like those implemented by [Kernel](https://www.zerodev.app/blog/kernel-account-abstraction/).

To integrate, the smart account must:
- Support the ERC-7579 module interface.
- Include the session module in its registry.
- Implement the `validateUserOp` hook to call into the session validator.

---

## References

- [ERC-7579: Modular Smart Accounts](https://eips.ethereum.org/EIPS/eip-7579)
- [ZeroDev Kernel Architecture](https://www.zerodev.app/blog/kernel-account-abstraction/)
- [EIP-4337: Account Abstraction](https://eips.ethereum.org/EIPS/eip-4337)
