# ⛽ Sponsorship Paymaster Example

This guide helps you set up a smart account and use SCS’s Sponsorship Paymaster using [`startale-aa-sdk`](https://www.npmjs.com/package/startale-aa-sdk), [`@privy-io/react-auth`](https://www.npmjs.com/package/@privy-io/react-auth), and [`viem`](https://viem.sh/).

---

### 🛠️ Prerequisites

Make sure you’ve installed:

```bash
yarn add viem startale-aa-sdk @privy-io/react-auth
```

Also, ensure your app is wrapped in Privy’s `PrivyProvider`.

---

### 🔐 Step 1: Connect Privy & Get EOA Wallet

```jsx
import { usePrivy, useWallets } from "@privy-io/react-auth";

const { authenticated } = usePrivy();
const { wallets } = useWallets();

const provider = await wallets[0].getEthereumProvider(); // EOA provider
const address = wallets[0].address
```

---

### 🧠 Step 2: Create Smart Account (`StartaleSmartAccount`)

```jsx
import { toStartaleSmartAccount } from "startale-aa-sdk";
import { createWalletClient, custom } from "viem";
import { soneiumMinato } from "viem/chains";

const signer = createWalletClient({
  account: address,
  chain: soneiumMinato,
  transport: custom(provider),
});

const startaleAccount = = await toStartaleSmartAccount({
  signer: walletClient, 
  chain: chain,
  transport: http(),
  index: BigInt(0), // Nonce=index for account instance with same EOA signer as controller
});

```

---

### 🧪 Step 3: Create Smart Account Client with Sponsorship Paymaster

```jsx
import { createSmartAccountClient } from "startale-aa-sdk";
import { createPaymasterClient } from "viem/account-abstraction";

const paymasterClient = createPaymasterClient({
  transport: http(PAYMASTER_SERVICE_URL),
});

const smartAccountClient = createSmartAccountClient({
  account: startaleAccount,
  transport: http(BUNDLER_URL),
  client: publicClient, // from `createPublicClient()`
  paymaster: {
    async getPaymasterData(params) {
      params.paymasterPostOpGasLimit = BigInt(100_000);
      params.paymasterVerificationGasLimit = BigInt(200_000);
      params.verificationGasLimit = BigInt(500_000);

      return await paymasterClient.getPaymasterData(params);
    },
    async getPaymasterStubData(params) {
      return await paymasterClient.getPaymasterStubData(params);
    },
  },
  paymasterContext: {
    calculateGasLimits: true,
    policyId: "sudo", // <- Add your policyId, we will share this
  },
  userOperation: {
    estimateFeesPerGas: async () => ({
      maxFeePerGas: BigInt(10_000_000),
      maxPriorityFeePerGas: BigInt(10_000_000),
    }),
  },
});
```

---

### 📦 Final Step: Use the Client to Send Transactions

Once you have `smartAccountClient`, you can use:

```jsx

await smartAccountClient.sendTransaction({
  to: "<recipient>",
  value: BigInt(0),
  data: "0x", // encoded call data
});
```

You can also use modules like Social Recovery or Sessions via `startale-aa-sdk`.

---

### Notes

- Ensure the smart account has been deployed.
- `paymasterContext.policyId` is useful for gated gas sponsorship, we will provide you one
- Use `calculateGasLimits: true` to auto-populate missing gas fields.