<template>
  <el-popover placement="bottom" width="160" v-model="visible">
    <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
    <div>
      <Tree v-if="!keyword" />
      <SearchList v-else />
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>

    <el-input v-model="keyword" :placeholder="placeholder" slot="reference"></el-input>
  </el-popover>
</template>

<script>
import SearchList from './SearchList'
import Tree from './Tree'

export default {
  components: {
    SearchList,
    Tree,
  },
  props: {
    placeholder: {
      type: String,
      default: null,
    },
    treeLoad: {
      type: Function,
      default: null,
    },
    searchLoad: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      visible: false,
      keyword: null,
      data: [
        {
          label: '一级 1',
          children: [
            {
              label: '二级 1-1',
              children: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 2',
          children: [
            {
              label: '二级 2-1',
              children: [
                {
                  label: '三级 2-1-1',
                },
              ],
            },
            {
              label: '二级 2-2',
              children: [
                {
                  label: '三级 2-2-1',
                },
              ],
            },
          ],
        },
        {
          label: '一级 3',
          children: [
            {
              label: '二级 3-1',
              children: [
                {
                  label: '三级 3-1-1',
                },
              ],
            },
            {
              label: '二级 3-2',
              children: [
                {
                  label: '三级 3-2-1',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  mounted() {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
  },
}
</script>


<style lang="scss" scoped>
</style>