const EMAIL = "mr6915tri8513@gmail.com"
const GITHUB = "https://github.com/mr6915tri8513"
module.exports = {
    locales: {
        "/": {
            lang: "en-US",
            title: "mr6915tri8513",
            description: "a person who loves coding",
        },
        "/zh-TW/": {
            lang: "zh-TW",
            title: "mr6915tri8513",
            description: "某個愛寫程式的人"
        }
    },
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
        locales: {
            "/": {
                selectText: "Languages",
                label: "English",
                editLinkText: "Edit this page on GitHub",
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh"
                    }
                },
                nav: [
                    {
                        text: "Home",
                        link: "/",
                        icon: "reco-home"
                    }, {
                        text: "TimeLine",
                        link: "/timeline/",
                        icon: "reco-date"
                    }, {
                        text: "Tags",
                        link: "/tag/",
                        icon: "reco-tag"
                    }, {
                        text: "Categories",
                        icon: "reco-category",
                        items: [
                            {
                                text: "widget",
                                link: "/categories/widget/",
                            },
                        ]
                    }, {
                        text: "Docs",
                        icon: "reco-message",
                        items: [
                            {
                                text: "Widget",
                                link: "/docs/widget/"
                            },
                        ]
                    }, {
                        text: "Contact",
                        icon: "reco-message",
                        items: [
                            {
                                text: "GitHub",
                                link: GITHUB,
                                icon: "reco-github"
                            }, {
                                text: "Email",
                                link: "mailto:" + EMAIL,
                                icon: "reco-mail"
                            }
                        ]
                    }
                ],
                sidebar: {
                    "/docs/": [
                        {
                            title: "Widget",
                            path: "/docs/widget/",
                            collacollapsable: true,
                            children: [
                                {
                                    title: "widget1",
                                    path: "widget/widget1"
                                }
                            ]
                        },
                    ]
                },
                lastUpdated: "Last Updated",
            },
            "/zh-TW/": {
                selectText: "語言",
                label: "中文-繁體",
                editLinkText: "在 Github 上編輯此頁",
                serviceWorker: {
                    updatePopup: {
                        message: "發現新內容",
                        buttonText: "刷新"
                    }
                },
                nav: [
                    {
                        text: "首頁",
                        link: "/zh-TW/",
                        icon: "reco-home"
                    }, {
                        text: "時間軸",
                        link: "/zh-TW/timeline/",
                        icon: "reco-date"
                    }, {
                        text: "標籤",
                        link: "/zh-TW/tag/",
                        icon: "reco-tag"
                    }, {
                        text: "類別",
                        icon: "reco-category",
                        items: [
                            {
                                text: "小工具",
                                link: "/zh-TW/categories/widget/",
                            },
                        ]
                    }, {
                        text: "文檔",
                        icon: "reco-message",
                        items: [
                            {
                                text: "小工具",
                                link: "/zh-TW/docs/widget/"
                            }
                        ]
                    }, {
                        text: "聯絡方式",
                        icon: "reco-message",
                        items: [
                            {
                                text: "GitHub",
                                link: GITHUB,
                                icon: "reco-github"
                            }, {
                                text: "電子郵件",
                                link: "mailto:" + EMAIL,
                                icon: "reco-mail"
                            }
                        ]
                    }
                ],
                sidebar: {
                    "/zh-TW/docs/": [
                        {
                            title: "小工具",
                            path: "/zh-TW/docs/widget/",
                            collacollapsable: true,
                            children: [
                                {
                                    title: "小工具1",
                                    path: "widget/widget1"
                                }
                            ]
                        }
                    ]
                },
                lastUpdated: "最後更新"
            },
        },
        type: "blog",
        blogConfig: {
            category: {
                "location": 2,
                text: "Category"
            },
            tag: {
                "location": 3,
                text: "Tag"
            }
        },
        friendLink: [
            {
                title: "I-am-nothing",
                desc: "He's my classmate and friend.",
                logo: "https://i-am-nothing.github.io/hero.jpeg",
                link: "https://i-am-nothing.github.io/"
            }
        ],
        logo: "/logo.jpg",
        search: true,
        searchMaxSuggestions: 10,
        author: "mr6915tri8513",
        authorAvatar: "/avatar.png",
        record: null,
        startYear: "2022",
        noFoundPageByTencent: false,
    },
    markdown: {
        "lineNumbers": true
    }
}