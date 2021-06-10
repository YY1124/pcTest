<template>
  <el-dialog
    :visible.sync="visibleSync"
    width="80%"
    :title="title"
    :close-on-click-modal="false"
    :show-close="false"
    :append-to-body="true"
    custom-class="base-components-List-Dialog"
  >
    <div class="list">
      <SelectList v-if="visible" ref="list" v-model="valueSync" :load="load" :columns="columns" />
    </div>
    <template slot="footer">
      <el-button type="default" @click="$emit('cancel')">取消</el-button>
      <el-button v-if="!options || options.showOkBtn" type="primary" @click="$emit('ok')"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script>
import SelectList from './SelectList'

export default {
  components: {
    SelectList,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: null,
    },
    value: {
      type: Object,
      default: null,
    },
    load: {
      type: Function,
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
    options: {
      type: Object,
      default: () => {
        return null
      },
    },
  },
  computed: {
    visibleSync: {
      get() {
        return this.visible
      },
      set(v) {
        this.$emit('update:visible', v)
      },
    },
    valueSync: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      },
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
  },
}
</script>

<style lang="scss">
.base-components-List-Dialog {
  .el-dialog__body {
    padding: 0;

    .list {
      height: 60vh;
    }
  }
}
</style>
