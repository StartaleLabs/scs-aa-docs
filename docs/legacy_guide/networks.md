# Supported networks, tokens, account types

## Network information

### Network supported:

|  |  |
| --- | --- |
| Network Name | Soneium Minato |
| ChainId | 1946 |
| Block explorer | https://soneium-minato.blockscout.com/ |
| Native token | ETH |
| Decimal | 18 |
| Entry point version supported | v0.7 |

## Token address list

**Supported tokens and contract addresses: (token)**

|  | Address |
| --- | --- |
| ASTR | 0x26e6f7c7047252DdE3dcBF26AA492e6a264Db655 |
| USDC.e | 0xE9A198d38483aD727ABC8b0B1e16B2d338CF0391 |
| USDC | 0xfF0CBFbA43a1Ce2B8d72B2f3121558BcBd4B03a6 |

## Account types information

This documentation includes usage examples of two different types of Smart Accounts:

1. **Simple Account** - This type controls access to the smart account through an EOA (Externally Owned Account).
2. **Social Login** - This type provides access to the smart account through social login methods.

### Simple Account (EOA)

A **Simple Account** leverages an Externally Owned Account (EOA) to control access to the smart account. This means that the private key associated with the EOA directly signs UOs and smart account contract verifies signatures by EOA public key.
Users still need to manage EOA private keys in traditional way by using EOA wallet (e.g. MetaMask), but can benefit from AA features such as gas abstraction and account modules described in the latter section.

### Social Login

A **Social Login** smart account uses social identity providers to control access. Instead of a private key, the authentication process uses external service like Google, enabling users to make on-chain activities by passing Google authentication.

## Account modules

- Recovery Module
- Session Module