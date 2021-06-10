<template>
  <div class="base-components-Org-OrgTree">
    <el-tree
      :props="defaultProps"
      lazy
      :load="loadNode"
      node-key="id"
      :show-checkbox="multi"
      :expand-on-click-node="false"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
import { getOrgTree } from '@/api/psns'
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
    branch: {
      type: Boolean,
      default: false,
    },
    multi: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'isbranch',
      },
    }
  },
  methods: {
    loadNode(node, resolve) {
      if (node.data) {
        getOrgTree({
          psnsToken: this.$storage.psnsToken,
          globalId: node.data.gloabid,
        })
          .then(({ EntityListT }) => {
            resolve(
              EntityListT.map(item => {
                item['disabled'] = item.isParent
                return item
              })
            )
          })
          .catch(err => {
            console.log(err)
            resolve([])
          })
      } else {
        this.loadNode(
          {
            data: {
              gloabid: this.root.globalId,
            },
          },
          children => {
            resolve([
              {
                id: this.root.globalId,
                gloabid: this.root.globalId,
                name: this.root.orgName,
                code: this.root.orgCode,
                disabled: children && children.length,
                children: children,
                isbranch: !children || !children.length,
              },
            ])
          }
        )
      }
    },
    handleNodeClick(data) {
      if (this.branch && !data.isbranch) {
        this.$message.warning('请选择支部')
        return false
      }
      this.$emit('input', data)
    },
  },
}
</script>


<style lang="scss" scoped>
.base-components-Org-OrgTree {
  position: relative;
  width: 100%;

  /deep/ {
    .el-tree-node > .el-tree-node__children {
      overflow: inherit;
    }
  }
}
</style>