<template>
  <vx-card title="Application Info" no-shadow>


    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/4 w-full">
        <span>Security Schemes</span>
      </div>
      <div class="vx-col sm:w-3/4 w-full"><vs-divider />
        <feather-icon icon="PlusCircleIcon" svgClasses="h-5 w-5 ml-1" />
      </div>
    </div>
    <div class="vx-row mb-6">
      <div class="vx-col sm:w-1/4  w-full">
        <span>Versions</span>
      </div>
      <div class="vx-col sm:w-3/4 w-full">
        <vs-chips color="rgb(145, 32, 159)" placeholder="New Element" v-model="versions">
          <vs-chip
            :key="version"
            @click="remove(version)"
            v-for="version in versions" closable>
            {{ version }}
          </vs-chip>
        </vs-chips>
      </div>
    </div>


    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-3 mt-2">Save Changes</vs-button>

    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      versions: ['1.0.0'],

    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
