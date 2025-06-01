# API specs

## Bundler RPC Spec

Bundler RPC is fully ERC4337 specifications compliant. ERC7769 is for RPC spec of ERC4337 Bundlers.

Check the original spec from Github 👇

[ERCs/ERCS/erc-7769.md at master · ethereum/ERCs](https://github.com/ethereum/ERCs/blob/master/ERCS/erc-7769.md#rpc-methods-eth-namespace)

## Paymaster service API spec


**Base URL:**

`https://public.paymaster.scs.startale.com/v1`

**Format:**

JSON-RPC 2.0 over HTTP

`POST method`

### `pm_getPaymasterData`

Returns a `paymaster` and `paymasterData` based on the provided `UserOperation`.

- **Sponsership PM:** Operations can funded by a paymaster’s sponser account. For now, share you a policy id connected to the paymaster Url that you can use in param which will have ETH to sponser transactions. Only pass PolicyId and not token(value: address of ERC20 token) in this case
- **Token PM:** User Operations can use ERC20 tokens for gas payments using this url. Only pass token(value: address of ERC20 token) and not PolicyId

**Prerequisite data for request:**

- ChainId: 0x79a
- EntryPointAddress: 0x0000000071727De22E5E9d8BAf0edAc6f37da032
- calculateGasLimits: Boolean if gas calculations are required
- token: Check the token supported list
- policyId: This will be shared to you by scs team

#### **Request**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "pm_getPaymasterData",
  "params": [
    <UserOperation>,
    "<EntryPointAddress>",
    "<ChainIdHexOrDecimal>",
    {
      "calculateGasLimits": true,
      "token": "<OptionalTokenAddress>", // Only for ERC20 paymaster
      "policyId": "<OptionalPolicyId>",         // Only for sponsership paymaster
    }
  ]
}
```

#### **Response**

```json
{
  "paymaster": "0x...",
  "paymasterData": "0x...",
  "callGasLimit": "0x...",
  "verificationGasLimit": "0x...",
  "preVerificationGas": "0x...",
  "paymasterVerificationGasLimit": "0x...",
  "paymasterPostOpGasLimit": "0x...",
  "maxFeePerGas": "0x...",
  "maxPriorityFeePerGas": "0x..."
}
```

### `pm_getFeeQuotes`

Returns token-based fee quotes (in ERC20) to cover the gas for the given UserOperation.

This helps users understand:

- What are the supported erc20 tokens for a chain dapp users can use.
- How much of each supported token would be charged based on the calculated gasFee
- Equivalent USD value for the gas fee
- Exchange rates and premium we charge per token
- Other metaData info dapps can use like ticker, token decimal, logoUrl etc

#### **Request**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "pm_getFeeQuotes",
  "params": [
    <UserOperation>,
    "<EntryPointAddress>",
    "<ChainIdHexOrDecimal>",
    {
      "calculateGasLimits": true
    }
  ]
}
```

#### **Response**

```json
{
  "paymasterAddress": "0x...",
  "feeQuotes": [
    {
      "token": "0x...",
      "symbol": "ASTR",
      "decimal": 18,
      "exchangeRate": "0x...",
      "requiredAmount": "0x...",
      "maxGasFee": "0.02197",
      "maxGasFeeUSD": "0.0006",
      "premiumPercentage": 7,
      "logoUrl": "https://..."
    }
    // ...
  ],
	"unsupportedTokens": []
}
```

### `pm_getPaymasterStubData`

Returns a stub `paymasterData` without actual signature logic (useful for gas estimation/simulation).

#### **Request**

Same as `pm_getPaymasterData`.

#### **Response**

```json
{
  "paymaster": "0x...",
  "paymasterData": "0x..."
}

```