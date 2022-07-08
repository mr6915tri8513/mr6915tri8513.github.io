module.exports = {
    plugins: {
        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
                return new Date(timestamp).toLocaleDateString();
            }
        },
        'sitemap': {
            hostname: 'https://mr6915tri8513.github.io/'
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
                tagLocale: {
                    arduino: "Arduino",
                    android: "Android",
                    windows_forms: "Windows Forms",
                    lang: "English"
                },
                categoryLocale: {
                    diary: "Diary"
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
                        link: "/tag/"
                    }, {
                        text: "Categories",
                        icon: "reco-category",
                        items: [
                            {
                                text: "Diary",
                                link: "/categories/Diary/"
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
                                    title: "About The Pictures On This Website",
                                    path: "others/about_the_pictures_on_this_website/"
                                }, {
                                    title: "Locale Optimization",
                                    path: "others/locale_optimization/"
                                }, {
                                    title: "Update Record",
                                    path: "others/update_record/"
                                }
                            ]
                        }
                    ]
                },
                lastUpdated: "Last Updated",
                friendLink: [
                    {
                        title: "I-am-nothing",
                        desc: "He's my senior high school classmate and friend.",
                        logo: "https://i-am-nothing.github.io/hero.png",
                        link: "https://i-am-nothing.github.io/"
                    }, {
                        title: "湊あくあ",
                        desc: "She's a VTuber in hololive",
                        logo: "https://yt3.ggpht.com/ytc/AKedOLT8eMK0R-4YoVFyKUt3r6jqZA4uq9cHf1hyVv-Oyg=s176-c-k-c0x00ffffff-no-rj",
                        link: "https://www.youtube.com/channel/UC1opHUrw8rvnsadT-iGp7Cg"
                    }
                ],
                blogConfig: {
                    socialLinks: [
                        {
                            text: "GitHub",
                            icon: "reco-github",
                            link: "https://github.com/mr6915tri8513"
                        }, {
                            text: "mail",
                            icon: "reco-mail",
                            link: "mailto:mr6915tri8513@gmail.com"
                        }
                    ]
                },
                vssueConfig: {
                    platform: 'github',
                    owner: 'mr6915tri8513',
                    repo: 'mr6915tri8513.github.io',
                    clientId: '0c1b084dc011af264f38',
                    clientSecret: '89160c67da6ea1a3c43878639703149ef7cb0119',
                    locale: 'en-US'
                }
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
                recoLocales: {
                    homeBlog: {
                        tag: "標籤"
                    },
                    pagation: {
                        prev: '上一頁',
                        next: '下一頁',
                        go: 'GO',
                        jump: '跳轉至'
                    }
                },
                tagLocale: {
                    arduino: "Arduino",
                    android: "Android",
                    windows_forms: "Windows Forms",
                    lang: "中文"
                },
                categoryLocale: {
                    diary: "日記"
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
                        link: "/zh-TW/tag/"
                    }, {
                        text: "分類",
                        icon: "reco-category",
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
                                    title: "關於本網站的圖片",
                                    path: "others/about_the_pictures_on_this_website/"
                                }, {
                                    title: "語言環境優化",
                                    path: "others/locale_optimization/"
                                }, {
                                    title: "更新紀錄",
                                    path: "others/update_record/"
                                }
                            ]
                        }
                    ]
                },
                lastUpdated: "最後更新",
                friendLink: [
                    {
                        title: "I-am-nothing",
                        desc: "他是我的高中同學兼朋友",
                        logo: "https://i-am-nothing.github.io/hero.png",
                        link: "https://i-am-nothing.github.io/"
                    }, {
                        title: "湊あくあ",
                        desc: "她是 hololive 旗下的一位 VTuber",
                        logo: "https://yt3.ggpht.com/ytc/AKedOLT8eMK0R-4YoVFyKUt3r6jqZA4uq9cHf1hyVv-Oyg=s176-c-k-c0x00ffffff-no-rj",
                        link: "https://www.youtube.com/channel/UC1opHUrw8rvnsadT-iGp7Cg"
                    }
                ],
                blogConfig: {
                    socialLinks: [
                        {
                            text: "GitHub",
                            icon: "reco-github",
                            link: "https://github.com/mr6915tri8513"
                        }, {
                            text: "電子郵件",
                            icon: "reco-mail",
                            link: "mailto:mr6915tri8513@gmail.com"
                        }
                    ]
                },
                vssueConfig: {
                    platform: 'github',
                    owner: 'mr6915tri8513',
                    repo: 'mr6915tri8513.github.io',
                    clientId: '0c1b084dc011af264f38',
                    clientSecret: '89160c67da6ea1a3c43878639703149ef7cb0119',
                    locale: 'zh-TW'
                }
            },
        },
        type: "blog",
        logo: "/home_page/logo.jpg",
        mode: "dark",
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