<template>
  <div class="base-components-Container-TableContainer">
    <div class="__body" ref="body">
      <header ref="header">
        <slot name="header" />
      </header>
      <main>
        <slot :maxHeight="maxHeight" />
      </main>
      <footer ref="footer">
        <slot name="footer" />
      </footer>
      <div ref="dialog">
        <slot name="dialog"></slot>
      </div>
      <resize-observer @notify="emitMaxHeight" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxHeight: undefined,
    }
  },
  mounted() {
    this.emitMaxHeight()
  },
  methods: {
    emitMaxHeight() {
      const { body, header, footer } = this.$refs
      this.maxHeight = body.clientHeight - header.clientHeight - footer.clientHeight
      this.$emit('max-height', this.maxHeight)
    },
  },
}
</script>

<style lang="scss">
.base-components-Container-TableContainer {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .__body {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    overflow: hidden;

    > header {
      display: flex;
      flex-direction: row;
      padding: 16px;
    }

    > main {
      flex: initial;
      overflow: hidden;
      padding: 0 16px;
    }

    > footer {
      padding: 16px;
    }
  }
}
</style>
