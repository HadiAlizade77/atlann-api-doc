<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? 'General' : ''">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <main-info />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-bell" :label="!isSmallerScreen ? 'Application' : ''">
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <app-info />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
export default {
  components: {
    MainInfo: () => import('./_MainInfo'),
    AppInfo: () => import ('./_AppInfo')
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>
<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
