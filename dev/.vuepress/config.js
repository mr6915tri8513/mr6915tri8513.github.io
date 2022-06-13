module.exports = {
  title: "mr6915tri8513",
  description: "This is my blog built by a module.",
  dest: "../docs",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico"
      }
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "reco-home"
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date"
      },/*
      {
        "text": "Docs",
        "icon": "reco-message",
        "items": [
          {
            "text": "vuepress-reco",
            "link": "/docs/theme-reco/"
          }
        ]
      },*/
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/mr6915tri8513",
            icon: "reco-github"
          }
        ]
      }
    ],/*
    "sidebar": {
      "/docs/theme-reco/": [
        "",
        "theme",
        "plugin",
        "api"
      ]
    },*/
    type: "blog",
    blogConfig: {
      category: {
        "location": 2,
        "text": "Category"
      },
      tag: {
        "location": 3,
        text: "Tag"
      }
    },
    friendLink: [
      {
        title: "I-am-nothing",
        desc: "This is nothing.",
        avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: "https://i-am-nothing.github.io/"
      }
    ],
    logo: "/logo.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "2022/6/12",
    author: "mr6915tri8513",
    authorAvatar: "/avatar.png",
    record: "null",
    startYear: "2022",
    noFoundPageByTencent: false,
  },
  markdown: {
    "lineNumbers": true
  }
}