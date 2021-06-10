import Vue from 'vue'

const storage = new Vue({
  data: {
    user_: null,
    token_: null,
    auth_: null,
  },
  computed: {
    userInfo: {
      get() {
        if (this.user_) {
          return {
            userId: this.user_.UserGlobalId,
            userName: this.user_.UserName,
            globalId: this.user_.OrgGlobalId,
            orgCode: this.user_.OrgCode,
            orgName: this.user_.OrgName,
            orgType: this.user_.TypeCode,
            pGloabId: this.user_.ParentGlobalId,
            pOrgCode: this.user_.ParentOrgCode,
            pOrgName: this.user_.ParentOrgName,
            regionId: this.user_.RegionId,
          }
        }

        return null
      },
      set(user) {
        this.user_ = user
      },
    },
    psnsToken: {
      get() {
        return this.token_
      },
      set(token) {
        this.token_ = token
      },
    },
    authInfo: {
      get() {
        if (this.auth_) {
          return {
            type: this.auth_.code,
            areaId: this.townId || this.administerId || '',
          }
        }
        return null
      },
      set(auth) {
        this.auth_ = auth
      },
    },
  },
})

export default storage
