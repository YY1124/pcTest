<template>
  <div class="base-components-Container-PageContainer">
    <router-view class="router-view" />
    <div class="__body">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.base-components-Container-PageContainer {
  position: relative;
  height: 100%;
  overflow: hidden;

  > .router-view {
    position: absolute;
    z-index: 20;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
  }

  > .__body {
    height: 100%;
    overflow: auto;
  }
}
</style>
