<template>
  <X-FormContainer
    :title="title"
    :label-width="140"
    :isShowOk="false"
    cancelText="关闭"
    @cancel="cancel"
    v-loading="loading"
  >
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-row :gutter="10">
          <el-col :span="4">
            <label>标题:</label>
          </el-col>
          <el-col :span="20">{{ info.problemName }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label>地址:</label>
          </el-col>
          <el-col :span="20">{{ info.address }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label>问题描述:</label>
          </el-col>
          <el-col :span="20">{{ info.problemDetail }}</el-col>
        </el-row>
        <el-row :gutter="10" v-if="problemImgs && problemImgs.length">
          <el-col :span="4">
            <label>问题图片:</label>
          </el-col>
          <el-col :span="20">
            <el-image
              v-for="(item, index) in problemImgs"
              :src="item.url"
              :fit="fit"
              :key="index"
              :preview-src-list="[item.url]"
            ></el-image>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label>上报人联系电话:</label>
          </el-col>
          <el-col :span="20">{{ info.reportUserMobile }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label>上报时间:</label>
          </el-col>
          <el-col :span="20">{{ info.createTime }}</el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label>处理状态:</label>
          </el-col>
          <el-col :span="20">{{ formatStatus(info.dealStatus) }}</el-col>
        </el-row>
        <el-row :gutter="10" v-if="info.dealStatus === 2">
          <el-col :span="4">
            <label>评分:</label>
          </el-col>
          <el-col :span="20">{{ !info.score ? '未评分' : `${info.score}分` }}</el-col>
        </el-row>
        <el-row :gutter="10" v-if="info.dealStatus === 2">
          <el-col :span="4">
            <label>处理完成时间:</label>
          </el-col>
          <el-col :span="20">{{ info.completeTime }}</el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane v-if="info && info.dealStatus > 0" label="处理详情">
        <el-timeline :reverse="reverse">
          <el-timeline-item
            v-for="(item, index) in info.processList"
            :key="index"
            :timestamp="item.createTime"
          >
            <el-row :gutter="10">
              <el-col :span="4">
                <label>处理状态:</label>
              </el-col>
              <el-col :span="20"
                >{{ formatDealStatus(item.dealStatus) }}-{{ formatStepType(item.stepType) }}</el-col
              >
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4">
                <label>处理信息:</label>
              </el-col>
              <el-col :span="20">{{ `【${item.dealUserName}】${item.remark}` }}</el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4">
                <label>处理图片:</label>
              </el-col>
              <el-col :span="20"
                ><el-image
                  v-for="(item, index) in problemImgs"
                  :src="item.url"
                  :fit="fit"
                  :key="index"
                  :preview-src-list="[item.url]"
                ></el-image
              ></el-col>
            </el-row>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </X-FormContainer>
</template>

<script>
import { getDetail } from '../api/index'
export default {
  data() {
    return {
      loading: false,
      info: {},
      problemImgs: [],
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    },
    title() {
      return '详情'
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    // 加载详情
    async init() {
      if (this.id) {
        this.loading = true
        try {
          this.info = (
            await getDetail({
              id: this.id,
            })
          ).data
          if (this.info.problemPhoto) {
            this.problemImgs = JSON.parse(this.info.problemPhoto)
          }
        } catch (err) {
          this.$message.error(err.message)
          this.$router.back()
          console.error(err)
        } finally {
          this.loading = false
        }
      }
    },
    // 格式化状态(0待处理，1处理中，2处理完成)
    formatStatus(status) {
      switch (status) {
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
    // 格式化处理状态(0:处理中，1：已解决，2：上报)
    formatDealStatus(status) {
      switch (status) {
        case 0:
          return '处理中'
        case 1:
          return '已解决'
        case 2:
          return '上报'
        default:
          return '处理中'
      }
    },
    // 事件处理节点标识(0：交办(事件接收)，1：事件处理（指派），2：上报（接收人处理不了），3：完结)
    formatStepType(stepType) {
      switch (status) {
        case 0:
          return '交办(事件接收)'
        case 1:
          return '事件处理(指派)'
        case 2:
          return '上报(接收人处理不了)'
        case 3:
          return '完结'
        default:
          return '完结'
      }
    },
    cancel() {
      this.$router.back()
    },
  },
}
</script>

<style lang="scss">
.__content {
  .el-row {
    padding: 8px 0;
    line-height: 1.5em;
    font-size: 14px;

    > .el-col:nth-child(1) {
      text-align: right;
      color: #909399;
    }

    .el-image {
      width: 80px;
      height: 80px;
      border-radius: 5px;
    }
  }
}
</style>
