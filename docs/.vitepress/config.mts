import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "",
  title: "AA Toolkit docs",
  description: "Account Abstraction Toolkit Guide on Soneium and Minato",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/scs_icon.png" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1" }],
  ],
  appearance: "force-dark",
  themeConfig: {
    logo: "/scs_lockup_horizontal_white.svg",
    nav: [
      { text: "Getting started", link: "/getting-started/tech-stack" },
      { text: "Core API", link: "/core-api/smart-accounts-overview" },
      { text: "Advanced", link: "/examples/parallel-tx" },
      { text: "Resources", link: "/resources/addresses" },
      { text: "FAQ", link: "/faq" },
      { text: "Support", link: "/support" },
    ],
    docFooter: {
      next: "Next",
      prev: "Previous",
    },

    sidebar: {
      "/getting-started/": [
        {
          text: "Guide",
          items: [
            { text: "Tech stack", link: "/getting-started/tech-stack" },
            { text: "Tutorial", link: "/getting-started/tutorial" },
            { text: "Code Examples", link: "/getting-started/code-examples/index", items: [
              { text: "Quick start scripts", link: "/getting-started/code-examples/quick-start-scripts" },
              { text: "Demo app", link: "/getting-started/code-examples/demo-app" },
            ] },
          ],
        },
      ],
      "/core-api/": [
        {
          text: "Core API",
          items: [
            { text: "Smart Accounts Overview", link: "/core-api/smart-accounts-overview" },
            { text: "Startale Smart Account", link: "/core-api/startale-smart-account" },
            { text: "Send Transactions", link: "/core-api/send-transactions" },
            { text: "Batch Transactions", link: "/core-api/batch-transactions" },
            {
              text: "Gas Abstraction",
              items: [
                { text: "Sponsor Gas", link: "/core-api/gas-abstraction/sponsor-gas" },
                { text: "Pay Gas With ERC20", link: "/core-api/gas-abstraction/pay-with-erc20" },
              ],
            },
          ],
        },
      ],
      "/advanced/": [
        {
          text: "Advanced",
          items: [
            { text: "Parallel Transactions", link: "/advanced/parallel-tx" },
            { text: "Chain Abstraction", link: "/advanced/chain-abstraction" },
            { text: "Using Modules", link: "/advanced/using-modules", items: [
              { text: "Smart Sessions", link: "/advanced/using-modules/smart-sessions" },
              { text: "Social Recovery", link: "/advanced/using-modules/social-recovery" },
            ] },
          ]
        }
      ],
      "/resources/": [
        {
          text: "Resources",
          items: [
            { text: "Smart Contracts", link: "/resources/smart-contracts" },
            { text: "Paymasters", link: "/resources/paymasters" },
            { text: "Audits", link: "/resources/audits" },
          ],
        },
      ],
      "/faq/": [
        {
          text: "FAQ",
          items: [
            { text: "Common Errors", link: "/faq/common-errors" },
            { text: "How to Debug", link: "/faq/how-to-debug" },
          ]
        },
      ],
    },
    outline: {
      level: "deep",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/StartaleLabs" },
      { icon: "telegram", link: "https://t.me/startalecloudservices" },
      { icon: "discord", link: "https://discord.gg/2GuvSdzx" },
    ],
  },
});
