<template>
  <div class="base-components-Org-OrgList">
    <div v-if="loading">加载中...</div>
    <div v-else-if="isFirst">搜索: {{ search }}</div>
    <div v-else-if="list.length == 0">暂无数据</div>
    <div v-else>
      <div v-for="item in list" :key="item.id" class="org-item" @click="onSelect(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { getOrgList } from '@/api/psns'

export default {
  props: {
    root: {
      type: Object,
      default: () => {
        return null
      },
    },
    value: {
      type: Object,
      default: () => {
        return null
      },
    },
    search: {
      type: String,
      default: null,
    },
    branch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      isFirst: true,
    }
  },
  watch: {
    search() {
      this.isFirst = true
    },
  },
  methods: {
    async doSearch(search) {
      this.isFirst = false
      this.loading = true

      try {
        const { EntityListT } = await getOrgList({
          psnsToken: this.$storage.psnsToken,
          globalId: this.root.globalId,
          code: this.root.orgCode,
          search,
        })

        this.list = [...EntityListT]
      } catch (error) {
        console.log(error)
      }

      this.loading = false
    },
    onSelect(data) {
      if (this.branch && !data.isbranch) {
        this.$message.warning('请选择支部')
        return false
      }
      this.$emit('input', data)
    },
    doClear() {
      this.list = []
    },
  },
}
</script>


<style lang="scss" scoped>
.base-components-Org-OrgList {
  .org-item {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #f2f2f2;

    &:hover {
      background-color: #f5f7fa;
    }
  }
}
</style>