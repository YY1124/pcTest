<template>
  <div class="base-components-Map-LocationSelector">
    <div class="__top">
      <input class="__search el-input__inner" id="search" placeholder="输入关键字搜索..." />
      <div class="__result" v-if="value" @click="goToCurrentResult">
        当前选择:&nbsp;&nbsp;
        {{ value.address }}
      </div>
    </div>
    <Map ref="map" :center="center" />
  </div>
</template>

<script>
import Map from './Map'

export default {
  components: {
    Map,
  },
  props: {
    // PositionPickerResult 对象
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      poiPicker: null, // PoiPicker 实例对象
      autoComplete: null, // AutoComplete 实例对象
    }
  },
  computed: {
    // 默认初始化地图中心点
    center() {
      if (this.value?.position?.lng) {
        const { lng, lat } = this.value.position
        return [lng, lat]
      }
      return undefined
    },
  },
  mounted() {
    this.getPoiPicker()
    this.getAutoComplete()
  },
  methods: {
    /**
     * 获取 PoiPicker 对象
     */
    async getPoiPicker() {
      const AMapUI = await this.$refs.map.getAMapUI()
      const map = await this.$refs.map.getMap()

      if (!this.poiPicker) {
        this.poiPicker = await new Promise(resolve => {
          AMapUI.loadUI(['misc/PositionPicker'], PoiPicker => {
            const poiPicker = new PoiPicker({
              map,
              mode: 'dragMarker',
              // iconStyle: {
              //   url: this.$config.staticUrl('1453c6b6-b7b7-4094-a719-372c446841ef.png'),
              //   size: [32, 32],
              //   ancher: [16, 32],
              // },
            })
            poiPicker.on('success', this.handlePoiSuccess)
            poiPicker.on('fail', this.handlePoiFailure)
            resolve(poiPicker)
          })
        })

        map.on('click', e => {
          this.poiPicker.start(e.lnglat)
        })
      }

      return this.poiPicker
    },
    /**
     * 获取 AutoComplete 实例对象
     */
    async getAutoComplete() {
      const AMap = await this.$refs.map.getAMap()

      if (!this.autocomplete) {
        this.autoComplete = await new Promise(resolve => {
          AMap.plugin('AMap.Autocomplete', () => {
            const autoComplete = new AMap.Autocomplete({
              input: 'search',
            })
            AMap.event.addListener(autoComplete, 'select', async e => {
              if (this.poiPicker) {
                this.poiPicker.start(e.poi.location)
                ;(await this.$refs.map.getMap()).setZoom(15)
              }
            })
            resolve(autoComplete)
          })
        })
      }

      return this.autoComplete
    },
    /**
     * 选点成功
     */
    handlePoiSuccess(result) {
      this.$emit('input', result)
    },
    /**
     * 选点失败
     */
    handlePoiFailure() {
      this.$emit('input', null)
    },
    /**
     * 显示当前选择的地点
     */
    async goToCurrentResult() {
      if (this.value) {
        ;(await this.$refs.map.getMap()).setZoomAndCenter(15, this.value.position)
      }
    },
  },
}
</script>

<style lang="scss">
.base-components-Map-LocationSelector {
  width: 100%;
  height: 100%;
  position: relative;

  > .__top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    left: 16px;
    top: 8px;
    right: 16px;
    z-index: 100;

    > .__search {
      max-width: 200px;
      opacity: 0.9;
    }

    > .__result {
      margin-left: 16px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0 8px;
      line-height: 24px;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
/* 搜索下拉选择框样式 */
.amap-sug-result {
  border-radius: 4px;
  z-index: 3000;

  > .auto-item {
    line-height: 20px;
  }
}

/* 隐藏 AMap logo */
.amap-logo {
  display: none !important;
}
</style>
