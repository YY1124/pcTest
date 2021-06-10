import debounce from 'lodash/debounce'

const LOAD_DEBOUNCE_TIMEOUT = 100

export function createTableMixin({ loadTableData, routeName }) {
  return {
    data() {
      return {
        $_table_list: [],
        $_table_page: 1,
        $_table_pageSize: 10,
        $_table_total: null,
        $_table_loading: false,
      }
    },
    watch: {
      '$data.$_table_page': '$_table_load',
      '$data.$_table_pageSize': '$_table_loadFirstPage',
    },
    beforeRouteUpdate(to, from, next) {
      next()

      // 如果目标路由是当前页面的话，更新表格数据
      if (routeName) {
        const name = typeof routeName === 'function' ? routeName.call(this) : routeName
        if (to.name === name) {
          this.$_table_load()
        }
      }
    },
    methods: {
      async $_table_loadFirstPage() {
        this.$data.$_table_page = 1
        this.$_table_load()
      },
      $_table_load: debounce(async function () {
        this.$data.$_table_loading = true
        try {
          const { $_table_page: page, $_table_pageSize: pageSize } = this.$data
          const { list, total } = await loadTableData.call(this, { page, pageSize })
          this.$data.$_table_list = list || []
          this.$data.$_table_total = total
        } catch (err) {
          this.$data.$_table_list = []
          this.$data.$_table_total = null
          this.$message.error(err.message)
          console.error(err)
        } finally {
          this.$data.$_table_loading = false
        }
      }, LOAD_DEBOUNCE_TIMEOUT),
    },
  }
}
