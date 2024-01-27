import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "文章",
      icon: "laptop-code",
      prefix: "articles/",
      link: "articles/",
      children: "structure",
    },
    {
      text: "随手贴",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
  ],
});
