<template>
  <div class="base-components-Upload-FileUpload">
    <div class="__uploader" @click="chooseFile">
      <slot>
        <el-button icon="el-icon-upload">选择文件</el-button>
      </slot>
    </div>
    <ul class="__file-list">
      <li v-for="(item, index) in list" :key="index">
        <i class="el-icon-document" />
        <span class="__name">{{ item.name }}</span>
        <i class="__delete el-icon-close" :size="20" @click="remove(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { uploadFiles } from '../../common/upload'
import emitter from 'element-ui/lib/mixins/emitter'

export default {
  mixins: [emitter],
  props: {
    // [{name: 'demo.jpg', url: 'https://example.com/demo.jpg'}]
    value: {
      type: Array,
      default: undefined,
    },
    // value 的替代属性，值为 JSON 字符串，会自动使用 JSON.parse 和 JSON.stringify 处理
    jsonValue: {
      type: String,
      default: null,
    },
    max: {
      type: Number,
      default: 5,
    },
    maxSize: {
      type: Number,
      default: 15 << 20, // 15M
    },
    accept: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      uploading: false,
    }
  },
  computed: {
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
          console.log(err)
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
    maxRemainCount() {
      return this.max - this.list.length
    },
  },
  watch: {
    value(v) {
      this.dispatch('ElFormItem', 'el.form.change', [v])
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    chooseFile() {
      if (this.maxRemainCount === 0) {
        this.$message.warning(`最多上传${this.max}个文件`)
        return
      }

      if (this.uploading) {
        return
      }

      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = this.maxRemainCount > 1
      input.accept = this.accept
      input.onchange = e => {
        const files = [...e.target.files]
        if (files.length > this.maxRemainCount) {
          this.$message.warning(`最多上传${this.max}个文件`)
        }

        // 检查 maxSize，允许上传的文件最大值
        for (const file of files) {
          if (file.size > this.maxSize) {
            this.$message.error(
              `文件【${file.name}】大小不能超过${(this.maxSize / 1024 / 1024).toFixed()}MB`
            )
            return
          }
        }

        this.uploading = true
        uploadFiles(files.slice(0, this.maxRemainCount))
          .then(res => {
            this.list = this.list.concat(
              res.map(i => ({
                name: i.name,
                url: i.url,
                size: i.size,
              }))
            )
          })
          .catch(err => {
            this.$message.error(err.message)
            console.error(err)
          })
          .finally(() => {
            this.uploading = false
          })
      }
      input.click()
    },
    remove(item) {
      this.list = this.list.filter(i => i !== item)
    },
  },
}
</script>

<style lang="scss">
.base-components-Upload-FileUpload {
  > input {
    display: none;
  }

  > .__uploader {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
  }

  > .__file-list {
    padding: 0;
    margin: 0;

    > li {
      position: relative;
      display: flex;
      align-items: center;
      padding: 0 4px;
      border-radius: 4px;
      margin: 4px 0;
      height: 27px;
      cursor: default;

      &:hover {
        background-color: rgba(0, 0, 0, 0.05);
      }

      > .__name {
        flex: 1;
        margin: 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      > .__delete {
        display: none;
        position: relative;
        z-index: 1;

        &:hover {
          background-color: rgba(0, 0, 0, 0.3);
          color: white;
          cursor: pointer;
          border-radius: 50%;
        }
      }

      &:hover {
        > .__delete {
          display: block;
        }
      }
    }
  }
}
</style>
