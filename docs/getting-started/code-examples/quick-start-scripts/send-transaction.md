# Send transaction

### Prerequisites

Before running the script, make sure these environment variables are set in your .env file:
```env
MAINNET_BUNDLER_URL=<your bundler url>
PAYMASTER_SERVICE_URL=<your paymaster url>
OWNER_PRIVATE_KEY=<your test wallet private key>
```

### 1. Import dependencies

```ts
import "dotenv/config";
import {
  http,
  type Address,
  type Hex,
  createPublicClient
} from "viem";
import {
  type EntryPointVersion,
  entryPoint07Address
} from "viem/account-abstraction";
import { privateKeyToAccount } from "viem/accounts";
import { soneium } from "viem/chains";
import { createSCSPaymasterClient, createSmartAccountClient, toStartaleSmartAccount } from "@startale-scs/aa-sdk";
```

---

### 2. Load environment variables

```ts
const bundlerUrl = process.env.MAINNET_BUNDLER_URL;
const paymasterUrl = process.env.PAYMASTER_SERVICE_URL;
const privateKey = process.env.OWNER_PRIVATE_KEY;

if (!bundlerUrl || !paymasterUrl || !privateKey) {
  throw new Error("BUNDLER_RPC or PAYMASTER_SERVICE_URL or PRIVATE_KEY is not set");
}
```

---

### 3. Setup blockchain and SDK clients

```ts
const chain = soneium;

const publicClient = createPublicClient({
  transport: http(),
  chain,
});

const scsPaymasterClient = createSCSPaymasterClient({
  transport: http(paymasterUrl) as any
});

const signer = privateKeyToAccount(privateKey as Hex);

const entryPoint = {
  address: entryPoint07Address as Address,
  version: "0.7" as EntryPointVersion,
};

const scsContext = {
  calculateGasLimits: true,
  paymasterId: "pm_test_managed"
};
```

---

### 4. Initialize smart account client

```ts
const smartAccountClient = createSmartAccountClient({
  account: await toStartaleSmartAccount({
    signer,
    chain,
    transport: http(),
    index: BigInt(2132),
  }),
  transport: http(bundlerUrl),
  client: publicClient,
  paymaster: scsPaymasterClient,
  paymasterContext: scsContext,
});
```

---

### 5. Send a user operation

Send a simple call (in this case to an example address with no calldata):

```ts
const hash = await smartAccountClient.sendUserOperation({
  calls: [
    {
      // Counter contract for example purposes
      to: "0x2cf491602ad22944D9047282aBC00D3e52F56B37",
      value: BigInt(0),
      data: "0x",
    },
  ],
});

const receipt = await smartAccountClient.waitForUserOperationReceipt({ hash });
console.log("receipt", receipt);
```
