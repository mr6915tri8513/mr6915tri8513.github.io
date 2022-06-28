---
title: Locale Optimization
date: 2022-06-29
---
## What I Learned
* lots of **JavaScript**
* some **Vue**
* a little **CSS**

## Summary
Under the recommendation of I-am-nothing, I chose the theme of [vuepress-theme-reco][].
And also because of him, I set up the [multi-language][].

But soon I found some problems:

### **Duplicate Articles**
To get multi-language, I have to put **different language versions of the same article** under the same path in that language.
In other words, there will be the same number of files belong to one article.
Then those files will **be displayed in the article list at the same time**, which is very messy.

### **TimeLine Page, Tag Page, Category Page Only Have One Language**
These pages only have the default language, and when you switch languages,
it'll **return to the home page**due to non-existing path.

-----
-----
After searching the above problems on the Internet, I still can't find a solution that can set from external config,
so I decided to modify the source code.


## Declare In Advance
* Even if I need to modify the source code myself, I still think this is a very excellent theme
* If there is a better way, please comment below (will be added later)
* I have no experience in making websites at all before, so please forgive me if it looks terrible

## Begin Modifying
### **First**
To begin with, copy the theme from **node_modules** into **.vuepress** and rename the folder to **theme**.
Then in **.vuepress/config.js** remove this, so that the system will try to find **.vuepress/theme**,
if not, the default theme will be set. (reference from [this article][personal optimization])

**.vuepress/config.js**
```js
module.exports = {
    theme: 'reco'
}
```
This is because if you use npm or yarn to download something like plugins in the future, the changed things will be overwritten.

### **TimeLine Page, Tag Page, Category Page In Other Languages**
This is the most uncertain part. After searching for a long time, I still can't understand how it handles frontmatter,
so at present, I can only take some effective measures temporarily.

unsolved questions：
* What is the role of **id** and **key** ?
* Is what the language is based only on **path** ?

**theme/index.js**

add a few lines (here is zh-TW)
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
In this way, there will be paths **/zh-TW/tag/**, **/zh-TW/categories/** and **/zh-TW/timeline/** .

**TimeLine Page** is OK now, but there are still some small problems with **Tag Page** and **Category Page**:
* In other languages, clicking **all** will return to **/tag/** instead of staying in the current language
* While other tabs will go to **the last language added** (here is zh-TW)
* **Category Page** is the same, but it doesn't have **All**
* In **article list**, the tags of each article will return to the default language

Here, I have changed the typo ($tagList) that supposed to be an accident by the way.

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

### **Article Filtering**
This is the most influential part. It has been used 4 times (home page, timeline, tags, categories) in the entire theme,
and the whole will look much better after changing it.

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
Now that the parameters were added, the references should be changed too.

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

### **Locales For Tags And Categories**
This is probably the core of this modifying, which means other places have to associate with this.

Note: **categories** and **tags** of **frontmatter** in **.md files** are already translated.

It will look like this:

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
After the change, I found that some **non-current language categories or tags** are still there, 
but there are **not any articles** after clicking in. This is because the method of obtaining articles 
in the **category or tag list** above is different from that in the **article list** below, so it has to be processed separately:

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
The home page has to be changed as well

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
The last problem is that when **switching languages** on Category Page or Tag Page, if **the category or tag name of 
the current and selected languages is different**, it will return to the home page because **the path does not exist**.

The solution is to add **corresponding id** of each category or tag name to **config.js**, 
and then adjust the path accordingly when switching languages.

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
I also added the icon of language at the same time:innocent:

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

### **Friend Links**
This doesn't seem to be very important :thinking:, but let's do it to the end.

put **friendLink** in **locales** too

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
This way it can get **friendLink** in **locales**:clap:

## After Doing This
Although it looks really comfortable after the modifying, and I'm full of the sense of achievement, 
I still sincerely recommend that do not change the source code in the library **unless it is necessary**. 
The first is that everything in the entire library is **packaged one by one**, which is very complicated, 
and after all, it is not written by oneself, so it is difficult to understand.
This time I spent **almost a week** reading the source code all day, I could only change a little,
and I still didn't understand some parts. It really took a lot of time.
The second is that I feel that **doing this is not very respectful to the author**.
It's a kind of feeling that **I have taken the results of other people's efforts**. 
Therefore, even if the author says the theme link in **[the footer of the home page][Footer of Home Page]** can be changed,
I will always keep it there.

In fact, some other things were changed in the process, but it has nothing to do with the locale, so I didn't mention it here.
If I have time, I may write it in another one.


[vuepress-theme-reco]: https://vuepress-theme-reco.recoluan.com/en/
[multi-language]: https://vuepress-theme-reco.recoluan.com/en/views/1.x/local.html
[personal optimization]: https://vuepress-theme-reco.recoluan.com/views/other/reco-optimization.html#更换主题为本地
[Footer of Home Page]: https://vuepress-theme-reco.recoluan.com/en/views/other/question.html#_3-can-the-footer-of-home-page-be-customized
"Can the Footer of Home Page Be Customized? Sorry, you can't."