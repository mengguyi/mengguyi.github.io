import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "孟古一的博客",
      description: "这里是孟古一的猫窝哦",
    },
    "/en/": {
      lang: "en-US",
      title: "MengGuyi's blog",
      description: "This is MengGuyi's cats nest",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
