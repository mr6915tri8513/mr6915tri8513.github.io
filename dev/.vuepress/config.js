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
                                text: "record",
                                link: "/categories/record/",
                            },
                        ]
                    }, {
                        text: "Docs",
                        icon: "reco-message",
                        items: [
                            {
                                text: "Widget",
                                link: "/docs/widget/"
                            }, {
                                text: "Project",
                                link: "/docs/project/"
                            }
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
                                    path: "widget/widget1/"
                                }
                            ]
                        }, {
                            title: "Project",
                            path: "/docs/project/",
                            collacollapsable: true,
                            children: [
                                {
                                    title: "PSU Sensor",
                                    path: "project/psu_sensor/"
                                }
                            ]
                        }
                    ]
                },
                lastUpdated: "Last Updated",
            },
            "/zh-TW/": {
                recoLocales: {
                    homeBlog: {
                        friendLink: "好友連結"
                    }
                },
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
                                text: "紀錄",
                                link: "/zh-TW/categories/紀錄/",
                            },
                        ]
                    }, {
                        text: "文檔",
                        icon: "reco-message",
                        items: [
                            {
                                text: "小工具",
                                link: "/zh-TW/docs/widget/"
                            }, {
                                text: "專題",
                                link: "/zh-TW/docs/project/"
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
                                    path: "widget/widget1/"
                                }
                            ]
                        }, {
                            title: "專題",
                            path: "/zh-TW/docs/project/",
                            collacollapsable: true,
                            children: [
                                {
                                    title: "電競檢測儀",
                                    path: "project/psu_sensor/"
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
        logo: "/home_page/logo.jpg",
        search: true,
        searchMaxSuggestions: 10,
        author: "mr6915tri8513",
        authorAvatar: "/home_page/avatar.png",
        record: null,
        startYear: "2022",
        noFoundPageByTencent: false,
    },
    markdown: {
        "lineNumbers": true
    }
}