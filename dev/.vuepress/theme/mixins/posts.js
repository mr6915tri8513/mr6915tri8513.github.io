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
      this.pages = pages.length == 0 ? [] : pages
      for (let i = 0, length = pages.length; i < length; i++) {
        const page = pages[i]
        const pageDateYear = dateFormat(page.frontmatter.date, 'year')
        if (formatPages[pageDateYear]) formatPages[pageDateYear].push(page)
        else {
          formatPages[pageDateYear] = [page]
        }
      }

      for (const key in formatPages) {
        const data = formatPages[key]
        sortPostsByDate(data)
        formatPagesArr.unshift({
          year: key,
          data
        })
      }

      return formatPagesArr
    },
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
    $showSubSideBar () {
      const {
        $themeConfig: { subSidebar: themeSubSidebar, sidebar: themeSidebar },
        $frontmatter: { subSidebar: pageSubSidebar, sidebar: pageSidebar }
      } = this

      const headers = this.$page.headers || []

      if ([pageSubSidebar, pageSidebar].indexOf(false) > -1) {
        return false
      } else if ([pageSubSidebar, pageSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else if ([themeSubSidebar, themeSidebar].indexOf('auto') > -1 && headers.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}

function renderTime (date) {
  var dateee = new Date(date).toJSON()
  return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/-/g, '/')
}
function dateFormat (date, type) {
  date = renderTime(date)
  const dateObj = new Date(date)
  const year = dateObj.getFullYear()
  const mon = dateObj.getMonth() + 1
  const day = dateObj.getDate()
  if (type == 'year') return year
  else return `${mon}-${day}`
}
