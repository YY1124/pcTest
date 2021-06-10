<template>
  <div class="views-403">
    <div class="error-wrap">
      <div class="error-code">4<span>0</span>3</div>
      <div class="error-code">
        <div class="error-code"></div>
      </div>
      <div class="error-desc">抱歉~ 你没有权限访问该页面哦</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>


<style lang="scss" scoped>
.views-403 {
  width: 100%;
  height: 100%;
  background: #f3f3f3;

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
      color: #f02d2d;
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