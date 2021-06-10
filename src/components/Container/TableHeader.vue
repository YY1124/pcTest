<template>
  <div class="base-components-Container-TableHeader">
    <div class="__row" v-if="showTop">
      <div class="__left">
        <slot name="top-left" />
      </div>
      <div class="__center">
        <slot name="top-center" v-if="$slots['top-center']" />
      </div>
      <div class="__right">
        <slot name="top-right" />
      </div>
    </div>
    <div class="__row" v-if="showBottom">
      <div class="__left">
        <slot name="left" />
      </div>
      <div class="__center" v-if="$slots['center']">
        <slot name="center" />
      </div>
      <div class="__right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    showTop() {
      return !!(this.$slots['top-left'] || this.$slots['top-center'] || this.$slots['top-right'])
    },
    showBottom() {
      return !!(this.$slots['left'] || this.$slots['center'] || this.$slots['right'])
    },
  },
}
</script>

<style lang="scss">
.base-components-Container-TableHeader {
  width: 100%;

  > .__row {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;

    > .__left {
      flex: 1;

      > * {
        &:not(:first-child) {
          margin-left: 8px;
        }
      }
    }

    > .__center {
      flex-grow: 2;
      margin: 0 16px;
      display: flex;
      justify-content: center;

      > * {
        &:not(:first-child) {
          margin-left: 8px;
        }
      }
    }

    > .__right {
      flex: 2;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      > * {
        &:not(:first-child) {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
