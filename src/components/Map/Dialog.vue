<template>
  <el-dialog
    :visible.sync="visibleSync"
    width="80%"
    title="选择地址"
    :close-on-click-modal="false"
    :show-close="false"
    :append-to-body="true"
    custom-class="base-components-Map-LocationSelectorModal"
  >
    <div class="map">
      <LocationSelect ref="map" v-if="visible" v-model="valueSync" />
    </div>
    <template slot="footer">
      <el-button type="default" @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="$emit('ok')">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import LocationSelect from './LocationSelect'

export default {
  components: {
    LocationSelect,
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
  },
  data() {
    return {
      // result 是否已经初始化，用来忽略首次变更 result 值，
      // 因为首次变更 result 值可能是打开选择器时内部调用 start 产生的
      resultInited: false,
    }
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
        if (!this.resultInited) {
          this.resultInited = true
          return
        }
        this.$emit('input', v)
      },
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.value)
      // 选中 position 点
      if (this.value?.position) {
        this.resultInited = false

        this.$nextTick(async () => {
          const poiPicker = await this.$refs.map.getPoiPicker()
          poiPicker.start([this.value.position.lng, this.value.position.lat])
        })
      } else {
        this.resultInited = true
      }
    },
  },
}
</script>

<style lang="scss">
.base-components-Map-LocationSelectorModal {
  .el-dialog__body {
    padding: 0;

    .map {
      height: 60vh;
    }
  }
}
</style>
