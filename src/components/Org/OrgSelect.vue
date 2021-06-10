<template>
  <div class="base-components-Org-OrgSelect">
    <el-popover placement="bottom" trigger="focus" v-model="show">
      <el-input
        ref="input"
        slot="reference"
        :placeholder="placeholder"
        :value="valueSync ? valueSync.name : ''"
        readonly
      >
        <template slot="append">
          <slot name="append"></slot>
        </template>
      </el-input>

      <div
        class="popup-body"
        onselectstart="return false"
        :style="{ width: `${width > 350 ? width : 350}px` }"
      >
        <div class="search-wrap">
          <el-input slot="reference" placeholder="请输入组织名称" v-model="search" clearable @clear="doClear">
            <el-button slot="append" icon="el-icon-search" @click="doSearch"></el-button>
          </el-input>
        </div>
        <div class="result-box">
          <OrgList
            v-show="search"
            :root="root"
            :branch="branch"
            ref="list"
            v-model="valueSync"
            :search="search"
          />
          <OrgTree
            v-show="!search"
            :root="root"
            :branch="branch"
            :multi="multi"
            v-model="valueSync"
          />
        </div>

        <div class="drag-btn" ref="dragBtn"></div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import OrgList from './OrgList'
import OrgTree from './OrgTree'

export default {
  components: {
    OrgList,
    OrgTree,
  },
  props: {
    root: {
      type: Object,
      default: () => {
        return null
      },
    },
    value: {
      type: [String, Object],
      default: null,
    },
    valueProps: {
      type: Object,
      default() {
        /**
         * {
         *    code: orgCode,
         *    id: orgId,
         *    name: orgName
         * }
         */
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
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  data() {
    return {
      show: false,
      search: null,
      width: 0,
      org: null,
    }
  },
  computed: {
    valueSync: {
      get() {
        return this.org
      },
      set(v) {
        this.show = false

        let val = null
        if (this.valueProps) {
          val = { ...this.value }

          for (let key in this.valueProps) {
            val[this.valueProps[key]] = v[key]
          }
        } else {
          val = v.id
        }

        this.$emit('input', val)
        this.$emit('change', {
          value: val,
          node: v,
        })
        this.org = v
      },
    },
  },
  watch: {
    value() {
      this.echoName()
    },
  },
  mounted() {
    this.init()
    this.echoName()
  },
  updated() {
    this.init()
  },
  methods: {
    init() {
      this.width = this.$refs.input.$el.offsetWidth
    },
    echoName() {
      if (this.valueProps && this.value) {
        let val = {}

        for (let key in this.valueProps) {
          val[key] = this.value[this.valueProps[key]]
        }

        if (val.name) {
          this.org = { ...val }
        }
      }
    },
    doSearch() {
      this.$refs.list.doSearch(this.search)
    },
    doClear() {
      this.$refs.list.doClear()
    },
  },
}
</script>


<style lang="scss" scoped>
.base-components-Org-OrgSelect {
}

.popup-body {
  position: relative;
  width: 350px;

  .search-wrap {
    margin-bottom: 10px;
  }

  .result-box {
    width: 100%;
    overflow: auto;
    max-height: 40vh;
    padding: 0 0 10px;
  }

  .drag-btn {
    position: absolute;
    z-index: 99;
    bottom: -10px;
    right: -10px;
    // background-color: aqua;
    // width: 10px;
    // height: 10px;
    // cursor: se-resize;
  }
}
</style>