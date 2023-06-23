import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "孟古一的博客",
      description: "孟古一的博客",
    },
    "/en/": {
      lang: "en-US",
      title: "MengGuyi's blog",
      description: "MengGuyi's blog",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
