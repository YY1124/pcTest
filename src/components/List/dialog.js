import Vue from 'vue'
import Dialog from './Dialog.vue'

export function selectList({
  title = '请选择',
  value = null,
  load = null,
  columns = [],
  requiredMessage = '请选择',
  options
} = {}) {
  return new Promise(resolve => {
    const instance = new Vue({
      el: document.createElement('div'),
      data: {
        visible: true,
        value,
      },
      methods: {
        close() {
          this.visible = false
          document.body.removeChild(this.$el)
        },
        cancel() {
          resolve()
          this.close()
        },
        ok() {
          const { value } = this
          if (requiredMessage && !value) {
            this.$message.error(requiredMessage)
            return
          }
          resolve(value)
          this.close()
        },
      },
      render(h) {
        const { visible, value } = this

        return h(Dialog, {
          props: {
            title,
            visible,
            value,
            load,
            columns,
            options
          },
          on: {
            input: v => (this.value = v),
            cancel: this.cancel,
            ok: this.ok,
          },
        })
      },
    })

    document.body.appendChild(instance.$el)
  })
}
