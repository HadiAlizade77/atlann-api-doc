<template>
  <div class="vx-row">
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card title="Create new category">
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Title</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <vs-input v-model="newCat.title" class="w-full" icon-pack="feather" icon="icon-edit-2" icon-no-border/>
          </div>
        </div>
        <div class="vx-row mb-6">
          <div class="vx-col sm:w-1/3 w-full">
            <span>Parent Category</span>
          </div>
          <div class="vx-col sm:w-2/3 w-full">
            <v-select label="countryName" :options="countries" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col sm:w-1/3 w-full ml-auto">
            <vs-button @click="createNewCat" class="mr-2 mb-2">
              Create!
            </vs-button>
          </div>
        </div>
      </vx-card>
    </div>
    <div class="vx-col md:w-1/2 w-full mb-base">
      <vx-card title="Categories schema">
        <tree></tree>
      </vx-card>
    </div>
  </div>
</template>

<script>
import Tree from './../../components/_data_tree'
import vSelect from 'vue-select'
import firebase from 'firebase/app'
import 'firebase/firestore'

export default {
  name: 'CategoryList',
  data () {
    return {
      countries: [
        {
          countryCode: 'DE',
          countryName: 'Germany'
        },
        {
          countryCode: 'AUS',
          countryName: 'Australia'
        },
        {
          countryCode: 'CA',
          countryName: 'Canada'
        }
      ],
      newCat : {
        title: '',
        parentCat:''
      }
    }
  },
  components: {
    Tree,
    vSelect
  },
  methods:{
    createNewCat () {
      const payload = {
        items : this.newCat,
        notify: this.$vs.notify
      }
      this.$store.dispatch('doc/createCategory', payload)
    }
  }
}
</script>

<style scoped>

</style>
