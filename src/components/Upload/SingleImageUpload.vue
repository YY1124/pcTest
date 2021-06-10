<template>
  <div class="base-components-Upload-SingleImageUpload" :class="{ readonly }" @click="chooseImage">
    <div class="image" :style="imageStyle" />
    <i class="iconfont icon-plus" v-if="showPlus">&#xe613;</i>
  </div>
</template>

<script>
import { uploadFiles } from '../../common/upload'
import emitter from 'element-ui/lib/mixins/emitter'

export default {
  mixins: [emitter],
  props: {
    // 图片数组，格式为 [{url: '', name: ''}]
    value: {
      type: Array,
      default: undefined,
    },
    // value 的替代属性，值为 JSON 字符串，会自动使用 JSON.parse 和 JSON.stringify 处理
    jsonValue: {
      type: String,
      default: null,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '.jpg,.jpeg,.png',
    },
  },
  computed: {
    showPlus() {
      return !this.value?.[0]?.url && !this.readonly
    },
    imageStyle() {
      const url = this.list?.[0]?.url
      return url ? { backgroundImage: `url(${url})` } : null
    },
    list: {
      get() {
        if (Array.isArray(this.value)) {
          return this.value
        }
        try {
          const json = JSON.parse(this.jsonValue)
          if (Array.isArray(json)) {
            return json
          }
        } catch (err) {
          console.error(err)
        }
        return []
      },
      set(v) {
        if (this.value !== undefined) {
          this.$emit('input', v.length > 0 ? v : null)
        } else {
          this.$emit('update:json-value', v.length > 0 ? JSON.stringify(v) : null)
        }
      },
    },
  },
  watch: {
    list(v) {
      this.dispatch('ElFormItem', 'el.form.change', [v])
    },
  },
  methods: {
    chooseImage() {
      if (this.readonly) {
        return
      }
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = false
      input.accept = this.accept
      input.onchange = e => {
        const file = e.target.files[0]
        if (!file) {
          return
        }
        this.loading = true
        uploadFiles([file])
          .then(res => {
            this.list = res.map(i => ({
              name: i.name,
              url: i.url,
            }))
          })
          .catch(err => {
            this.$message.error(err.message)
            console.error(err)
          })
          .finally(() => {
            this.loading = false
          })
      }
      input.click()
    },
  },
}
</script>

<style lang="scss">
.base-components-Upload-SingleImageUpload {
  width: 100px;
  height: 100px;
  background-color: #f1f1f1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &.readonly {
    cursor: default;
  }

  > .icon-plus {
    font-size: 34px;
    color: #999;
    overflow: hidden;
  }

  > .image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
