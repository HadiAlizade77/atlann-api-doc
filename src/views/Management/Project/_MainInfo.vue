<template>
  <vx-card title="General setting" no-shadow>


    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/4 w-full">
        <span>Title</span>
      </div>
      <div class="vx-col sm:w-3/4 w-full">
        <vs-input class="w-full" placeholder="Project's title" v-model="appInfo.appTitle" icon-pack="feather"
                  icon="icon-package" icon-no-border/>

      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/4  w-full">
        <span>Developer's Contact</span>
      </div>
      <div class="vx-col sm:w-3/4 w-full">
        <vs-input class="w-full mb-3 " v-model="appInfo.contact.devName" icon-pack="feather" icon="icon-user"
                  icon-no-border placeholder="Name"/>
        <vs-input type="email" class="w-full mb-3 " v-model="appInfo.contact.devMail" icon-pack="feather"
                  icon="icon-mail" icon-no-border placeholder="Email"/>
        <vs-input class="w-full" icon-pack="feather" v-model="appInfo.contact.devPhone" icon="icon-smartphone"
                  icon-no-border placeholder="Phone number"/>
      </div>
    </div>


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button @click="saveChanges" class="ml-3 mt-2">Save Changes</vs-button>

    </div>
  </vx-card>
</template>

<script>

export default {
  data() {
    return {
      appInfo: {
        appTitle: '',
        contact: {
          devName: '',
          devMail: '',
          devPhone: ''
        }
      }
    }
  },
  created() {
    this.$store.dispatch('doc/fetchAppInfo')
  },
  mounted() {
    this.appInfo = this.$store.getters["doc/getAppInfo"]
      // JSON.parse(JSON.stringify()) // remove prototypes
  },
  methods: {
    saveChanges() {
      const payload = {
        items: this.appInfo,
        notify: this.$vs.notify
      }
      this.$store.dispatch('doc/setAppInfo', payload)
    },
  }
}
</script>
