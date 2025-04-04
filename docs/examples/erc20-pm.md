# 💰 ERC20 Token Paymaster Example

Ensure we have a token from supported token list.
For simple you can bridge usdc coin :

Mint USDC on Ethereum Sepolia:

[http://faucet.circle.com](https://t.co/gve4ultmwZ)

Bridge it to Soneium Minato:

[https://soneium.org/en/bridges/](https://t.co/TCOSdMNhcp)

And then transfer it to your smart-account.

:::info
💡 Steps are similar to Sponsorship paymaster except in **STEP 3**, in paymasterContext, we use tokenAddress instead of policyId
:::


```jsx
  {
     //...
     paymasterContext: {
       calculateGasLimits: true,
       tokenAddress: "0xE9A198d38483aD727ABC8b0B1e16B2d338CF0391",//erc20 token
     },
     //...
  }
```