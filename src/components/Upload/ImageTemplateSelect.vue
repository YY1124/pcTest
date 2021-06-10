<template>
  <div
    class="base-components-Upload-ImageTemplateSelect"
    :class="{ readonly }"
    @click="visible = true"
  >
    <div class="image" :style="imageStyle" />
    <i class="iconfont icon-plus" v-if="showPlus">&#xe613;</i>
    <el-dialog append-to-body title="选择模板" :visible.sync="visible" @close="visible = false">
      <div class="base-components-Upload-ImageTemplateSelect__list">
        <div
          class="item"
          v-for="item in templates"
          :key="item.url"
          :style="{ backgroundImage: `url(${item.url})` }"
          :class="{ checked: item.url === checkedUrl }"
          @click="selectItem(item)"
        >
          <i class="iconfont icon-checked">&#xe65c;</i>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import emitter from 'element-ui/lib/mixins/emitter'
import * as dictionaryAPI from '../../api/dictionary'

export const AVAILABLE_IMAGE_TEMPLATE_TYPES = [
  dictionaryAPI.DICTIONARY_TYPE_MEETING_TEMPLATE_ZBDYDH,
  dictionaryAPI.DICTIONARY_TYPE_MEETING_TEMPLATE_ZBWYH,
  dictionaryAPI.DICTIONARY_TYPE_MEETING_TEMPLATE_DXZH,
  dictionaryAPI.DICTIONARY_TYPE_MEETING_TEMPLATE_DK,
  dictionaryAPI.DICTIONARY_TYPE_THEMEDAY_TEMPLATE,
]

export default {
  mixins: [emitter],
  props: {
    type: {
      type: [String, Number],
      required: true,
      validator: v => {
        return AVAILABLE_IMAGE_TEMPLATE_TYPES.includes(Number(v))
      },
    },
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
  },
  data() {
    return {
      loading: false,
      templates: [],
      visible: false,
    }
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
    checkedUrl() {
      return this.list[0]?.url
    },
  },
  watch: {
    list(v) {
      this.dispatch('ElFormItem', 'el.form.change', [v])
    },
    type: {
      handler: 'init',
      immediate: true,
    },
  },
  methods: {
    async init() {
      try {
        this.loading = true
        this.templates =
          (await dictionaryAPI.getDictionary({ type: this.type })).data?.map(i => ({
            key: i.key,
            url: i.value,
          })) || []
      } catch (err) {
        this.$message.error(err.message)
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    selectItem(item) {
      this.list = [{ name: '', url: item.url }]
      this.visible = false
    },
  },
}
</script>

<style lang="scss">
.base-components-Upload-ImageTemplateSelect {
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

.base-components-Upload-ImageTemplateSelect__list {
  display: flex;
  flex-wrap: wrap;
  max-height: 50vh;
  overflow: auto;
  justify-content: center;

  > .item {
    width: 160px;
    height: 100px;
    border-radius: 6px;
    margin: 16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    position: relative;

    .icon-checked {
      display: none;
    }

    &.checked {
      .icon-checked {
        display: block;
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 18px;
        height: 18px;
        line-height: 18px;
        border-radius: 9px;
        color: #fff;
        text-align: center;
        background: linear-gradient(90deg, #ff7d71, #ff4c3b);
      }
    }
  }
}
</style>
