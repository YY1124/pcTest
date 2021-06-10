<template>
  <div class="base-components-List-SelectList">
    <div class="head">
      <X-KeywordSearch v-model="search" />
    </div>
    <div class="body">
      <el-table :data="list" ref="singleTable" @current-change="onSelect" highlight-current-row>
        <template v-for="col in columns">
          <el-table-column
            v-if="col.render"
            :prop="col.prop"
            :key="col.prop"
            :label="col.label"
            :width="col.width"
            :align="col.align"
            :show-overflow-tooltip="col.showOverflowTooltip"
          >
            <template slot-scope="scope">
              <RenderDom v-if="col.render" :renderFunc="() => col.render(scope)" />
            </template>
          </el-table-column>

          <el-table-column
            v-else
            :prop="col.prop"
            :key="col.prop"
            :label="col.label"
            :width="col.width"
            :show-overflow-tooltip="col.showOverflowTooltip"
          >
          </el-table-column>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        background
        :total="total"
        :current-page.sync="page"
        :page-size.sync="pageSize"
        layout="prev,pager,next,sizes,total,jumper"
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {
    RenderDom: {
      props: {
        renderFunc: {
          type: Function,
          default: () => {
            return () => {}
          },
        },
      },
      render: function (h) {
        if (this.renderFunc) {
          return this.renderFunc()
        }
        return null
      },
    },
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return null
      },
    },
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    load: {
      type: Function,
      default: () => {
        return null
      },
    },
  },
  data() {
    return {
      search: null,
      pageSize: 10,
      page: 1,
      total: 0,
      list: [],
      loading: false,
    }
  },
  mounted() {
    this.execLoad()
  },
  methods: {
    async execLoad() {
      if (!this.load) {
        this.list = []
        this.total = 0
        this.page = 1

        return false
      }

      this.loading = true
      try {
        const { data, total } = await this.load({
          page: this.page,
          pageSize: this.pageSize,
          search: this.search,
        })

        this.list = data
        this.total = total
      } catch (error) {
        console.error(error)
      }

      this.loading = false
    },
    toggleRow({ id }) {
      const row = this.list.find(item => item.id == id || null)

      if (row) {
        this.$refs.singleTable.setCurrentRow(row)
      } else {
        this.$refs.singleTable.setCurrentRow()
      }
    },
    initSelected() {
      if (this.value) {
        this.toggleRow(this.value)
      }
    },
    onSelect(v) {
      this.$emit('input', v)
    },
    doSearch() {
      this.execLoad()
    },
  },
  watch: {
    search() {
      this.doSearch()
    },
    list: 'initSelected',
    value: {
      deep: true,
      handler: 'initSelected',
    },
  },
}
</script>


<style lang="scss" scoped>
.base-components-List-SelectList {
  padding: 10px;
  width: calc(100% - 20px);

  .head {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }

  .body {
    width: 100%;
    height: 100%;
    margin-bottom: 10px;
  }

  .footer {
    width: 100%;
  }
}
</style>