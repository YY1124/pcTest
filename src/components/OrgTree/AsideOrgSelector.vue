<template>
  <div class="AsideOrgSelector">
    <!-- <el-input class="keyword" placeholder="请输入组织名称" v-model="keyword" /> -->
    <div class="list" v-if="keyword" v-loading="searching"></div>
    <div class="tree" v-else>
      <el-tree
        ref="tree"
        lazy
        :load="loadNode"
        :filter-node-method="filterNode"
        :default-expanded-keys="defaultExpandedKeys"
        :props="props"
        :expand-on-click-node="false"
        node-key="id"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }">
          <i v-if="node.isLeaf" class="el-icon-document-remove" />
          <i v-else class="el-icon-folder-opened" />
          <span class="item-title">{{ data.label }}</span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import { loadOrgChildrenForTree, queryOrg } from 'org'
import throttle from 'lodash/throttle'

export default {
  props: {
    // 是否自动将第一个组织作为值
    initFirstValue: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: null,
    },
    filterType: {
      type: Number,
      default: 0,
    },
    filter: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      inited: false,
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
      },
      defaultExpandedKeys: [],
      keyword: '',
      searching: false,
    }
  },
  watch: {
    value(org) {
      this.$refs.tree.setCurrentKey(org.OrgId)
    },
  },
  mounted() {
    this.$watch('keyword', throttle(this.queryOrg, 2000))
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadNode(node, resolve) {
      loadOrgChildrenForTree(node.data?.id, this.filterType).then(orgs => {
        if (this.filterType == 3) {
          orgs = orgs.filter(i => !/(支部委员会|总支委员会|支部)$/.test(i.data.OrgFullName))
        }
        if (this.filter) {
          orgs = orgs.filter(i => this.filter(i.data))
        }
        if (!this.inited && this.initFirstValue) {
          this.inited = true
          if (orgs[0]) {
            this.$emit('input', orgs[0].data)
            this.defaultExpandedKeys = [orgs[0].data.OrgId]
          }
        }
        resolve(orgs)
      })
    },
    handleNodeClick(node) {
      this.showPopover = false
      this.$emit('input', node.data)
    },
    queryOrg() {
      const { OrgCode, OrgGlobalId } = this.$auth.userInfo.EntityT
      this.searching = true
      queryOrg({
        Token: this.$auth.accessToken,
        OrganizCode: OrgCode,
        OrgGloabId: OrgGlobalId,
        KeyWord: this.keyword,
      }).finally(() => {
        this.searching = false
      })
    },
  },
}
</script>

<style lang="scss">
.AsideOrgSelector {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  user-select: none;

  > .list,
  > .tree {
    flex: 1;
    overflow: auto;
    margin-top: 23px;

    > .el-tree {
      display: inline-block;
      min-width: 100%;

      .el-tree-node.is-current > .el-tree-node__content {
        color: #b02027;
      }
    }
  }
}
</style>
