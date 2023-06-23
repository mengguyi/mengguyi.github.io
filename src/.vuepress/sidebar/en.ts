import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/en/": [
    "",
    {
      text: "Article",
      icon: "laptop-code",
      prefix: "articles/",
      link: "articles/",
      children: "structure",
    },
    {
      text: "Posts",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
