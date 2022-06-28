---
title: 語言環境優化
date: 2022-06-29
---
## 學習成果
* 很多 **JavaScript**
* 一些 **Vue**
* 一點點 **CSS**

## 簡介
在 I-am-nothing 的推薦下選用了 [vuepress-theme-reco][] 這個主題，也在他的堅持下設置了 [多語言][]。

然而我很快便發現了一些問題：

### **重複的文章**
要達成多語言，必須將 **同個文章的不同語言版本** 在該語言的同個路徑下，也就是說有幾種語言就會有幾個同個文章的文件，然後他們就會 **同時出現在文章列表**，這樣很亂。

### **時間線、標籤、分類頁面都只有一種語言**
這些頁面都只有預設語言，在裡面切換語言時會因為路徑不存在而 **回到首頁**。

-----
-----
以上問題在網路上查找過之後，依然沒有找到可以從外部設定解決的方法，我便決定修改原始碼。

## 事先聲明
* 即使需要自己手動改原始碼，我依然覺得這是個十分優秀的主題
* 如果有更好的辦法歡迎在下方評論 (以後會加) 提出
* 我之前完全沒有寫網站的經驗，如果寫法看起來很白癡的話請多包涵

## 改造開始
### **首先**
一開始得把主題從 **node_modules** 底下複製出來，放到 **.vuepress** 裡面，並把資料夾名稱重新命名為 **theme**。然後在 **.vuepress/config.js**
中把 **theme** 這項刪掉，這樣系統就會去找 **.vuepress/theme**，沒有的話才會套默認主題。(參考自 [這篇文章][個人向優化])

**.vuepress/config.js**
```js
module.exports = {
    theme: 'reco'
}
```

要這麼做是因為，日後如果有用 npm 或 yarn 下載插件之類的就會把改過的東西覆蓋掉。

### **時間線、標籤、分類頁面的其他語言**
這個是最不確定的部分，找了很久還是看不懂 frontmatter 到底是怎麼處理的，所以目前只能暫時採取有效的辦法。

尚未解決的疑問：
* **id** 和 **key** 的作用是什麼？
* 採用何種語言是只看 **path** 嗎？

**theme/index.js**

