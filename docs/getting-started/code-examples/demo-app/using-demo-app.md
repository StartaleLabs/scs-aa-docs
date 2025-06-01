# UI Integration Demo

This demo showcases a decentralized dice-rolling game that utilizes smart accounts (ERC-7579) and session-based execution.
By using a social login provider (Dynamic or Privy), and session keys, users can create a smart contract wallet, execute arbitrary smart contract functions, and test the smart session module by rolling a dice without needing to sign every transaction, enhancing UX while maintaining security.

It also features optional social recovery module functionality.

Demo app: [https://aa-demo.scs.startale.com](https://aa-demo.scs.startale.com/)

Demo repo: [https://github.com/StartaleLabs/scs-aa-demo-ui](https://github.com/StartaleLabs/scs-aa-demo-ui)


## How to Use the Demo

### Prerequisites

- Either a web3 wallet (e.g., MetaMask) connected to the [**Soneium Minato**](https://soneium-minato.blockscout.com/) test network, a Google account, or an email address to receive the sign-in code

- The web3 wallet or social login is used to instantiate the smart contract wallet in this case. In a production environment, you might want to handle this by the service backend.
- All operations are funded by a paymaster, so no funds are needed in the wallet

### Steps

1. **Connect Your Wallet or log in**

   - Open the application and connect your web3 wallet, Google or email account

2. **Instantiate a Smart Account**

   - An account is automatically instantiated, the address is displayed in the output area

3. **(Optional) Add recovery keys**

   - Input a guardian address, and click "Add guardian".
   - On the first guardian add, the SocialRecovery module is installed first
   - You can add and remove more guardian addresses
   - A minimum of one address must be present after the module is installed

4. **Start the game**

   - Clicking the "New game" button will install the SmartSession module (only on first use), and create a session.
   - Session will be stored in local storage so the game can be played instantly on the next visit

6. **Play the Dice Game**

   - Once a session is active, roll the dice using the UI.
   - The result is written on-chain without additional signature prompts.
   - Your roll history and score are fetched directly from the smart contract.


## Social login providers

Note: The deployed demo uses Dynamic as an auth provider, but it is possible to use any provider. The demo repo also contains a Privy example branch.

Privy integration branch: [https://github.com/StartaleLabs/scs-aa-demo-ui](https://github.com/StartaleLabs/scs-aa-demo-ui/tree/feat/privy)
