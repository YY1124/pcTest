<template>
  <div class="base-components-RichContent">
    <div v-html="value" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.base-components-RichContent {
  word-break: break-all;

  > div {
    > p:first-child {
      margin-top: 0;
    }
  }

  img {
    max-width: 100%;
  }
}
</style>
