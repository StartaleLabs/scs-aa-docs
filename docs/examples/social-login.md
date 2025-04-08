# Privy (Social Login) Example

This guide walks you through how to use [Privy](https://www.privy.io/) for social login and wallet creation with the SCS AA toolkit.

## Prerequisites

Make sure you have:

- A Privy app set up at [Privy Dashboard](https://dashboard.privy.io/)
- Your Privy `appId`
- The demo UI cloned: https://github.com/StartaleLabs/scs-aa-demo-ui
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

const nexusAccount = await toNexusAccount({
  signer: walletClient,
  chain,
  transport: http(),
  ...
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
