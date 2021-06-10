<template>
  <X-PageContainer>
    <X-TableContainer>
      <X-TableHeader slot="header">
        <template slot="left">
          <el-button type="warning" size="small" round @click="toAdd">添加分类</el-button>
        </template>
        <template slot="right">
          <X-KeywordSearch v-model="keyWords" />
        </template>
      </X-TableHeader>
      <el-table
        slot-scope="{ maxHeight }"
        :max-height="maxHeight"
        v-loading="$data.$_table_loading"
        :data="$data.$_table_list"
      >
        <el-table-column label="分类名称" prop="typeName" />
        <el-table-column label="添加时间" width="100">
          <template slot-scope="{ row }">
            {{ $dayjs(row.createTime).format('YYYY-MM-DD') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="{ row }">
            <el-link type="info" @click="toEdit(row)">编辑</el-link>
            <el-divider direction="vertical" />
            <el-link type="danger" @click="toDelete(row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        slot="footer"
        background
        :total="$data.$_table_total"
        :current-page.sync="$data.$_table_page"
        :page-size.sync="$data.$_table_pageSize"
        layout="prev,pager,next,sizes,total,jumper"
      />
    </X-TableContainer>
  </X-PageContainer>
</template>

<script>
import { createTableMixin } from '@/mp-kit/mixins/table'
import { MODULE_NAME } from '..'
import { getCategoryList, deleteCategory } from '../api/index.js'

export default {
  mixins: [
    createTableMixin({
      routeName() {
        return this.$config.getModuleRouteName(MODULE_NAME, 'category')
      },
      loadTableData({ page, pageSize }) {
        return getCategoryList({
          page,
          pageSize,
          orgCode: this.$storage.userInfo.orgCode,
          search: this.keyWords,
        }).then(res => ({
          list: res.data.data || [],
          total: res.data.total,
        }))
      },
    }),
  ],
  data() {
    return {
      keyWords: '',
    }
  },
  watch: {
    keyWords: '$_table_loadFirstPage',
  },
  created() {
    this.$_table_load()
  },
  methods: {
    // 新增数据
    toAdd() {
      this.$router.push({
        name: this.$config.getModuleRouteName(MODULE_NAME, 'category_edit'),
      })
    },
    // 编辑数据
    toEdit(item) {
      this.$router.push({
        name: this.$config.getModuleRouteName(MODULE_NAME, 'category_edit'),
        query: {
          id: item.id,
        },
      })
    },
    // 删除数据
    toDelete(item) {
      if (!item) return
      this.$confirm('确定要删除该数据吗?', { type: 'warning' })
        .then(() => {
          deleteCategory({ id: item.id })
            .then(() => {
              this.$message.success('删除成功')
              this.$_table_load()
            })
            .catch(err => {
              this.$message.error(err.message)
              console.error(err)
            })
        })
        .catch(() => {})
    },
  },
}
</script>

<style>
</style>
