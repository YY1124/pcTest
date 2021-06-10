<template>
  <div class="base-components-RichEditor">
    <div class="editor" ref="editor" />
  </div>
</template>

<script>
import { uploadFiles } from '../../common/upload'
import emitter from 'element-ui/lib/mixins/emitter'

export default {
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      html: null,
    }
  },
  watch: {
    value(v) {
      if (v !== this.html) {
        this.html = v
        this.setHtml()
      }
      this.dispatch('ElFormItem', 'el.form.change', [v])
    },
    html(v) {
      if (v !== this.value) {
        this.$emit('input', v)
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      const E = (await import('wangeditor')).default
      this.editor = new E(this.$refs.editor)
      this.editor.config.focus = false
      this.editor.config.showLinkImg = false
      this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif']
      this.editor.config.customUploadImg = (files, insertImgFn) => {
        uploadFiles(files).then(res => {
          for (const item of res) {
            insertImgFn(item.url)
          }
        })
      }
      this.editor.config.onchangeTimeout = 1000
      this.editor.config.onchange = html => {
        this.html = html
      }
      this.editor.config.onblur = html => {
        this.html = html
      }
      this.editor.config.onfocus = html => {
        this.html = html
      }
      this.editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'image', // 插入图片
        'table', // 表格
        'undo', // 撤销
        'redo', // 重复
      ]
      this.editor.create()

      // 初始化内容
      this.html = this.value
      this.setHtml()
    },
    setHtml() {
      this.editor?.txt.html(this.html)
    },
  },
}
</script>

<style lang="scss">
.base-components-RichEditor {
  > .editor {
    border: 1px solid #d5d5d5;
    border-radius: 4px;
    overflow: hidden;

    > .w-e-toolbar {
      border: none !important;
      border-bottom: 1px solid #d5d5d5 !important;
      z-index: unset !important;
    }

    > .w-e-text-container {
      border: none !important;
      z-index: unset !important;
    }
  }
}

.el-form-item.is-error .base-components-RichEditor > .editor {
  border-color: #ce0000;
}
</style>
