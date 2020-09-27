<template>
  <vs-popup title="Add a new response" :active.sync="popupStatus">

    <div class="vx-row mb-6">

      <div class="vx-col md:w-5/12 ">
        <vx-input-group class="mb-3">
          <template slot="prepend">
            <div :class="'text-small prepend-text bg-'+status.color">
              <small>Code</small>
            </div>
          </template>

          <vs-input v-validate="'required'" @input="updateStatus" placeholder="Status code..." :color="status.color"
                    type="number"
                    v-model="code"
                    name="code"
                    @keyup.enter="addResponse"
          />


        </vx-input-group>
        <span class="text-danger text-sm" v-show="errors.has('code')">{{ errors.first('code') }}</span>
      </div>

      <div class="vx-col md:w-6/12 ">
        <vx-input-group class="mb-3">
          <template slot="prepend">
            <div :class="'prepend-text bg-'+status.color">
              <small>Title</small>
            </div>
          </template>

          <vs-input @keyup.enter="addResponse" v-validate="'required'" name="title" :color="status.color" v-model="status.title"/>

        </vx-input-group>
        <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

      </div>
    </div>

    <vs-button @click="addResponse" :color="status.color" style="float: right" class="mr-2 mb-2">
      ADD
    </vs-button>

  </vs-popup>
</template>
<script>

export default {
  data () {
    return {
      code: '',
      status: {
        firstN: '',
        title: '',
        color: 'primary'
      },
      conditons: [
        {
          firstN: 1,
          title: 'Informational',
          color: 'primary'
        }, {
          firstN: 2,
          title: 'Success',
          color: 'success'
        }, {
          firstN: 3,
          title: 'Redirection',
          color: 'warning'
        }, {
          firstN: 4,
          title: 'Client Error',
          color: 'danger'
        }, {
          firstN: 5,
          title: 'Server Error',
          color: 'danger'
        }
      ]
    }
  },
  props: {
    active: Boolean,
    popupId: String
  },
  computed: {
    popupStatus: {
      get () {
        return this.$props.active
      },
      set (value) {  // this only gets mutated when pop is closing
        this.$emit('popup-close', {
          popupId: 'addResponse'
        })
        if (value === false) this.clearForm()
      }
    }
  },
  methods: {
    updateStatus () {
      if (this.code.length === 3) {
        const firstDigit = this.code.charAt(0)
        if (firstDigit >= 6 || firstDigit <= 0) this.clearForm()
        else {
          const predectedStatus = this.conditons[firstDigit - 1]
          const status = Object.assign({}, predectedStatus)
          // console.log(status)
          this.status = status
        }
      } else this.clearForm(false)

    },
    clearForm (clearCode = true) {
      this.status = Object.assign({}, {
        firstN: '',
        title: '',
        color: 'primary'
      })
      if (clearCode) this.code = ''

    },
    addResponse () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$emit('add-response', {
            code: this.code,
            title: this.status.title,
            color: this.status.color,
            mdData: ' '
          })
          this.popupStatus = false
        } else {
          // form have errors
        }

      })
    }
  }
}
</script>
<style scoped>

</style>
