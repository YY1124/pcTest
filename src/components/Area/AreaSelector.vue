<template>
  <el-row style="width: auto !important">
    <el-select
      v-if="type === 1"
      @change="getVillageList"
      v-model="townId"
      placeholder="请选择乡镇/街道"
      style="margin-right: 10px"
    >
      <el-option
        v-for="item in townList"
        :key="item.townsId"
        :label="item.townsName"
        :value="item.townsId"
      >
      </el-option>
    </el-select>
    <el-select
      v-if="type === 1 || type === 2"
      v-model="areaId"
      v-on:change="changeVal"
      placeholder="请选择村/社区"
    >
      <el-option
        v-for="item in villageList"
        :key="item.administrativeId"
        :label="item.administrativeName"
        :value="item.administrativeId"
      ></el-option>
    </el-select>
  </el-row>
</template>

<script>
import { getTownList, getVillageList } from './area'

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    type: {
      type: Number,
      default: 0,
    },
    rootAreaId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      areaId: null,
      townId: null,
      townList: null,
      villageList: null,
    }
  },
  watch: {
    value(val) {
      this.areaId = val
    },
    type() {
      this.init()
    },
    areaId(val, old) {
      if (val !== old) {
        this.$emit('input', this.areaId)
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.type === 1) {
        // 县级管理员
        this.getTownList()
      } else if (this.type === 2) {
        this.townId = this.rootAreaId
        // 乡镇管理员
        this.getVillageList()
      }
    },
    // 获取乡镇/街道列表
    getTownList() {
      getTownList()
        .then(res => {
          this.townList = res.data || []
          if (this.townList && this.townList.length) {
            this.townId = this.townList[0].townsId
            this.getVillageList()
          } else {
            this.townId = null
          }
        })
        .catch(err => {
          this.townList = []
          console.log(err)
        })
    },
    // 获取村/社区列表
    getVillageList() {
      getVillageList({ townId: this.townId })
        .then(res => {
          this.villageList = res.data || []
          if (this.villageList && this.villageList.length) {
            this.areaId = this.villageList[0].administrativeId
            this.changeVal()
          } else {
            this.areaId = null
          }
        })
        .catch(err => {
          this.villageList = []
          console.log(err)
        })
    },
    // 切换乡镇
    changeTown(item) {
      if (!item) return
      this.townId = item.townsId
      this.getVillageList()
    },
    // 切换村/社区
    changeVal() {
      setTimeout(() => {
        this.$emit('change', this.areaId)
      }, 100)
    },
  },
}
</script>

<style lang="scss">
</style>
