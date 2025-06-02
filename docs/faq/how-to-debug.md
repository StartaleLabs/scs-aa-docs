# 🛠️ **Debugging Guide for UserOperations in Account Abstraction**

When sending a `UserOperation` to the bundler, it can sometimes be unclear if it was included in a block or reverted. Here's how you can debug step-by-step.

---

## 1️⃣ Understanding Bundler's Receipt via `eth_getUserOperationByHash`

The first step is to poll the bundler to check if the `UserOperation` has been included using:

```jsx
const response = await fetch(BUNDLER_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getUserOperationByHash",
    params: [userOpHash],
  }),
});
```

The response structure looks like this if the `UserOperation` has been included:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "userOperationHash": "0x...",
    "sender": "0x...",
    "nonce": "0x0",
    "paymaster": "0x...",
    "transactionHash": "0x...",
    "success": true,
    "reason": null,
    "gasUsed": "0x...",
    "actualGasCost": "0x..."
  }
}
```

> ✅ transactionHash present → Operation was included
> ❌ **transactionHash null** → Still pending or dropped

If `success` is `false`, you may also see a `reason` field with the revert reason (if the bundler captured it).

---

## 2️⃣ Checking Block Explorer (Blockscout)

If the `transactionHash` is present, go to the testnet block explorer like:

```jsx
- https://explorer-testnet.soneium.org/tx/<transactionHash>
- https://soneium-minato.blockscout.com/tx/<transactionHash>
```

You'll see the following:

- **Status:** Success or Failed
- **Gas used / Actual cost**
- **Logs & Events** (Useful for checking emitted logs or debugging)
- **Function call data** (decoded input data)

**Blockscout** also now supports ERC-4337-specific views for `UserOperations`. Look for:

- UserOp Hash
- Sender (smart account)
- Paymaster used
- EntryPoint contract
- Bundler address

> If status is failed, check:
> - Whether the smart account was deployed
> - `initCode` was correct
> - Paymaster had enough balance or permission
> - `revertReason` from bundler response (if any)

---

## 3️⃣ Using Tenderly for Deep Debugging

To debug deeper (like step-by-step trace of contract calls), you can use Tenderly:

### ✅ How to Use Tenderly:

1. **Find your transaction hash** via the bundler receipt or blockscout.
2. Open:

```jsx
https://dashboard.tenderly.co/public/<your-project>/tx/<transactionHash>
```

Replace `<your-project>` with your public project name if you have one. If you're using a private workspace, login to Tenderly and go to the transaction dashboard.

3. **View Execution Trace:**
   - See all internal contract calls
   - Hover over steps to view decoded inputs and return values
   - Identify the exact contract and function where failure occurred
4. **Check Gas Report & State Changes:**
   - Analyze which call consumed how much gas
   - Inspect changes to smart contract storage

> 🔍 You can even fork the transaction and simulate fixes directly in Tenderly.

---

### ⚙️ Simulating `UserOperation`s in Tenderly

Simulating a `UserOperation` in Tenderly can help catch failures **before** sending it to the bundler. It provides detailed traces, reverts, and state diffs which make debugging super intuitive.

---

### 🧪 Why Use Simulation?

Before sending a `UserOperation`, it's good practice to simulate it using either:

- `EntryPoint.simulateValidation()` – to check if the bundler would accept it.
- `EntryPoint.simulateHandleOp()` – to simulate full execution including `execute()` call.
- Or simulate the full `eth_sendUserOperation` payload directly in Tenderly!

---

### 🚀 Steps to Simulate a UserOperation in Tenderly

### 1️⃣ Create a Fork or Project in Tenderly

- Go to Tenderly Dashboard
- Create a **new project** or use an existing one.
- Create a **fork** of your target network (e.g., Base Sepolia, Soneium Testnet)

---

### 2️⃣ Prepare Your Payload

Prepare the full `UserOperation` as JSON that you'd send to the bundler:

```json
{
  "sender": "0xYourSmartAccount",
  "nonce": "0x0",
  "initCode": "0x...",
  "callData": "0x...",
  "callGasLimit": "0x...",
  "verificationGasLimit": "0x...",
  "preVerificationGas": "0x...",
  "maxFeePerGas": "0x...",
  "maxPriorityFeePerGas": "0x...",
  "paymaster": "0xYourPaymaster",
  "paymasterData": "0x...",
  "signature": "0x..."
}
```

---

### 3️⃣ Open Tenderly Simulator

- Go to your **Fork** in Tenderly
- Click **"Simulate Transaction"** → then choose **Custom Call**

Set the parameters:

- **From:** `EntryPoint` contract address
- **To:** `EntryPoint` contract address
- **Input:** ABI-encoded call to `handleOps([userOp], beneficiary)`

> You can encode this using ethers.js:

```jsx
entryPointInterface.encodeFunctionData("handleOps", [[userOp], beneficiary])
```

Set:

- **Gas limit**: sufficiently high (e.g., `10,000,000`)
- **Value**: 0
- **State override**: You can override the `sender` smart account storage if it’s not deployed yet

---

### 4️⃣ Run the Simulation

Click **Simulate**. You’ll see:

- 📍 Every internal call
- 🔥 Revert reasons
- 📊 Gas breakdown
- 🧠 State diffs
- 🧵 Stack traces with contract-level debug

---

### 🧙‍♀️ Pro Tips

- If your smart account isn't deployed yet, simulate with `initCode` and override its nonce or code hash in the state override tab.
- For Paymaster failures, ensure you override the paymaster's storage/balance if needed.
- Use the Tenderly CLI to script simulations in CI pipelines (e.g., before sending real UserOps).

---

### ✅ Example Debug Flow with Tenderly

1. Generate the UserOp off-chain using your SDK
2. Encode the `handleOps([userOp], beneficiary)` call
3. Simulate in Tenderly using your fork
4. If simulation fails:
   - Check `signature`
   - Check `initCode` is correct
   - Confirm Paymaster is funded/whitelisted
   - Inspect revert reason inside your smart account logic

---

### ✅ Final Tips

- If the transaction is not included after retries, check if:
   - Your bundler is alive and reachable.
   - Your `UserOperation` passed all simulation checks (e.g., `simulateValidation`).
   - Gas limits are correctly estimated and funded.

- Use console logs in your scripts to track:

```ts
console.log("UserOpHash:", userOpHash);
console.log("TransactionHash:", result.result?.transactionHash);
console.log("Revert reason:", result.result?.reason);
```

- Reach out to us on one of the support channels if you are still not able to pass a successful transaction.

---

- can use this to paste some things
https://docs.zerodev.app/sdk/faqs/debug-userop

- if sendUserOperation fails you can use the entire userOperation from the logs and simulate that on the entrypoint handleOps method

example simulation: https://www.tdly.co/shared/simulation/b0c33852-4323-43c2-ad90-dc73dcbf4d37

- if anything fails at the gas estimation stage then you can simulate for validateUserOp() or validatePaymasterUserOp()

examples:
https://www.tdly.co/shared/simulation/a9e766aa-44f5-49fc-b518-200c35e84333

https://www.tdly.co/shared/simulation/76adbc0b-f12f-45ed-b50f-2924d57c5a0c

(one can click on re-simulate and enter their own data. make sure to use latest block accordingly and right from address-entrypoint for example)

- If userOp calldata fails( the actual execution smart account is doing. approve / swap etc for example) then one can directly put calldata on smart account address from entrypoint. which is calldata for execute method
example
https://dashboard.tenderly.co/livingrock7/project/simulator/eae3e1b9-8b88-489f-ac61-7941b13256f3

- Sometimes we get errors in hex format and it is tricky to decode function signature or error signature from 4 bytes. Below tools are recommended to get more insight

https://openchain.xyz/signatures
https://www.4byte.directory/

- Generic decode of calldata can be done by below tool
https://calldata.swiss-knife.xyz/decoder