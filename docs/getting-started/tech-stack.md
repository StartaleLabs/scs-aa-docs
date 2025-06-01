# SCS AA Tech stack

SCS provides a set of infrastructure dedicated to ERC4337 Account Abstraction (AA), designed to simplify smart account development and enable seamless AA integration into your applications, allowing developers to focus on application development and UX enhancement without managing underlying infrastructure.

The SCS AA tech stack includes comprehensive APIs, including ERC-4337 specification-compliant Bundler RPC API and Paymaster API, alongside essential on-chain components such as Paymaster and Smart Account contracts.

Application developers can leverage flexible gas payment options, including sponsorship models that allow end users to perform on-chain activities without holding native tokens, as well as gas payments using ERC-20 tokens. Integrating smart accounts into your applications unlocks a wide range of wallet functionalities and modular extensions, such as social login for simplified user access and session modules that eliminate the need for users to sign on-chain activities with wallet popups repeatedly, and more, enhancing the overall user experience which are explained in later sections.

## Bundler API

Bundler is a fundamental component of the ERC-4337 infrastructure that enables account abstraction on any EVM-compatible network. Its primary role is to manage a new mempool of UserOperations (UOs) and ensure that these UOs are efficiently included on-chain.

To make on-chain activities for smart accounts, end users should submit UOs to the Bundler API rather than sending transactions directly to the blockchain node.

::: info

<b>What is UserOperations (UOs)</b>

Pseudo-transaction object called a `UserOperation` which is used to execute actions through a smart contract account.

:::

## Paymasters

Paymasters are on-chain smart contracts that enable flexible gas payment mechanisms.

One of the main challenges with using EOAs (Externally Owned Accounts) is that wallet owners must acquire native token (e.g. ETH) before they can perform any on-chain actions, creating a significant hurdle for user experience. Paymasters address this issue by abstracting gas payment, allowing an Paymaster contract to cover native token gas costs on behalf of account owner.

Paymasters enable gas sponsorship, allowing dApp developers to cover transaction costs on behalf of users. They also support gas payments using ERC20 tokens, allowing account owners to pay gas fees with tokens while the paymaster covers the gas cost with the native token.

## Paymaster API

The Paymaster API is responsible for providing end users with the signature required for on-chain verification.

To have your User Operations (UOs) sponsored or token payments accepted by SCS Paymasters, you must first obtain a valid paymaster signature from the off-chain Paymaster API. Include this signature in the UO before submitting it to the Bundler. Once the signature is validated by the on-chain Paymaster smart contract, your UO becomes eligible for gas sponsorship or token payments.