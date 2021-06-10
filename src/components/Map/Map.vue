<template>
  <div class="base-components-Map" ref="map"></div>
</template>

<script>
import { config } from '../../common/config'

export default {
  props: {
    // 地图缩放级别 3 - 18
    zoom: {
      type: Number,
      default: undefined,
    },
    // 地图中心点坐标 LngLat
    center: {
      type: Array,
      default: undefined,
    },
  },
  data() {
    return {
      map: null, // 地图对象
    }
  },
  mounted() {
    this.getMap()
  },
  methods: {
    /**
     * 创建地图组件
     */
    async getMap() {
      const AMap = await this.getAMap()
      if (!this.map) {
        const container = this.$refs.map
        this.map = new AMap.Map(container, {
          resizeEnable: true,
          zoom: this.zoom,
          center: this.center,
          mapStyle: 'amap://styles/93d888e4ad298ef6c6ae1a453efc7447',
        })
      }
      return this.map
    },
    /**
     * 获取 AMap
     */
    async getAMap() {
      const script = require('scriptjs')
      return new Promise(resolve => {
        script(`//webapi.amap.com/maps?v=1.4.5&key=${config.mapKey}`, () => resolve(window.AMap))
      })
    },
    /**
     * 获取 AMAPUI
     */
    async getAMapUI() {
      const script = require('scriptjs')

      // 先获取 AMAP
      await this.getAMap()
      return new Promise(resolve => {
        script(`//webapi.amap.com/ui/1.0/main.js`, function () {
          resolve(window.AMapUI)
        })
      })
    },
    /**
     * 设置缩放级别 3 - 18
     */
    async setZoom(zoom = this.zoom) {
      const map = await this.getMap()
      map.setZoom(zoom)
    },
    /**
     * 设置地图中心点 LngLat
     */
    async setCenter(center = this.center) {
      const map = await this.getMap()
      map.setCenter(center)
    },
    /**
     * 设置缩放和地图中心点
     */
    async setZoomAndCenter(zoom = this.zoom, center = this.center) {
      const map = await this.getMap()
      map.setZoomAndCenter(zoom, center)
    },
  },
}
</script>

<style lang="scss">
.base-components-Map {
  width: 100%;
  height: 100%;
}
</style>
