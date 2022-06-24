module.exports = {
    plugins: {
        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
                return new Date(timestamp).toLocaleDateString();
            }
        },
        'sitemap': {
            hostname: 'https://mr6915tri8513.github.io'
        }
    },
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
        },
    },
    dest: "../docs",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "/home_page/icon.png"
            }
        ], [
            "meta",
            {
                name: "viewport",
                content: "width=device-width,initial-scale=1,user-scalable=no"
            }
        ], [
            'script',
            {
                async: true,
                src: 'https://www.googletagmanager.com/gtag/js?id=G-2D0HV8QJX9',
            },
        ], [
            'script',
            {},
            [
                "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-2D0HV8QJX9');",
            ],
        ],
    ],
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
                        icon: "reco-tag",
                        link: "/tag/",
                        items: [
                            {
                                text: "Android",
                                link: "/tag/Android/"
                            }, {
                                text: "Arduino",
                                link: "/tag/Arduino/"
                            }, {
                                text: "Windows Forms",
                                link: "/tag/Windows%20Forms/"
                            }
                        ]
                    }, {
                        text: "Categories",
                        icon: "reco-category",
                        link: "/categories/",
                        items: [
                            {
                                text: "Diary",
                                link: "/categories/diary/"
                            }
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
                            }, {
                                text: "Others",
                                link: "/docs/others/"
                            }
                        ]
                    }, {
                        text: "Contact",
                        icon: "reco-message",
                        items: [
                            {
                                text: "GitHub",
                                link: "https://github.com/mr6915tri8513",
                                icon: "reco-github"
                            }, {
                                text: "Email",
                                link: "mailto:mr6915tri8513@gmail.com",
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
                            collacollapsable: false,
                            children: [
                                {
                                    title: "widget1",
                                    path: "widget/widget1/"
                                }
                            ]
                        }, {
                            title: "Project",
                            path: "/docs/project/",
                            collacollapsable: false,
                            children: [
                                {
                                   title: "Integrated Queue System",
                                   path: "project/integrated_queue_system/"
                                }, {
                                    title: "PSU Sensor",
                                    path: "project/psu_sensor/"
                                }, {
                                    title: "Security Smart Home",
                                    path: "project/security_smart_home/"
                                }
                            ]
                        }, {
                            title: "Others",
                            path: "/docs/others/",
                            collacollapsable: false,
                            children: [
                                {
                                    title: "Update Record",
                                    path: "others/update_record/"
                                }
                            ]
                        }
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
                        icon: "reco-tag",
                        link: "/zh-TW/tag/",
                        items: [
                            {
                                text: "Android",
                                link: "/zh-TW/tag/Android/"
                            }, {
                                text: "Arduino",
                                link: "/zh-TW/tag/Arduino/"
                            }, {
                                text: "Windows Forms",
                                link: "/zh-TW/tag/Windows%20Forms/"
                            }
                        ]
                    }, {
                        text: "分類",
                        icon: "reco-category",
                        link: "/zh-TW/categories/",
                        items: [
                            {
                                text: "日記",
                                link: "/zh-TW/categories/日記/"
                            }
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
                            }, {
                                text: "其他",
                                link: "/zh-TW/docs/others/"
                            }
                        ]
                    }, {
                        text: "聯絡方式",
                        icon: "reco-message",
                        items: [
                            {
                                text: "GitHub",
                                link: "https://github.com/mr6915tri8513",
                                icon: "reco-github"
                            }, {
                                text: "電子郵件",
                                link: "mailto:mr6915tri8513@gmail.com",
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
                            collacollapsable: false,
                            children: [
                                {
                                    title: "小工具1",
                                    path: "widget/widget1/"
                                }
                            ]
                        }, {
                            title: "專題",
                            path: "/zh-TW/docs/project/",
                            collacollapsable: false,
                            children: [
                                {
                                    title: "整合排隊系統",
                                    path: "project/integrated_queue_system/"
                                }, {
                                    title: "電競檢測儀",
                                    path: "project/psu_sensor/"
                                }, {
                                    title: "Security Smart Home",
                                    path: "project/security_smart_home/"
                                }
                            ]
                        }, {
                        title: "其他",
                            path: "/zh-TW/docs/others/",
                            collacollapsable: false,
                            children: [
                                {
                                    title: "更新紀錄",
                                    path: "others/update_record/"
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
            locales: {
                "/": {
                    category: {
                        location: 2,
                        text: "Category2"
                    },
                    tag: {
                        location: 3,
                        text: "Tag2"
                    }
                },
                "/zh-TW/": {
                    category: {
                        location: 2,
                        text: "abc"
                    },
                    tag: {
                        location: 3,
                        text: "def"
                    }
                }
            }
        },
        friendLink: [
            {
                title: "I-am-nothing",
                desc: "He's my classmate and friend.",
                logo: "https://i-am-nothing.github.io/hero.png",
                link: "https://i-am-nothing.github.io/"
            }, {
                title: "湊あくあ",
                desc: "She's a VTuber in hololive",
                logo: "https://yt3.ggpht.com/ytc/AKedOLT8eMK0R-4YoVFyKUt3r6jqZA4uq9cHf1hyVv-Oyg=s176-c-k-c0x00ffffff-no-rj",
                link: "https://www.youtube.com/channel/UC1opHUrw8rvnsadT-iGp7Cg"
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
        subSidebar: "auto",
        sidebarDepth: 1,
        displayAllHeaders: false,
    },
    markdown: {
        "lineNumbers": true
    }
}