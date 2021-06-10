<template>
  <el-row class="search-bar">
    <el-input
      class="base-components-Search-KeywordSearch"
      :placeholder="placeholder"
      v-model="keyword"
      :maxlength="20"
      clearable
    >
    </el-input>
    <el-button type="danger" icon="el-icon-search" size="small" @click="submit"></el-button
  ></el-row>
</template>

<script>
// import debounce from 'lodash/debounce'

// const AUTO_SUBMIT_TIME_MS = 1000

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '请输入关键字',
    },
  },
  data() {
    return {
      keyword: '',
    }
  },
  watch: {
    value(v) {
      if (v !== this.keyword) {
        this.keyword = v
      }
    },
    // keyword: debounce(function () {
    //   this.submit()
    // }, AUTO_SUBMIT_TIME_MS),
  },
  methods: {
    submit() {
      this.$emit('input', this.keyword)
    },
  },
}
</script>

<style lang="scss">
.search-bar {
  height: 32px;
  .base-components-Search-KeywordSearch {
    width: 200px;
    margin-right: 10px;
  }
  .el-button--danger {
    padding: 9px 15px 6px 15px;
  }
.base-components-Search-KeywordSearch {
  max-width: 200px;
}

}
</style>
