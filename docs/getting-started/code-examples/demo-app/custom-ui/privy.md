# Creating a custom UI for the demo app (Using Privy)

This section details the core technologies, smart contracts, and SDKs used in the demo so you can create your own custom interface.

## Key Libraries and SDKs
  - `@rhinestone/module-sdk`, for interaction with ERC-7579 modules
    - NOTE: for compatibility reasons, the module version is locked to `0.2.3`
  - `startale-aa-sdk` instantiate and manage Startale smart accounts
  - `viem` for SC interaction from TS
  - `@privy-io/react-auth` for interaction with Privy social login features

## Smart Contracts on Soneium Minato

```
  # Standard entrypoint v0.7.0 address
  ENTRY_POINT_ADDRESS=0x0000000071727De22E5E9d8BAf0edAc6f37da032

  # Startale smart contract wallet related contracts
  ACCOUNT_RECOVERY_MODULE_ADDRESS=0xA04D053b3C8021e8D5bF641816c42dAA75D8b597
  DEFAULT_ECDSA_VALIDATOR_ADDRESS=0xb997E98eB20Aff2a04AfB9e7bDDf0cf02B92f2eB
  STARTALE_ACCOUNT_FACTORY_ADDRESS=0xF227EB456F1B0AC51b07f451040ec1c44aB8D1aA
  MOCK_ATTESTER_ADDRESS="0xaeD4d8bAa80948d54d33dE041513D30124e1Ae3f"

  # ERC-7579 compatible modules
  ACCOUNT_RECOVERY_MODULE_ADDRESS=0x29c3e3268e36f14A4D1fEe97DD94EF2F60496a2D
  SMART_SESSIONS_MODULE_ADDRESS=0x716BC27e1b904331C58891cC3AB13889127189a7

  # Demo contract
  DICE_ROLL_LEDGER_ADDRESS=0x298D8873bA2B2879580105b992049201B60c1975
```

## Service Urls

```
MINATO_RPC=https://rpc.minato.soneium.org
BUNDLER_URL=https://soneium-minato.bundler.scs.startale.com?apikey=[API_KEY]
PAYMASTER_SERVICE_URL=https://paymaster.scs.startale.com/v1?apikey=[API_KEY]

```

## Custom Implementation Steps

### 1. **Wrap your app in a `PrivyProvider`**

```jsx
<PrivyProvider
      appId="[YOUR_APP_ID]"
      config={{
        // Display email and wallet as login methods
        loginMethods: ["email", "google", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "all-users",
          showWalletUIs: false,
        },
        supportedChains: [soneiumMinato],
        defaultChain: soneiumMinato,
      }}
    >
```

