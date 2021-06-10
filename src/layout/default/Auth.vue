<template>
  <div v-loading="loading" class="layout-default-auth">
    <router-view v-if="!loading" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  async created() {
    this.loading = true
    if (!this.$storage.userInfo) {
      try {
        await this.$storageInit()
      } catch (error) {
        this.$router.push({ name: '403' })
      }
    }
    this.loading = false
  },
}
</script>


<style lang="scss" scoped>
.layout-default-auth {
  width: 100%;
  height: 100%;
}
</style>