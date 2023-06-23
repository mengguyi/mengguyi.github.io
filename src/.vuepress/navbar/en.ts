import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/en/",
  "/en/articles/",
  {
    text: "Posts",
    icon: "pen-to-square",
    prefix: "/en/posts/",
    children: [
      {
        text: "Essay",
        icon: "pen-to-square",
        prefix: "essay/",
        children: [
          { text: "Essay1", icon: "pen-to-square", link: "1" },
        ],
      },
    ],
  },
]);
