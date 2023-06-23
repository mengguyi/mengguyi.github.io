import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  "/articles/",
  {
    text: "随手贴",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "随手贴",
        icon: "pen-to-square",
        prefix: "essay/",
        children: [
          { text: "随手贴1", icon: "pen-to-square", link: "1" },
        ],
      },
    ],
  },
]);