增加幾行 (這裡是用 zh-TW)
```js{29-49}
module.exports = (options, ctx) => ({
    // ...
    plugins: [
        // ...
        '@vuepress/plugin-nprogress',
        ['@vuepress/plugin-blog', {
            permalink: '/:regular',
            frontmatters: [
                {
                    id: 'tags',
                    keys: ['tags'],
                    path: '/tag/',
                    layout: 'Tags',
                    scopeLayout: 'Tag'
                },
                {
                    id: 'categories',
                    keys: ['categories'],
                    path: '/categories/',
                    layout: 'Categories',
                    scopeLayout: 'Category'
                },
                {
                    id: 'timeline',
                    keys: ['timeline'],
                    path: '/timeline/',
                    layout: 'TimeLines',
                    scopeLayout: 'TimeLine'
                },{
                    id: 'tags',
                    keys: ['tags'],
                    path: '/zh-TW/tag/',
                    layout: 'Tags',
                    scopeLayout: 'Tag'
                },
                {
                    id: 'categories',
                    keys: ['categories'],
                    path: '/zh-TW/categories/',
                    layout: 'Categories',
                    scopeLayout: 'Category'
                },
                {
                    id: 'timeline',
                    keys: ['timeline'],
                    path: '/zh-TW/timeline/',
                    layout: 'TimeLines',
                    scopeLayout: 'TimeLine'
                },
            ]
        }]
        // ...
    ]
})
```
這樣就會有 **/zh-TW/tag/**、**/zh-TW/categories/**、**/zh-TW/timeline/** 這幾個路徑了。

**時間線** 這樣就 OK 了，但 **標籤** 和 **分類** 還是有一些小問題：
* 在其他語言時，點 **全部** 這個標籤的時候會回到 **/tag/**，而不是留在當前語言
* 而其他標籤則會跑到 **最後添加的語言** (此處為 zh-TW)
* **分類** 也是相同的情況，只不過它沒有全部這一項
* **文章列表** 中各個文章的標籤則是都會回到預設語言
-----
這裡順便把原本應該是不小心拼錯？ ($tagList) 的地方給改了

**theme/mixins/posts.js**
```js{7,9,16,17,19}
import { filterPosts, sortPostsByStickyAndDate, sortPostsByDate } from '../helpers/postData'

export default {
  computed: {
    // ...
    $categoriesList () {
      const localePath = this.$localePath
      return this.$categories.list.map(category => {
        category.path = category.path.replace(/^\/?[\w-]*\/categories/, localePath + 'categories')
        category.pages = category.pages.filter(page => {
          return page.frontmatter.publish !== false
        })
        return category
      })
    },
    $tagsList () {
      const localePath = this.$localePath
      return this.$tags.list.map(tag => {
        tag.path = tag.path.replace(/^\/?[\w-]*\/tag/, localePath + 'tag')
        tag.pages = tag.pages.filter(page => {
          return page.frontmatter.publish !== false
        })
        return tag
      })
    },
    // ...
  }
}

// ...
```
**theme/components/TagList.vue**
```vue{11}
...

<script>
// ...

export default defineComponent({
  // ...
  setup (props, ctx) {
    const instance = useInstance()
    const tags = computed(() => {
      return [{ name: instance.$recoLocales.all, path: instance.$localePath + 'tag/' }, ...instance.$tagsList]
    })

    // ...
  }
})
</script>

...
```
**theme/components/PageInfo.vue**
```vue{13-15}
...

<script>
// ...

export default defineComponent({
  // ...

  setup (props, ctx) {
    // ...

    const goTags = (tag) => {
      const localePath = instance.$localePath
      if (instance.$route.path !== localePath + `tag/${tag}/`) {
        instance.$router.push({ path: localePath + `tag/${tag}/` })
      }
    }

    // ...
  }
})
</script>

...
```

### **文章過濾**
這是影響最多的部分，整個主題裡面有用到 4 次 (首頁、時間線、標籤、分類)，改了之後整個都會好很多。

**theme/helpers/postData.js**
```js{4-6,8,13-14}
import { compareDate } from '@theme/helpers/utils'

// 过滤博客数据
export function filterPosts (posts, isTimeline, localeConfig) {
  const { localePath, locales = [] } = localeConfig || {}
  const regExp = new RegExp(`^${ locales.filter(locale => locale !== '/').join('|') }`)
  posts = posts.filter((item, index) => {
    const { title, path, frontmatter: { home, date, publish } } = item
    // 过滤多个分类时产生的重复数据
    if (posts.indexOf(item) !== index) {
      return false
    } else {
      const localeCondition = localePath === '/' ? !regExp.test(path) : path.startsWith(localePath)
      const someConditions = home === true || title == undefined || publish === false || !localeCondition
      const boo = isTimeline === true
        ? !(someConditions || date === undefined)
        : !someConditions
      return boo
    }
  })
  return posts
}

// ...
```
既然增加了參數，引用的地方自然也得改：

**theme/mixins/posts.js**
```js{8-12,21-25}
import { filterPosts, sortPostsByStickyAndDate, sortPostsByDate } from '../helpers/postData'

export default {
  computed: {
    $recoPosts () {
      let posts = this.$site.pages

      const localeConfig = {
        localePath: this.$localePath,
        locales: Object.keys(this.$site.locales)
      }
      posts = filterPosts(posts, false, localeConfig)
      sortPostsByStickyAndDate(posts)

      return posts
    },
    $recoPostsForTimeline () {
      let pages = this.$recoPosts
      const formatPages = {}
      const formatPagesArr = []
      const localeConfig = {
        localePath: this.$localePath,
        locales: Object.keys(this.$site.locales)
      }
      pages = filterPosts(pages, true, localeConfig)
      // ...
    },
    // ...
  }
}
```
**theme/layouts/Tag.vue**
```vue{16-20}
...

<script>
// ...

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: { Common, NoteAbstract, TagList, ModuleTransition },

  setup (props, ctx) {
    const instance = useInstance()

    // 时间降序后的博客列表
    const posts = computed(() => {
      let posts = instance.$currentTags.pages
      const localeConfig = {
        localePath: instance.$localePath,
        locales: Object.keys(instance.$site.locales)
      }
      posts = filterPosts(posts, false, localeConfig)
      sortPostsByStickyAndDate(posts)
      return posts
    })

    // ...
  }
})
</script>

...
```
**theme/layouts/Category.vue**
```vue{15-19}
...

<script>
// ...

export default defineComponent({
  mixins: [moduleTransitonMixin],
  components: { Common, NoteAbstract, ModuleTransition },

  setup (props, ctx) {
    const instance = useInstance()

    const posts = computed(() => {
      let posts = instance.$currentCategories.pages
      const localeConfig = {
        localePath: instance.$localePath,
        locales: Object.keys(instance.$site.locales)
      }
      posts = filterPosts(posts, false, localeConfig)
      sortPostsByStickyAndDate(posts)
      return posts
    })

    // ...
  }
})
</script>

...
```

### **標籤和分類的多語言**
這個算是這次改動最核心的部分，其他地方都需要和這裡做配合。

注意：在 **.md 文件** 中的 **frontmatter** 的 **分類** 和 **標籤** 就已經是翻譯過的。

看起來會像這樣：

/diary.md
```md
---
title: Today's Diary
date: 2022-06-29
categories:
- Diary
tags:
- English
---
```
/zh-TW/diary.md
```md
---
title: 今天的日記
date: 2022-06-29
categories:
- 日記
tags:
- 繁體中文
---
```
改完之後發現有些 **非當前語言的分類或標籤** 還留在那裡，但是點進去後卻 **沒有任何文章**。這是因為上方的 
**分類或標籤清單** 跟下方的 **文章列表** 取得文章的方法不一樣，所以還得另外處理：

**theme/mixins/posts.js**
```js{7,12-14,19-21,23,25-27}
import { filterPosts, sortPostsByStickyAndDate, sortPostsByDate } from '../helpers/postData'

export default {
  computed: {
    // ...
    $categoriesList () {
      const locales = Object.keys(this.$site.locales)
      const localePath = this.$localePath
      return this.$categories.list.map(category => {
        category.path = category.path.replace(/^\/?[\w-]*\/categories/, localePath + 'categories')
        category.pages = category.pages.filter(page => {
          const localeCondition = localePath === '/' ?
              !locales.some(locale => locale !== '/' && page.path.startsWith(locale)) : page.path.startsWith(localePath)
          return page.frontmatter.publish !== false && localeCondition
        })
        return category
      })
    },
    $tagsList () {
      const locales = Object.keys(this.$site.locales)
      const localePath = this.$localePath
      return this.$tags.list.map(tag => {
        tag.path = tag.path.replace(/^\/?[\w-]*\/tag/, localePath + 'tag')
        tag.pages = tag.pages.filter(page => {
          const localeCondition = localePath === '/' ?
            !locales.some(locale => locale !== '/' && page.path.startsWith(locale)) : page.path.startsWith(localePath)
          return page.frontmatter.publish !== false && localeCondition
        })
        return tag
      })
    },
    // ...
  }
}

// ...
```
首頁也得改

**theme/components/HomeBlog/index.vue**
```vue{15-18}
<template>
  <div class="home-blog">
    <!-- ... -->

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><reco-icon icon="reco-category" /> {{$recoLocales.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item"
                v-for="(item, index) in this.$categoriesList"
                v-show="item.pages.length > 0"
                :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <!-- ... -->
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

...
```
最後一個問題是，在分類或標籤頁面 **切換語言** 時，如果前後語言的 **分類或標籤名稱不一樣**
會因為 **路徑不存在** 而回到首頁。

解法是在 **config.js** 中加入 **各個分類或標籤名稱的對應 id**，然後在切換語言時對路徑做相對應的調整。

**.vuepress/config.js**
```js{5-14,17-26}
module.exports = {
    themeConfig: {
        locales: {
            '/': {
                tagLocale: {
                    tag_id: 'Tag Name',
                    //food: 'Food'
                    // ...
                },
                categoryLocale: {
                    category_id: 'Category Name',
                    // diary: 'Diary'
                    // ...
                }
            },
            '/zh-TW': {
                tagLocale: {
                    tag_id: '標籤名稱',
                    //food: '食物'
                    // ...
                },
                categoryLocale: {
                    category_id: '類別名稱',
                    // diary: '日記'
                    // ...
                }
            }
        }
    }
}
```
順便把語言的圖示給加上去了:innocent:

**theme/components/NavLinks.vue**
```vue{19,21,30-52}
...

<script>
// ...

export default defineComponent({
  components: { NavLink, DropdownLink, RecoIcon },

  setup (props, ctx) {
    // ...

    const nav = computed(() => {
      const locales = instance.$site.locales || {}

      if (locales && Object.keys(locales).length > 1) {
        const currentLink = instance.$page.path
        const routes = instance.$router.options.routes
        const themeLocales = instance.$themeConfig.locales || {}
        const localePath = instance.$localePath
        const languageDropdown = {
          icon: 'reco-language',
          text: instance.$themeLocaleConfig.selectText || 'Languages',
          items: Object.keys(locales).map(path => {
            const locale = locales[path]
            const text = themeLocales[path] && themeLocales[path].label || locale.lang
            let link
            // Stay on the current page
            if (locale.lang === instance.$lang) {
              link = currentLink
            } else if (currentLink.startsWith(localePath + 'categories')) {
              if (themeLocales[localePath].categoryLocale && themeLocales[path].categoryLocale) {
                const name = currentLink.slice(localePath.length + 11, -1)
                for (const id in themeLocales[localePath].categoryLocale) {
                  if (themeLocales[localePath].categoryLocale[id] === name && themeLocales[path].categoryLocale[id]) {
                    link = path + 'categories/' + themeLocales[path].categoryLocale[id] + '/'
                    break
                  }
                }
              }
            } else if (currentLink.startsWith(localePath + 'tag')) {
              if (themeLocales[localePath].tagLocale && themeLocales[path].tagLocale) {
                const name = currentLink.slice(localePath.length + 4, -1)
                for (const id in themeLocales[localePath].tagLocale) {
                  if (themeLocales[localePath].tagLocale[id] === name && themeLocales[path].tagLocale[id]) {
                    link = path + 'tag/' + themeLocales[path].tagLocale[id] + '/'
                    break
                  }
                }
              }
            }

            if (!link) {
              // Try to stay on the same page
              link = currentLink.replace(instance.$localeConfig.path, path)
              // fallback to homepage
              if (!routes.some(route => route.path === link)) {
                link = path
              }
            }
            return { text, link }
          })
        }

        return [...userNav.value, languageDropdown]
      }

      // ...
    })

    // ...
  }
})
</script>

...
```

### **友情鏈接**
這個好像不是很重要:thinking:，但既然要做就做到底吧。

把 **friendLink** 也放進 **locales** 裡面

**.vuepress/config.js**
```js{5-7,10-12}
module.exports = {
    themeConfig: {
        locales: {
            '/': {
                friendLink: [
                    // ...
                ]
            },
            'zh-TW': {
                friendLink: [
                    // ...
                ]
            }
        }
    }
}
```
**theme/components/FriendLink.vue**
```vue{13}
...

<script>
// ...

export default defineComponent({
  setup (props, ctx) {
    const instance = useInstance()

    const { popupWindowStyle, showDetail, hideDetail } = useDetail()

    const dataAddColor = computed(() => {
      const { friendLink = [] } = instance && (instance.$themeLocaleConfig || instance.$themeConfig)
      return friendLink.map(item => {
        item.color = getOneColor()
        return item
      })
    })

    // ...
  }
})
</script>

...
```
**theme/components/HomeBlog/index.vue**
```vue{10-12}
<template>
  <div class="home-blog">
    <!-- ... -->

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <!-- ... -->
        <div class="info-wrapper">
          <!-- ... -->
          <h4 v-if="($themeConfig.friendLink && $themeConfig.friendLink.length !== 0) ||
            ($themeLocaleConfig.friendLink && $themeLocaleConfig.friendLink.length !== 0)">
            <reco-icon icon="reco-friend" /> {{$recoLocales.friendLink}}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <!-- ... -->
  </div>
</template>

...
```
這樣就能吃到 **locales** 裡面的 **friendLink** 了:clap:

## 心得
雖然改完之後看起來確實舒服非常多，成就感滿滿，但我還是真心建議 **非到必要** 不要改庫裡面的原始碼。其一是整個庫裡面的東西
**一層包一層**，十分複雜，而且畢竟不是自己寫的，要理解有一定的難度。我這次花了 **快一周**
整天都在看原始碼，也只改了一點點，還有部分依然沒看懂，真的很花時間。其二是我覺得 **這麼做對作者不是很尊重**，有種 **拿了別人的努力成果**
的感覺，所以 [首頁頁腳][] 的那個主題連結 **就算作者說可以改，我也會一直把它留著**。

過程中其實還改了一些其他東西，不過跟語言環境沒有關係，就不寫在這裡了，有空的話可能會另外寫一篇吧。


[vuepress-theme-reco]: https://vuepress-theme-reco.recoluan.com/
[多語言]: https://vuepress-theme-reco.recoluan.com/views/1.x/local.html
[個人向優化]: https://vuepress-theme-reco.recoluan.com/views/other/reco-optimization.html#更换主题为本地
[首頁頁腳]: https://vuepress-theme-reco.recoluan.com/views/other/question.html#_3-%E9%A6%96%E9%A1%B5%E9%A1%B5%E8%84%9A%E6%98%AF%E5%90%A6%E5%8F%AF%E4%BB%A5%E8%87%AA%E5%AE%9A%E4%B9%89
"首頁頁腳可以自定義嗎？ 不可以"