[Privy docs](https://docs.privy.io/basics/react/setup)

[Code in the example repo](https://github.com/StartaleLabs/scs-aa-demo-ui/tree/privy/blob/main/src/main.tsx#L17C5-L33C6)

[Privy integration guide](/examples/social-login-privy)

### 2. **Initialize clients**

   - Use `viem` to connect to the target chain.

   ```typescript
    import {createBundlerClient, createPaymasterClient } from "viem/account-abstraction";
    import { soneiumMinato } from "viem/chains";
    import {
      createPublicClient
      encodePacked,
      encodeAbiParameters,
      encodeFunctionData,
      getAccountNonce,
    } from "viem";

    const chain = soneiumMinato;
    const publicClient = createPublicClient({
      transport: http(MINATO_RPC),
      chain,
    });

    const bundlerClient = createBundlerClient({
      client: publicClient,
      transport: http(BUNDLER_URL),
    });

    const paymasterClient = createPaymasterClient({
      transport: http(PAYMASTER_SERVICE_URL),
    });
   ```

### 3. **Create a Startale Smart Account and a client**

   - Utilize `startale-aa-sdk` to instantiate a smart account.
   - Use `window.ethereum` provider as a signer
   - for backend use a different `signer` instance (f.ex. `viem`'s local wallet)
   - use `createSmartAccountClient` for further interaction with the account

   ```typescript
    import { createSmartAccountClient, StartaleAccountClient, StartaleSmartAccount, toStartaleSmartAccount } from "startale-aa-sdk";

    // Convert Privy wallet instance into an EthereumProvider instance
    const provider = await wallets[0].getEthereumProvider();
    const walletClient = createWalletClient({
      account: wallets[0].address as `0x${string}`,
      chain: soneiumMinato,
      transport: custom(provider),
    });

    // Create a Startale account
    const startaleAccountInstance = await toStartaleSmartAccount({
          signer: walletClient,
          chain: chain,
          transport: http(),
          index: BigInt(0), // Nonce=index for account instance with same EOA signer as controller
      });

    const scsContext = { calculateGasLimits: false, policyId: "sudo" };

    const startaleAccountClientInstance = createSmartAccountClient({
        account: startaleAccountInstance,
        transport: http(BUNDLER_URL),
        client: publicClient,
        paymaster: {
          async getPaymasterData(pmDataParams: GetPaymasterDataParameters) {
            pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
            pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
            pmDataParams.verificationGasLimit = BigInt(500000);
            const paymasterResponse = await paymasterClient.getPaymasterData(pmDataParams);
            return paymasterResponse;
          },
          async getPaymasterStubData(pmStubDataParams: GetPaymasterDataParameters) {
            const paymasterStubResponse =
              await paymasterClient.getPaymasterStubData(pmStubDataParams);
            return paymasterStubResponse;
          },
        },
        paymasterContext: scsContext
      });
   ```

:::info
Paymaster actions and userOperation gas estimation can be overridden with custom calculation or passing fixed values by passing the appropriate field into the config object:

```js
    userOperation: {
          estimateFeesPerGas: async () => {
            return {
              maxFeePerGas: BigInt(10000000),
              maxPriorityFeePerGas: BigInt(10000000),
            };
          },
        }

```
:::



### 4. **Install Social Recovery Module (Optional)**

- Set up recovery guardians using `getSocialRecoveryValidator` from `@rhinestone/module-sdk`.
- Install it via the `startaleAccountClientInstance.installModule()` function.

    ```typescript

    const socialRecovery = getSocialRecoveryValidator({
      // SET INITIAL CONFIG
      threshold: 1,
      guardians: [guardianAddress],
    });

    const installModuleUserOpHash = await startaleAccountClientInstance.installModule({
        module: socialRecoveryModule,
      });

      //Add a new guardian
      const calls = [
      {
        to: ACCOUNT_RECOVERY_MODULE_ADDRESS,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: SocialRecoveryAbi,
          functionName: "addGuardian",
          args: [guardian],
        }),
      },
    ];
    const addGuardianUserOpHash = await startaleAccountClientInstance.sendUserOperation({
      callData: await startaleAccountClientInstance.account.encodeCalls(calls),
    });

    // Remove guardian
    const SENTINEL_ADDRESS = "0x0000000000000000000000000000000000000001";
    const index = guardians.indexOf(guardian);
    if (index < 0) {
      console.error("Guardian not found in list");
      return;
    }

    const prevGuardian = index === 0 ? SENTINEL_ADDRESS : guardians[index - 1];
    await displayGasOutput();
    const calls = [
      {
        to: ACCOUNT_RECOVERY_MODULE_ADDRESS,
        value: BigInt(0),
        data: encodeFunctionData({
          abi: SocialRecoveryAbi,
          functionName: "removeGuardian",
          args: [prevGuardian, guardian],
        }),
      },
    ];
    const removeGuardianUserOpHash = await startaleAccountClientInstance.sendUserOperation({
      callData: await startaleAccountClientInstance.account.encodeCalls(calls),
    });

    // Get guardians list
    const accountGuardians = await publicClient.readContract({
      address: ACCOUNT_RECOVERY_MODULE_ADDRESS,
      abi: SocialRecoveryAbi,
      functionName: "getGuardians",
      args: [startaleAccountClientInstance.account.address],
    });
   ```

### 5. **Enable Smart Session Module**

   - Instantiate the session module with `getSmartSessionsValidator`.
   - Install the module and configure it for executing transactions without signing.

    ```typescript
    const sessionsModule = getSmartSessionsValidator({});

    const opHash = await startaleAccountClientInstance.installModule({
          module: sessionsModule,
        });

    // Check
    const isSmartSessionsModuleInstalled = await startaleAccountClientInstance.isModuleInstalled({
      module: sessionsModule,
    });
    ```

### 6. **Create a Session for Transaction Execution**

   - Define permissions for allowed contract calls (e.g., the dice roll function).
   - Enable the session by calling the `enableSessions` function on the Smart Session contract.

   ```typescript

    const sessionOwner = privateKeyToAccount(ownerKey as `0x${string}`);
      const sessionsModule = toSmartSessionsValidator({
        account: startaleAccountClientInstance.account,
        signer: sessionOwner,
      });

      const accountSessionClient = startaleAccountClientInstance.extend(smartSessionCreateActions(sessionsModule));

      const selector = toFunctionSelector("writeDiceRoll(uint256)");
      const sessionRequestedInfo: CreateSessionDataParams[] = [
        {
          sessionPublicKey: sessionOwner.address, // session key signer
          actionPoliciesInfo: [
            {
              contractAddress: DICE_ROLL_LEDGER_ADDRESS,
              functionSelector: selector,
              sudo: true,
            },
          ],
        },
      ];

      const createSessionsResponse = await accountSessionClient.grantPermission({
        sessionRequestedInfo,
      });

      const sessionData: SessionData = {
        granter: startaleAccountClientInstance.account.address,
        description: `Session to increment a counter for ${DICE_ROLL_LEDGER_ADDRESS}`,
        sessionPublicKey: sessionOwner.address,
        moduleData: {
          permissionIds: createSessionsResponse.permissionIds,
          action: createSessionsResponse.action,
          mode: SmartSessionMode.USE,
          sessions: createSessionsResponse.sessions,
        },
      };
   ```

### 7. **Send Transactions Using Session Keys**

   - Sign transactions using a generated session key.
   - The app automatically prepares and sends user operations via the Startale account client.

    ```Typescript

    const isEnabled = await isSessionEnabled({
        client: startaleAccountClientInstance.account.client as PublicClient,
        account: {
          type: "erc7579-implementation",
          address: startaleAccountClientInstance.account.address,
          deployedOnChains: [chain.id],
        },
        permissionId: activeSession.moduleData.permissionIds[0],
      });

      const sessionOwner = privateKeyToAccount(ownerKey);
      const smartSessionAccountClient = createSmartAccountClient({
        account: await toStartaleSmartAccount({
          signer: sessionOwner,
          accountAddress: activeSession.granter,
          chain: chain,
          transport: http(),
        }),
        transport: http(BUNDLER_URL),
        client: publicClient,
        paymaster: {
          async getPaymasterData(pmDataParams: GetPaymasterDataParameters) {
            pmDataParams.paymasterPostOpGasLimit = BigInt(100000);
            pmDataParams.paymasterVerificationGasLimit = BigInt(200000);
            pmDataParams.verificationGasLimit = BigInt(500000);
            const paymasterResponse = await paymasterClient.getPaymasterData(pmDataParams);
            return paymasterResponse;
          },
          async getPaymasterStubData(pmStubDataParams: GetPaymasterDataParameters) {
            const paymasterStubResponse =
              await paymasterClient.getPaymasterStubData(pmStubDataParams);
            return paymasterStubResponse;
          },
        },
        paymasterContext: scsContext,
        userOperation: {
          estimateFeesPerGas: async () => {
            return {
              maxFeePerGas: BigInt(10000000),
              maxPriorityFeePerGas: BigInt(10000000),
            };
          },
        },
        mock: true,
      });

      const usePermissionsModule = toSmartSessionsValidator({
        account: smartSessionAccountClient.account,
        signer: sessionOwner,
        moduleData: activeSession.moduleData,
      });

      const useSmartSessionAccountClient = smartSessionAccountClient.extend(
        smartSessionUseActions(usePermissionsModule),
      );

      const callData = encodeFunctionData({
        abi: DiceRollLedgerAbi,
        functionName: "writeDiceRoll",
        args: [BigInt(value)],
      });

      const userOpHash = await useSmartSessionAccountClient.usePermission({
        calls: [
          {
            to: DICE_ROLL_LEDGER_ADDRESS,
            data: callData,
          },
        ],
      });
    ```

## Resources

- [Rhinestone Module SDK](https://docs.rhinestone.io/)
- [Privy Documentation](https://docs.privy.io/basics/get-started/about)
- [ERC-7579 Standard Proposal](https://eips.ethereum.org/EIPS/eip-7579)
- [Viem Documentation](https://viem.sh/)
