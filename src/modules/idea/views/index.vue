<template>
  <X-PageContainer>
    <X-TableContainer>
      <X-TableHeader slot="header">
        <template slot="right">
          <X-AreaSelect
            v-on:change="changeAreaId"
            :type="type"
            :rootAreaId="rootAreaId"
            v-model="areaId"
          ></X-AreaSelect>
          <X-KeywordSearch placeholder="请输入关键字进行搜索" v-model="keyWords" />
        </template>
      </X-TableHeader>
      <el-table
        slot-scope="{ maxHeight }"
        :max-height="maxHeight"
        v-loading="$data.$_table_loading"
        :data="$data.$_table_list"
      >
        <el-table-column label="编号" type="index" align="center" width="80" />
        <el-table-column label="是否超标" align="center" width="150">
          <template slot-scope="{ row }">
            <span :class="getOvertimeClass(row)"></span>
          </template>
        </el-table-column>
        <el-table-column label="标题" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <el-link @click="toDetail(row)" class="el-link-title">{{ row.problemName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="上报时间" width="180" prop="createTime" />
        <el-table-column label="所属村" prop="xczxAdministrativeName" show-overflow-tooltip />
        <el-table-column label="状态" width="100">
          <template slot-scope="{ row }">
            {{ formatStatus(row) }}
          </template>
        </el-table-column>
        <el-table-column label="评分" prop="score" width="100">
          <template slot-scope="{ row }">
            {{ !row.score ? '未评分' : `${row.score}分` }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="{ row }">
            <el-link type="warning" @click="toEdit(row)">催办</el-link>
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
import { getList, deleteData } from '../api/index.js'

export default {
  mixins: [
    createTableMixin({
      routeName() {
        return this.$config.getModuleRouteName(MODULE_NAME, 'category')
      },
      loadTableData({ page, pageSize }) {
        return getList({
          page,
          pageSize,
          regionId: this.areaId,
          problemType: this.ctg,
          search: this.keyWords,
          // dealStatus: this.dealStatus,
        }).then(res => ({
          list: res.data.data || [],
          total: res.data.total,
        }))
      },
    }),
  ],
  data() {
    return {
      type: 0, // 1-县级管理员; 2-乡镇管理员; 3-行政村管理员
      rootAreaId: null,
      areaId: null,
      dealStatus: 0, // 0-待处理; 1-处理中; 2-处理完成
      keyWords: '',
    }
  },
  watch: {
    keyWords: '$_table_loadFirstPage',
    areaId: '$_table_loadFirstPage',
  },
  created() {
    if (this.$storage.authInfo && this.$storage.authInfo.type) {
      this.type = this.$storage.authInfo.type
      this.rootAreaId = this.$storage.authInfo.areaId
    }
    if (this.areaId) {
      this.$_table_load()
    }
  },
  computed: {
    // 1-问计于民; 2-问需于民
    ctg() {
      const ctg = +this.$route.query.ctg
      if (!ctg || [1, 2].indexOf(ctg) === -1) return 1
      return ctg
    },
  },
  methods: {
    // 新增数据
    toAdd() {
      this.$router.push({
        name: this.$config.getModuleRouteName(MODULE_NAME, 'idea_edit'),
      })
    },
    // 编辑数据
    toEdit(item) {
      this.$router.push({
        name: this.$config.getModuleRouteName(MODULE_NAME, 'idea_edit'),
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
          deleteData({ id: item.id })
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
    // 查看详情
    toDetail(item) {
      this.$router.push({
        name: this.$config.getModuleRouteName(MODULE_NAME, 'idea_detail'),
        query: {
          id: item.id,
        },
      })
    },
    // 接收切换的地区值
    changeAreaId(val) {
      this.areaId = val
    },
    /*
     * 计算超时时间, 返回不同样式
     * 3天以内-circle-red
     * 3-5天-circle-yellow
     * 超过5天-circle-red
     */
    getOvertimeClass(item) {
      const startTime = new Date(item.createTime.replace(/-/g, '/')).getTime() / 1000
      const endTime = parseInt(new Date().getTime() / 1000)
      const days = Math.floor((endTime - startTime) / 60 / 60 / 24)
      if (days <= 3) return 'circle-green'
      else if (days <= 5) return 'circle-yellow'
      return 'circle-red'
    },
    // 格式化状态(0待处理，1处理中，2处理完成)
    formatStatus(item) {
      if (!item) return '待处理'
      switch (item.dealStatus) {
        case 0:
          return '待处理'
        case 1:
          return '处理中'
        case 2:
          return '处理完成'
        default:
          return '待处理'
      }
    },
  },
}
</script>

<style lang="scss">
.circle-green,
.circle-yellow,
.circle-red {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
.circle-green {
  background-color: #1bd271;
}
.circle-yellow {
  background-color: #ffa82b;
}
.circle-red {
  background-color: #ff4c4c;
}
</style>
