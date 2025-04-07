import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "",
  title: "AA Toolkit docs",
  description: "Guide to using Startale AA stack on Soneium and Minato networks",
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/scs_icon.png" }],
    ["meta", { name: "viewport", content: "width=device-width, initial-scale=1" }],
  ],
  appearance: "force-dark",
  themeConfig: {
    logo: "/scs_logo_white.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Guide", link: "/guide/tech-stack" },
      { text: "Examples", link: "/examples/sponsorship-pm" },
      { text: "Support", link: "/support" },
    ],
    docFooter: {
      next: "Next",
      prev: "Previous",
    },

    sidebar: {
      "/guide/": [
        {
          text: "Guide",
          items: [
            { text: "Tech stack", link: "/guide/tech-stack" },
            { text: "Networks", link: "/guide/networks" },
            { text: "Endpoints", link: "/guide/endpoints" },
            { text: "API specs", link: "/guide/api-specs" },
            { text: "UO Status API", link: "/guide/uo-status" },
            { text: "Debugging the UO", link: "/guide/uo-debug" },
          ],
        },
      ],
      "/examples/": [
        {
          text: "Examples",
          items: [
            { text: "Sponsorship Paymaster", link: "/examples/sponsorship-pm" },
            { text: "ERC20 Token Paymaster", link: "/examples/erc20-pm" },
            { text: "Privy Social Login", link: "/examples/social-login" },
            { text: "UI integration demo", link: "/examples/ui-demo" },
          ],
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
