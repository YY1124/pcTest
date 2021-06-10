<template>
  <div class="views-404">
    <div class="error-wrap">
      <div class="error-code">4<span>0</span>4</div>
      <div class="error-desc">抱歉~ 你所访问的页面不存在</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.views-404 {
  width: 100%;
  height: 100%;
  background: #f3f3f3;
  position: relative;

  .error-wrap {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;

    .error-code {
      line-height: 1;
      font-size: 200px;
      font-weight: bold;
      color: #2d8cf0;
    }
    .error-code span {
      color: #00a854;
    }
    .error-desc {
      padding-top: 10px;
      font-size: 26px;
      color: #777;
    }
  }
}
</style>