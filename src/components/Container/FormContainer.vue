<template>
  <div class="base-components-Container-FormContainer">
    <div class="__body" ref="body">
      <header ref="header">
        <slot name="header">
          <h6>{{ title }}</h6>
          <span class="__close" @click="$emit('cancel')">
            <i class="el-icon-close" />
          </span>
        </slot>
      </header>
      <main>
        <div class="__content">
          <slot />
        </div>
      </main>
      <footer ref="footer">
        <div
          class="__content"
          :style="{ paddingLeft: footerPaddingLeft, display: isShowOk ? 'inlne-block' : 'none' }"
        >
          <slot name="footer">
            <el-button @click="$emit('cancel')">{{ cancelText }}</el-button>
            <el-button v-if="showOkBtn" type="primary" @click="$emit('ok')" :loading="loading">
              {{ okText }}
            </el-button>
          </slot>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    showOkBtn: {
      type: Boolean,
      default: true,
    },
    okText: {
      type: String,
      default: '确定',
    },
    isShowOk: {
      type: Boolean,
      default: true,
    },
    labelWidth: {
      type: [String, Number],
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    footerPaddingLeft() {
      const p = this.labelWidth.toString()
      if (p.endsWith('px')) {
        return p
      }
      return `${p}px`
    },
  },
}
</script>

<style lang="scss">
.base-components-Container-FormContainer {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    overflow: hidden;

    > header {
      display: flex;
      flex-direction: row;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e8eaec;
      padding: 0 16px;
      margin-bottom: 16px;

      > h6 {
        font-size: 14px;
      }

      > .__close {
        cursor: pointer;

        &:hover {
          color: #aaa;
        }
      }
    }

    > main {
      flex: initial;
      margin: 0 16px;
      overflow: auto;

      > .__content {
        max-width: 800px;
        margin: auto;
        overflow: hidden;
      }
    }

    > footer {
      padding: 16px;

      > .__content {
        max-width: 800px;
        margin: auto;
      }
    }
  }

  .el-form-item {
    > .el-form-item__label {
      line-height: 1.3;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      min-height: 40px;

      &:before {
        display: contents;
      }
    }

    > .el-form-item__content {
      > .el-select {
        display: block;
      }

      > .el-date-editor.el-input {
        width: auto;
        display: block;
      }
    }
  }
}
</style>
