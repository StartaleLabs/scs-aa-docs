# Dynamic (Social Login) Example

This guide walks you through how to use [Dynamic](https://www.dynamic.xyz/) for social login and wallet creation with the SCS AA toolkit.

## Prerequisites

Make sure you have:

- A Dynamic app set up via the [Dynamic Dashboard](https://app.dynamic.xyz/)
- Your Dynamic `environmentId`
- The demo UI cloned (on the feat/dynamic branch): https://github.com/StartaleLabs/scs-aa-demo-ui/tree/feat/dynamic
- Dependencies installed with `npm install`

## Setup

1. **Install Dynamic SDK**:

```bash
pnpm add @dynamic-labs/sdk-react-core
pnpm add @dynamic-labs/ethereum
```

2. **Configure the Dynamic Provider**

Wrap your app with the `<DynamicContextProvider>` in `main.tsx` or a top-level component:

```tsx
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';

<DynamicContextProvider
  environmentId={import.meta.env.VITE_DYNAMIC_ENV_ID}
  settings={{
    walletConnectors: [EthereumWalletConnectors],
  }}
>
  <App />
</DynamicContextProvider>
```

Use your actual `VITE_DYNAMIC_ENV_ID` in `.env.local`:

```env
VITE_DYNAMIC_ENV_ID=your-dynamic-env-id
```

3. **Access Login State and Wallets**

In your components, use the provided hooks:

```tsx
import { useDynamicContext, useUserWallets } from '@dynamic-labs/sdk-react-core';

const { sdkHasLoaded, setShowAuthFlow, handleLogout, primaryWallet } = useDynamicContext();
```

## Creating a Smart Account

After a wallet is connected:

```tsx
const walletClient = primaryWallet.getWalletClient();

const startaleAccount = await toStartaleSmartAccount({
  signer: walletClient,
  chain: chain,
  transport: http(),
  ...,
});
```

## Logging Out and Cleanup

To handle logout and session cleanup:

```tsx
const { handleLogout } = useDynamicContext();

handleLogout();
```

You can react to authentication changes using `useEffect`:

```tsx
import { useIsLoggedIn } from '@dynamic-labs/sdk-react-core';

const isLoggedIn = useIsLoggedIn();

useEffect(() => {
  if (!isLoggedIn) {
    cleanUp();
  }
}, [isLoggedIn]);
```

## Dev Notes

- You can test with email login or third-party social logins (Google, etc.)
- third-party login providers require their respective app ids to be set in Dynamic dashboard
- For Vite Content Security Policy (CSP) issues, ensure blob and worker-src are allowed.

## References

- Dynamic Docs: [https://docs.dynamic.xyz](https://docs.dynamic.xyz)
- React SDK Docs: [https://docs.dynamic.xyz/react-sdk/overview](https://docs.dynamic.xyz/react-sdk/overview)
- SCS AA Demo Repo: [https://github.com/StartaleLabs/scs-aa-demo-ui](https://github.com/StartaleLabs/scs-aa-demo-ui)

---

Need help? Open an issue in the [GitHub repo](https://github.com/StartaleLabs/scs-aa-demo-ui/issues).


# Privy (Social Login) Example

This guide walks you through how to use [Privy](https://www.privy.io/) for social login and wallet creation with the SCS AA toolkit.

## Prerequisites

Make sure you have:

- A Privy app set up at [Privy Dashboard](https://dashboard.privy.io/)
- Your Privy `appId`
- The demo UI cloned: https://github.com/StartaleLabs/scs-aa-demo-ui/tree/feat/privy
- Dependencies installed with `npm install`

## Setup

1. **Install Privy SDK**:

```bash
pnpm add @privy-io/react-auth
```

2. **Configure the Privy Provider**

Wrap your app with the `<PrivyProvider>` in `main.tsx` or a top-level component:

```tsx
import { PrivyProvider } from '@privy-io/react-auth';

<PrivyProvider
  appId={import.meta.env.VITE_PRIVY_APP_ID}
  config={{
    embeddedWallets: {
      createOnLogin: 'users-without-wallets',
      // Setting this to true will show a "Sign" popup on every request
      showWalletUIs: false,
    },
    supportedChains: [soneiumMinato],
    defaultChain: soneiumMinato,
  }}
>
  <App />
</PrivyProvider>
```

Use your actual `VITE_PRIVY_APP_ID` in `.env.local`:

```env
VITE_PRIVY_APP_ID=your-privy-app-id
```

3. **Access Login State and Wallets**

In your components, use the provided hooks:

```tsx
import { usePrivy, useWallets } from '@privy-io/react-auth';

const { ready, authenticated, user, login, logout } = usePrivy();
const { wallets } = useWallets();
```

- `usePrivy()` gives you login state and methods
- `useWallets()` gives you the EOA wallet(s) connected via Privy

## Creating a Smart Account

After a wallet is connected:

```tsx
const provider = await wallets[0].getEthereumProvider();

const walletClient = createWalletClient({
  account: wallets[0].address as `0x${string}`,
  chain: soneiumMinato,
  transport: custom(provider),
});

const startaleAccount = await toStartaleSmartAccount({
  signer: walletClient,
  chain: chain,
  transport: http(),
  ...,
});
```

## Logging Out and Cleanup

To handle logout and session cleanup:

```tsx
const { logout } = usePrivy();

logout();
```

You can react to authentication changes using `useEffect`:

```tsx
useEffect(() => {
  if (!authenticated) {
    cleanUp();
  }
}, [authenticated]);
```

## Dev Notes

- You can test with email login or third-party social logins (Google, etc.)
- third-party login providers require their respective app ids to be set in Privy dashboard
- In development, you can inspect wallet connection state by logging `wallets`.
- For Vite Content Security Policy (CSP) issues, ensure blob and worker-src are allowed.

## References

- Privy Docs: [https://docs.privy.io](https://docs.privy.io)
- React SDK Docs: [https://docs.privy.io/guide/sdk/react](https://docs.privy.io/guide/sdk/react)
- SCS AA Demo Repo: [https://github.com/StartaleLabs/scs-aa-demo-ui](https://github.com/StartaleLabs/scs-aa-demo-ui)

---

Need help? Open an issue in the [GitHub repo](https://github.com/StartaleLabs/scs-aa-demo-ui/issues).
