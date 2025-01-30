import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://blog.mengguyi.com",

  author: {
    name: "MengGuyi",
    url: "https://mengguyi.com",
  },

  logo: "/logo.avif",

  repo: "mengguyi/mengguyi.github.io",

  docsDir: "src",

  blog: {
    medias: {
      //Baidu: "https://example.com",
      BiliBili: "https://space.bilibili.com/474814653",
      //Bitbucket: "https://example.com",
      //Dingding: "https://example.com",
      //Discord: "https://example.com",
      //Dribbble: "https://example.com",
      Email: "mailto:i@mengguyi.com",
      //Evernote: "https://example.com",
      Facebook: "https://www.facebook.com/profile.php?id=100079026494258",
      //Flipboard: "https://example.com",
      Gitee: "https://gitee.com/mengguyi",
      GitHub: "https://github.com/mengguyi",
      Gitlab: "https://gitlab.com/mengguyi",
      Gmail: "mailto:mengguyi.mgy@gmail.com",
      Instagram: "https://www.instagram.com/mengguyi/",
      //Lark: "https://example.com",
      //Lines: "https://example.com",
      //Linkedin: "https://example.com",
      //Pinterest: "https://example.com",
      //Pocket: "https://example.com",
      //QQ: "https://example.com",
      //Qzone: "https://example.com",
      //Reddit: "https://example.com",
      //Rss: "https://example.com",
      //Steam: "https://example.com",
      Twitter: "https://twitter.com/mengguyi",
      //Wechat: "https://example.com",
      Weibo: "https://weibo.com/u/7706678689",
      //Whatsapp: "https://example.com",
      Youtube: "https://www.youtube.com/@mengguyi",
      Zhihu: "https://www.zhihu.com/people/mengguyi",
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "萌ICP备20230543号",

      displayFooter: true,

      blog: {
        description: "GNU/Linux用户｜超业余级的Golang开发者｜18 y.o.｜可也以叫我安然或者孟安然｜MTF🏳️‍⚧️｜Nya!",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    /**
     * Chinese locale config
     */
    "/en/": {
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: "萌ICP备20230543号",

      displayFooter: true,

      blog: {
        description: "GNU/Linux user | Super amateur Golang developer | 18 y.o. | You can call me 安然 or 孟安然 | MTF🏳️‍⚧️ | Nya!",
        intro: "/en/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },
  },

  // enable it to preview all changes in time
  // hotReload: true,

  // These features are enabled for demo, only preserve features you need here
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true,
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

    // uncomment these if you need TeX support
    // math: {
    //   // install katex before enabling it
    //   type: "katex",
    //   // or install mathjax-full before enabling it
    //   type: "mathjax",
    // },

    // install chart.js before enabling it
    // chartjs: true,

    // install echarts before enabling it
    // echarts: true,

    // install flowchart.ts before enabling it
    // flowchart: true,

    // install mermaid before enabling it
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    blog: true,

    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    comment: {
      provider: "Twikoo",
      envId: "https://blog-comment.mengguyi.com",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      assets: "fontawesome-with-brands",
    },

    slimsearch: true,
    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
