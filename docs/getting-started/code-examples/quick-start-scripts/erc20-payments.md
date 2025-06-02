# Using ERC20 Token Paymaster

This guide explains the key steps of using a token-based paymaster to sponsor a UserOperation with a Startale smart account.

This allows gas fees to be paid using ERC-20 tokens such as ASTR.


## Prerequisites

Make sure you have the following environment variables set:

- `MAINNET_BUNDLER_URL`
- `PAYMASTER_SERVICE_URL`
- `OWNER_PRIVATE_KEY`
- `ASTR_MAINNET_ADDRESS`
- `TOKEN_PAYMASTER_PROD_ADDRESS`

---

### 1. Initialize Chain and Clients

Set up the chain, bundler client, and paymaster client.

```ts
const chain = soneium;
const publicClient = createPublicClient({ transport: http(), chain });

const scsPaymasterClient = createSCSPaymasterClient({ transport: http(paymasterUrl) });
```

---

### 2. Prepare Signer and Smart Account

Create signer from private key and initialize the smart account client.

```ts
const signer = privateKeyToAccount(privateKey as Hex);
const smartAccountClient = createSmartAccountClient({
  account: await toStartaleSmartAccount({ signer, chain, transport: http(), index: BigInt(10983) }),
  transport: http(bundlerUrl),
  client: publicClient,
  paymaster: scsPaymasterClient,
  paymasterContext: { calculateGasLimits: true, token: tokenAddress },
});
```

---

### 3. Prepare the UserOperation

Construct a call and prepare the UserOperation object.

```ts
const preparedUserOp = await smartAccountClient.prepareUserOperation({
  calls: [{ to: "0x2cf491602ad22944D9047282aBC00D3e52F56B37", value: 0n, data: "0x" }],
});
```

---

### 4. Get Token Paymaster Quotes

Ask the paymaster for a fee quote (in tokens).

```ts
const quotes = await scsPaymasterClient.getTokenPaymasterQuotes({
  userOp: preparedUserOp,
  chainId: toHex(chain.id),
});
```

---

### 5. Send the Operation via Token Paymaster

Use the quote and token address to send the operation. SDK will append approval automatically.

```ts
const hash = await smartAccountClient.sendTokenPaymasterUserOp({
  calls: [{ to: "0x2cf491602ad22944D9047282aBC00D3e52F56B37", value: 0n, data: "0x" }],
  feeTokenAddress: tokenAddress as Address,
  // or filter based on the desired token address
  customApprovalAmount: BigInt(quotes.feeQuotes[1].requiredAmount),
});
```

---

### 6. Await Receipt

Confirm the transaction succeeded.

```ts
const receipt = await smartAccountClient.waitForUserOperationReceipt({ hash });
console.log("receipt", receipt);
```

---

## Notes

- Make sure the smart account has token balance before calling the paymaster.
- This example uses `sendTokenPaymasterUserOp` which includes the token approval call automatically.
- You can do manual batching instead (see commented code in script).
