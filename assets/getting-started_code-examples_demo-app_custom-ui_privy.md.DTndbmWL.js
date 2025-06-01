import{_ as i,c as a,o as n,ae as t}from"./chunks/framework.Dh1jimFm.js";const o=JSON.parse('{"title":"Creating a custom UI for the demo app (Using Privy)","description":"","frontmatter":{},"headers":[],"relativePath":"getting-started/code-examples/demo-app/custom-ui/privy.md","filePath":"getting-started/code-examples/demo-app/custom-ui/privy.md"}'),l={name:"getting-started/code-examples/demo-app/custom-ui/privy.md"};function e(p,s,h,k,r,E){return n(),a("div",null,s[0]||(s[0]=[t(`<h1 id="creating-a-custom-ui-for-the-demo-app-using-privy" tabindex="-1">Creating a custom UI for the demo app (Using Privy) <a class="header-anchor" href="#creating-a-custom-ui-for-the-demo-app-using-privy" aria-label="Permalink to &quot;Creating a custom UI for the demo app (Using Privy)&quot;">​</a></h1><p>This section details the core technologies, smart contracts, and SDKs used in the demo so you can create your own custom interface.</p><h2 id="key-libraries-and-sdks" tabindex="-1">Key Libraries and SDKs <a class="header-anchor" href="#key-libraries-and-sdks" aria-label="Permalink to &quot;Key Libraries and SDKs&quot;">​</a></h2><ul><li><code>@rhinestone/module-sdk</code>, for interaction with ERC-7579 modules <ul><li>NOTE: for compatibility reasons, the module version is locked to <code>0.2.3</code></li></ul></li><li><code>startale-aa-sdk</code> instantiate and manage Startale smart accounts</li><li><code>viem</code> for SC interaction from TS</li><li><code>@privy-io/react-auth</code> for interaction with Privy social login features</li></ul><h2 id="smart-contracts-on-soneium-minato" tabindex="-1">Smart Contracts on Soneium Minato <a class="header-anchor" href="#smart-contracts-on-soneium-minato" aria-label="Permalink to &quot;Smart Contracts on Soneium Minato&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  # Standard entrypoint v0.7.0 address</span></span>
<span class="line"><span>  ENTRY_POINT_ADDRESS=0x0000000071727De22E5E9d8BAf0edAc6f37da032</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Startale smart contract wallet related contracts</span></span>
<span class="line"><span>  ACCOUNT_RECOVERY_MODULE_ADDRESS=0xA04D053b3C8021e8D5bF641816c42dAA75D8b597</span></span>
<span class="line"><span>  DEFAULT_ECDSA_VALIDATOR_ADDRESS=0xb997E98eB20Aff2a04AfB9e7bDDf0cf02B92f2eB</span></span>
<span class="line"><span>  STARTALE_ACCOUNT_FACTORY_ADDRESS=0xF227EB456F1B0AC51b07f451040ec1c44aB8D1aA</span></span>
<span class="line"><span>  MOCK_ATTESTER_ADDRESS=&quot;0xaeD4d8bAa80948d54d33dE041513D30124e1Ae3f&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # ERC-7579 compatible modules</span></span>
<span class="line"><span>  ACCOUNT_RECOVERY_MODULE_ADDRESS=0x29c3e3268e36f14A4D1fEe97DD94EF2F60496a2D</span></span>
<span class="line"><span>  SMART_SESSIONS_MODULE_ADDRESS=0x716BC27e1b904331C58891cC3AB13889127189a7</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Demo contract</span></span>
<span class="line"><span>  DICE_ROLL_LEDGER_ADDRESS=0x298D8873bA2B2879580105b992049201B60c1975</span></span></code></pre></div><h2 id="service-urls" tabindex="-1">Service Urls <a class="header-anchor" href="#service-urls" aria-label="Permalink to &quot;Service Urls&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>MINATO_RPC=https://rpc.minato.soneium.org</span></span>
<span class="line"><span>BUNDLER_URL=https://soneium-minato.bundler.scs.startale.com?apikey=[API_KEY]</span></span>
<span class="line"><span>PAYMASTER_SERVICE_URL=https://paymaster.scs.startale.com/v1?apikey=[API_KEY]</span></span></code></pre></div><h2 id="custom-implementation-steps" tabindex="-1">Custom Implementation Steps <a class="header-anchor" href="#custom-implementation-steps" aria-label="Permalink to &quot;Custom Implementation Steps&quot;">​</a></h2><h3 id="_1-wrap-your-app-in-a-privyprovider" tabindex="-1">1. <strong>Wrap your app in a <code>PrivyProvider</code></strong> <a class="header-anchor" href="#_1-wrap-your-app-in-a-privyprovider" aria-label="Permalink to &quot;1. **Wrap your app in a \`PrivyProvider\`**&quot;">​</a></h3><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PrivyProvider</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      appId</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[YOUR_APP_ID]&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{{</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // Display email and wallet as login methods</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        loginMethods: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;email&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;google&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;wallet&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        appearance: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          theme: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;light&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          accentColor: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;#676FFF&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">        // Create embedded wallets for users who don&#39;t have a wallet</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        embeddedWallets: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          createOnLogin: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;all-users&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          showWalletUIs: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        supportedChains: [soneiumMinato],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        defaultChain: soneiumMinato,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &gt;</span></span></code></pre></div><p><a href="https://docs.privy.io/basics/react/setup" target="_blank" rel="noreferrer">Privy docs</a></p><p><a href="https://github.com/StartaleLabs/scs-aa-demo-ui/tree/privy/blob/main/src/main.tsx#L17C5-L33C6" target="_blank" rel="noreferrer">Code in the example repo</a></p><p><a href="/getting-started/code-examples/demo-app/social-login.html">Privy integration guide</a></p><h3 id="_2-initialize-clients" tabindex="-1">2. <strong>Initialize clients</strong> <a class="header-anchor" href="#_2-initialize-clients" aria-label="Permalink to &quot;2. **Initialize clients**&quot;">​</a></h3><ul><li>Use <code>viem</code> to connect to the target chain.</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {createBundlerClient, createPaymasterClient } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;viem/account-abstraction&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { soneiumMinato } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;viem/chains&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   createPublicClient</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   encodePacked,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   encodeAbiParameters,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   encodeFunctionData,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   getAccountNonce,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;viem&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> chain</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> soneiumMinato;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> publicClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createPublicClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">MINATO_RPC</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   chain,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bundlerClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createBundlerClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   client: publicClient,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">BUNDLER_URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> paymasterClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createPaymasterClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PAYMASTER_SERVICE_URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span></code></pre></div><h3 id="_3-create-a-startale-smart-account-and-a-client" tabindex="-1">3. <strong>Create a Startale Smart Account and a client</strong> <a class="header-anchor" href="#_3-create-a-startale-smart-account-and-a-client" aria-label="Permalink to &quot;3. **Create a Startale Smart Account and a client**&quot;">​</a></h3><ul><li>Utilize <code>startale-aa-sdk</code> to instantiate a smart account.</li><li>Use <code>window.ethereum</code> provider as a signer</li><li>for backend use a different <code>signer</code> instance (f.ex. <code>viem</code>&#39;s local wallet)</li><li>use <code>createSmartAccountClient</code> for further interaction with the account</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { createSmartAccountClient, StartaleAccountClient, StartaleSmartAccount, toStartaleSmartAccount } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;startale-aa-sdk&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Convert Privy wallet instance into an EthereumProvider instance</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> provider</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> wallets[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getEthereumProvider</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> walletClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createWalletClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   account: wallets[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">].address </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`0x\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   chain: soneiumMinato,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">custom</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(provider),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // Create a Startale account</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> startaleAccountInstance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toStartaleSmartAccount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       signer: walletClient,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       chain: chain,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       index: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">), </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Nonce=index for account instance with same EOA signer as controller</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> scsContext</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { calculateGasLimits: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, policyId: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;sudo&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> };</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> startaleAccountClientInstance</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> createSmartAccountClient</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     account: startaleAccountInstance,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     transport: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">BUNDLER_URL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     client: publicClient,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     paymaster: {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">       async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getPaymasterData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pmDataParams</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetPaymasterDataParameters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         pmDataParams.paymasterPostOpGasLimit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         pmDataParams.paymasterVerificationGasLimit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">200000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         pmDataParams.verificationGasLimit </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">500000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> paymasterResponse</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> paymasterClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPaymasterData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(pmDataParams);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> paymasterResponse;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       },</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">       async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getPaymasterStubData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">pmStubDataParams</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> GetPaymasterDataParameters</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> paymasterStubResponse</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">           await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> paymasterClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getPaymasterStubData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(pmStubDataParams);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">         return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> paymasterStubResponse;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     paymasterContext: scsContext</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   });</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Paymaster actions and userOperation gas estimation can be overridden with custom calculation or passing fixed values by passing the appropriate field into the config object:</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    userOperation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">          estimateFeesPerGas</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">async</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              maxFeePerGas: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">              maxPriorityFeePerGas: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10000000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            };</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        }</span></span></code></pre></div></div><h3 id="_4-install-social-recovery-module-optional" tabindex="-1">4. <strong>Install Social Recovery Module (Optional)</strong> <a class="header-anchor" href="#_4-install-social-recovery-module-optional" aria-label="Permalink to &quot;4. **Install Social Recovery Module (Optional)**&quot;">​</a></h3><ul><li><p>Set up recovery guardians using <code>getSocialRecoveryValidator</code> from <code>@rhinestone/module-sdk</code>.</p></li><li><p>Install it via the <code>startaleAccountClientInstance.installModule()</code> function.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> socialRecovery</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> getSocialRecoveryValidator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // SET INITIAL CONFIG</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  threshold: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  guardians: [guardianAddress],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> installModuleUserOpHash</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">installModule</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    module: socialRecoveryModule,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  //Add a new guardian</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> calls</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ACCOUNT_RECOVERY_MODULE_ADDRESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    data: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">encodeFunctionData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      abi: SocialRecoveryAbi,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      functionName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;addGuardian&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      args: [guardian],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> addGuardianUserOpHash</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sendUserOperation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  callData: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.account.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">encodeCalls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(calls),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Remove guardian</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SENTINEL_ADDRESS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;0x0000000000000000000000000000000000000001&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> index</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> guardians.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">indexOf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(guardian);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Guardian not found in list&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> prevGuardian</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">===</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ?</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> SENTINEL_ADDRESS</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> :</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> guardians[index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> displayGasOutput</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> calls</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ACCOUNT_RECOVERY_MODULE_ADDRESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    value: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">BigInt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    data: </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">encodeFunctionData</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      abi: SocialRecoveryAbi,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      functionName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;removeGuardian&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      args: [prevGuardian, guardian],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> removeGuardianUserOpHash</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sendUserOperation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  callData: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.account.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">encodeCalls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(calls),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Get guardians list</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> accountGuardians</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> publicClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">readContract</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  address: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ACCOUNT_RECOVERY_MODULE_ADDRESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  abi: SocialRecoveryAbi,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  functionName: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;getGuardians&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  args: [startaleAccountClientInstance.account.address],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div></li></ul><h3 id="_5-enable-smart-session-module" tabindex="-1">5. <strong>Enable Smart Session Module</strong> <a class="header-anchor" href="#_5-enable-smart-session-module" aria-label="Permalink to &quot;5. **Enable Smart Session Module**&quot;">​</a></h3><ul><li>Instantiate the session module with <code>getSmartSessionsValidator</code>.</li><li>Install the module and configure it for executing transactions without signing.</li></ul><pre><code>\`\`\`typescript
const sessionsModule = getSmartSessionsValidator({});

const opHash = await startaleAccountClientInstance.installModule({
      module: sessionsModule,
    });

// Check
const isSmartSessionsModuleInstalled = await startaleAccountClientInstance.isModuleInstalled({
  module: sessionsModule,
});
\`\`\`
</code></pre><h3 id="_6-create-a-session-for-transaction-execution" tabindex="-1">6. <strong>Create a Session for Transaction Execution</strong> <a class="header-anchor" href="#_6-create-a-session-for-transaction-execution" aria-label="Permalink to &quot;6. **Create a Session for Transaction Execution**&quot;">​</a></h3><ul><li>Define permissions for allowed contract calls (e.g., the dice roll function).</li><li>Enable the session by calling the <code>enableSessions</code> function on the Smart Session contract.</li></ul><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sessionOwner</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> privateKeyToAccount</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ownerKey </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`0x\${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sessionsModule</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toSmartSessionsValidator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     account: startaleAccountClientInstance.account,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     signer: sessionOwner,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> accountSessionClient</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> startaleAccountClientInstance.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">extend</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">smartSessionCreateActions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(sessionsModule));</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> selector</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> toFunctionSelector</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;writeDiceRoll(uint256)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sessionRequestedInfo</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> CreateSessionDataParams</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       sessionPublicKey: sessionOwner.address, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// session key signer</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       actionPoliciesInfo: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">           contractAddress: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DICE_ROLL_LEDGER_ADDRESS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">           functionSelector: selector,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">           sudo: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ];</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> createSessionsResponse</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> await</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> accountSessionClient.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">grantPermission</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     sessionRequestedInfo,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   });</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> sessionData</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">:</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> SessionData</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     granter: startaleAccountClientInstance.account.address,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     description: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`Session to increment a counter for \${</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">DICE_ROLL_LEDGER_ADDRESS</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     sessionPublicKey: sessionOwner.address,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     moduleData: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       permissionIds: createSessionsResponse.permissionIds,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       action: createSessionsResponse.action,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       mode: SmartSessionMode.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">USE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       sessions: createSessionsResponse.sessions,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   };</span></span></code></pre></div><h3 id="_7-send-transactions-using-session-keys" tabindex="-1">7. <strong>Send Transactions Using Session Keys</strong> <a class="header-anchor" href="#_7-send-transactions-using-session-keys" aria-label="Permalink to &quot;7. **Send Transactions Using Session Keys**&quot;">​</a></h3><ul><li>Sign transactions using a generated session key.</li><li>The app automatically prepares and sends user operations via the Startale account client.</li></ul><pre><code>\`\`\`Typescript

const isEnabled = await isSessionEnabled({
    client: startaleAccountClientInstance.account.client as PublicClient,
    account: {
      type: &quot;erc7579-implementation&quot;,
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
      estimateFeesPerGas: async () =&gt; {
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
    functionName: &quot;writeDiceRoll&quot;,
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
\`\`\`
</code></pre><h2 id="resources" tabindex="-1">Resources <a class="header-anchor" href="#resources" aria-label="Permalink to &quot;Resources&quot;">​</a></h2><ul><li><a href="https://docs.rhinestone.io/" target="_blank" rel="noreferrer">Rhinestone Module SDK</a></li><li><a href="https://docs.privy.io/basics/get-started/about" target="_blank" rel="noreferrer">Privy Documentation</a></li><li><a href="https://eips.ethereum.org/EIPS/eip-7579" target="_blank" rel="noreferrer">ERC-7579 Standard Proposal</a></li><li><a href="https://viem.sh/" target="_blank" rel="noreferrer">Viem Documentation</a></li></ul>`,34)]))}const c=i(l,[["render",e]]);export{o as __pageData,c as default};
