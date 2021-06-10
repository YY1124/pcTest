import qs from 'qs'
import storage from './storage'
import { GetUserInfoByToken, getUserAuthInfo } from '@/api/psns'

export default {
  install: Vue => {
    Vue.prototype.$storage = storage
    Vue.prototype.$storageInit = async function () {
      // const token = qs.parse(window.location.href.split('?')[1]?.split('#')[0] || '')?.token || null
      const token =
        '6C361704EE56f03a99796a2C3734488983154A1A98C8FFBC3C568A2EDE7813B08A883F228F71CC92FB2408004E328B4B17C23BD6EABB5A25259AF773C25451C0DD7EF84D2971F83DEB1251775817DE93D9B3BDAF2597B453C896DB4EEF9FD8C6CD61BF05D47E77086BABD5A3B4138AC954E1F9305F9'

      if (token) {
        const { StateCode, EntityT } = await GetUserInfoByToken({ token })

        if (StateCode == 200 && EntityT) {
          this.$storage.userInfo = EntityT
          this.$storage.psnsToken = token
        } else {
          this.$storage.userInfo = null
          this.$storage.psnsToken = null
        }

        const res = await getUserAuthInfo()
        if (res && res.stateCode === '00000000' && res.data) {
          this.$storage.authInfo = res.data || null
        }

        return
      }

      throw new Error('token无效')
    }

    Vue.prototype.$storageInit()
  },
}
