<template>
  <div class="base-components-Upload-AudioUpload">
    <Draggable class="list" v-model="list" :group="dragGroup" handle=".image" :move="checkMove">
      <div
        class="item image"
        v-for="(item, index) in list"
        :key="index"
        @click="handleItemClick(index)"
        v-loading="uploadings[index]"
      >
        <i class="iconfont icon-mp3">&#xe615;</i>
        <div class="duration">{{ item.duration | secondsDuration }}</div>
        <div class="remove" @click.stop="remove(item)" v-if="!uploadings[index]">
          <span class="iconfont">&#xe608;</span>
        </div>
      </div>
      <div class="item upload" @click="chooseFile" v-if="showChooseBtn" v-loading="uploading">
        <span class="iconfont">&#xe613;</span>
      </div>
    </Draggable>
  </div>
</template>

<script>
import Vue from 'vue'
import { uploadFiles } from '../../common/upload'
import emitter from 'element-ui/lib/mixins/emitter'

let dragGroupIndex = 0

export default {
  mixins: [emitter],
  props: {
    // 值数组，格式为 [{wangsuId: '', name: '', duration: 1.1}]
    value: {
      type: Array,
      default: undefined,
    },
    // value 的替代属性，值为 JSON 字符串，会自动使用 JSON.parse 和 JSON.stringify 处理
    jsonValue: {
      type: String,
      default: null,
    },
    // 最大数量
    max: {
      type: Number,
      default: 1,
    },
    accept: {
      type: String,
      default: '.mp3',
    },
  },
  data() {
    return {
      uploading: false,
      // 某一项是否在上传
      uploadings: [],
      dragGroup: `AUDIO-UPLOAD-GROUP-${dragGroupIndex++}`,
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
    showChooseBtn() {
      return this.max > this.list.length
    },
    maxRemainCount() {
      return this.max - this.list.length
    },
  },
  watch: {
    list(v) {
      this.dispatch('ElFormItem', 'el.form.change', [v])
    },
  },
  methods: {
    handleItemClick(index) {
      if (this.uploading || this.uploadings[index]) {
        return
      }

      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = false
      input.accept = this.accept
      input.onchange = e => {
        const file = e.target.files[0]
        Vue.set(this.uploadings, index, true)
        uploadFiles([file])
          .then(res => {
            res = res[0]

            this.$set(this.list, index, {
              name: res.name,
              wangsuId: res.wangsuId,
              duration: res.duration,
            })
          })
          .catch(err => {
            this.$message.error(err.message)
            console.error(err)
          })
          .finally(() => {
            Vue.set(this.uploadings, index, false)
          })
      }
      input.click()
    },
    chooseFile() {
      if (this.uploading || this.uploadings.includes(true)) {
        return
      }

      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = this.maxRemainCount > 1
      input.accept = this.accept
      input.onchange = e => {
        const files = [...e.target.files]
        if (files.length > this.maxRemainCount) {
          this.$message.warning(`最多上传${this.max}个视频`)
        }
        this.uploading = true
        uploadFiles(files.slice(0, this.maxRemainCount))
          .then(res => {
            this.list = this.list.concat(
              res.map(i => ({
                name: i.name,
                wangsuId: i.wangsuId,
                duration: i.duration,
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
    checkMove(e) {
      if (e.related.className.indexOf('upload') !== -1) {
        return false
      }
      return true
    },
    remove(item) {
      this.list = this.list.filter(i => i !== item)
    },
  },
}
</script>

<style lang="scss">
.base-components-Upload-AudioUpload {
  user-select: none;

  > .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin: -8px;

    > .item {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      width: 80px;
      height: 80px;
      border-radius: 4px;
      margin: 8px;
      overflow: visible;
      border: 1px solid #d5d5d5;
      cursor: grab;

      &.upload {
        cursor: pointer;
        overflow: hidden;

        &:hover {
          border-color: #999999;
        }

        .iconfont {
          font-size: 30px;
          color: #999;
        }
      }

      &.image {
        > .icon-mp3 {
          font-size: 40px;
          color: #999;
        }

        > .duration {
          position: absolute;
          bottom: 4px;
          right: 4px;
          line-height: 16px;
          font-size: 12px;
          background-color: rgba(0, 0, 0, 0.3);
          padding: 0 8px;
          border-radius: 4px;
          color: #fff;
        }
      }

      > .remove {
        position: absolute;
        right: -6px;
        top: -6px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #e9463d;
        cursor: pointer;

        .iconfont {
          color: #fff;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
