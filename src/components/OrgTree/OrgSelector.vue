<template>
  <el-popover
    v-model="showPopover"
    class="cm-org-selector"
    placement="bottom-start"
    :width="width"
    trigger="click"
    :disabled="readonly"
  >
    <template slot="reference">
      <el-input
        ref="input"
        placeholder="请选择所属层级"
        readonly
        :value="value && value.OrgFullName"
      />
      <resize-observer @notify="refreshWidth" />
    </template>
    <div class="OrgSelector">
      <!-- <el-input class="keyword" placeholder="请输入组织名称" v-model="keyword" /> -->
      <div class="tree">
        <el-tree
          lazy
          :load="loadNode"
          ref="tree"
          :filter-node-method="filterNode"
          node-key="label"
          :default-expanded-keys="defaultExpandedKeys"
          :props="props"
          :expand-on-click-node="true"
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
  </el-popover>
</template>

<script>
import { loadOrgChildrenForTree } from './org'

export default {
  props: {
    rootOrgId: {
      type: String,
      default: null,
    },
    // 是否自动将第一个组织作为值
    initFirstValue: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Object,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
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
      showPopover: false,
      width: undefined,
      props: {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
      },
      defaultExpandedKeys: [],
      keyword: '',
    }
  },
  watch: {
    keyword(val) {
      this.$refs.tree.filter(val)
    },
  },
  mounted() {
    this.refreshWidth()
  },
  methods: {
    refreshWidth() {
      this.width = this.$refs.input.$el.clientWidth
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    loadNode(node, resolve) {
      loadOrgChildrenForTree(node.data?.id || this.rootOrgId, this.filterType).then(orgs => {
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
            this.defaultExpandedKeys = [orgs[0].data.OrgFullName]
          }
        }
        resolve(orgs)
      })
    },
    handleNodeClick(node) {
      this.showPopover = false
      this.$emit('input', node.data)
    },
  },
}
</script>

<style lang="scss">
.cm-org-selector {
  display: inline-block;
  width: 100%;
}

.OrgSelector {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  user-select: none;

  > .tree {
    flex: 1;
    overflow: auto;
    margin-top: 0px;
    max-height: 50vh;

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
