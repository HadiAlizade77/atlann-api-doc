<template>
  <div id="new-api">
    <vx-card title="New API">

      <div class="vx-row">
        <!--   write     -->
        <div class="vx-col md:w-1/2 w-full mb-base">
          <div class="vx-row">

            <!--          api Info -->
            <div class="vx-col md:w-1/1 w-full">
              <div class="vx-row mb-6">
                <div class="vx-col sm:w-1/3 w-full">
                  <span>Title</span>
                </div>
                <div class="vx-col sm:w-2/3 w-full">
                  <vs-input v-validate="'required'" name="title" @input="updateMd" class="w-full" v-model="apiTitle" icon-pack="feather" icon="icon-hash"
                            icon-no-border/>
                  <span class="text-danger text-sm" v-show="errors.has('title')">{{ errors.first('title') }}</span>

                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col sm:w-1/3 w-full">
                  <span>Category</span>
                </div>
                <div class="vx-col sm:w-2/3 w-full">
                  <v-select :options="['1','3']" :dir="$vs.rtl ? 'rtl' : 'ltr'"/>
                </div>
              </div>
            </div>

            <vs-divider>REQUEST</vs-divider>


            <!--          method and path -->
            <div class="vx-col md:w-1/1 w-full ">
              <template>
                <!-- CHECKBOX -->
                <vx-input-group prependClasses="border border-solid border-grey">
                  <template slot="prepend">
                    <div class="prepend-text">
                      <div class="dropdown-button-container">
                        <vs-dropdown>

                          <a :class="'btn-drop flex items-center text-'+apiMethod.color" href.prevent>
                            <i class="material-icons"> import_export </i>
                            {{ apiMethod.title || 'Method' }}
                            <i class="material-icons"> expand_more </i>
                          </a>
                          <vs-dropdown-menu>
                            <vs-dropdown-item>
                              <vs-button  @click="setApiMethod(method)" v-for="method in methods" :color="method.color"
                                         type="flat">
                                {{ method.title }}
                              </vs-button>
                            </vs-dropdown-item>
                          </vs-dropdown-menu>

                        </vs-dropdown>
                      </div>
                    </div>
                  </template>

                  <vs-input v-validate="'required'" name="path" @input="updateMd" placeholder=" /Path to API ... " v-model="apiPath"/>
                </vx-input-group>

                <span class="text-danger text-sm" v-show="errors.has('path')">{{ errors.first('parh') }}</span>

                <!-- /CHECKBOX -->

              </template>

            </div>

            <vs-divider position="right" class="mt-2" icon="chevron_left"></vs-divider>


            <!--            editor -->


            <vs-row
              vs-align="center"
              vs-type="flex" vs-justify="space-around" vs-w="12">
              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                <vs-button @click="addTable('request','headers')" class="px-2" color="primary" type="flat" icon="add">
                  Header Table
                </vs-button>

              </vs-col>

              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                <vs-button @click="addTable('request','queryParams')" class="px-2" color="primary" type="flat"
                           icon="add">Query Param
                </vs-button>
              </vs-col>

              <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="3">
                <vs-button @click="addJsonBody('request')" class="px-2" color="primary" type="flat" icon="add">Json
                  body
                </vs-button>
              </vs-col>

            </vs-row>

            <div class="vx-col md:w-1/1 w-full mb-2">

            </div>

            <div class="vx-col md:w-1/1 w-full mb-2">
              <vs-textarea  @input="updateMd" v-model="apiRequests" label="" height="300"/>
            </div>
            <!--            editor -->

            <vs-divider>RESPONSE</vs-divider>

            <!--       add response -->
            <div class="vx-col md:w-1/1 w-full mb-2">
              <vs-button
                @click="popups.addResponse = true"
                class="px-2" color="primary" style="float: left"
                type="flat" icon="add">
                Response
              </vs-button>
              <add-response
                v-on:add-response="addResponse"
                v-on:popup-close="checkPopup"
                :active.sync="popups.addResponse"></add-response>
            </div>

            <div class="vx-col md:w-1/1 w-full mb-base">
              <ul class="responses-list text-white" v-if="apiResponses.length > 0">
                <li @click="editResponse(key)" v-for="(response,key) in apiResponses" :key="key" style="float: left"
                    :class="editor.editableResponseId === key ? 'editing bg-'+ response.color : 'bg-'+ response.color ">
                  <small><b>{{ response.code }}</b>
                    <br>
                    {{ response.title }}
                  </small>

                </li>
              </ul>
            </div>
            <div class="vx-col md:w-1/1 w-full mb-base">
              <transition name="fade">
                <div v-if="editor.editableResponseId !== ''">

                  <vs-row
                    vs-align="center"
                    vs-type="flex" vs-justify="space-around" vs-w="12">
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">

                  <vs-button @click="addJsonBody('response',editor.editableResponseId)" class="m-5" color="primary" type="flat" icon="add">Json
                    body
                  </vs-button>
                    </vs-col>
                    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="6">

                    <vs-button @click="deleteResponse(editor.editableResponseId)"  class="m-5" color="danger" type="flat" icon="delete">Delete Response
                  </vs-button>

                    </vs-col>
                  </vs-row>
                  <vs-textarea @input="updateMd" v-if="apiResponses[editor.editableResponseId].mdData" v-model="apiResponses[editor.editableResponseId].mdData" height="300px"/>

                </div>
              </transition>
              <vs-button @click="submitForm" ref="submitButton" type="gradient" color="success" style="float: right" class="ml-2 block">Submit</vs-button>
            </div>
            <!--            editor -->


          </div>
        </div>
        <!--        preview     -->
        <div class="vx-col md:w-1/2 w-full mb-base">
          <div class="vx-row">
            <div class="vx-col md:w-1/1 w-full mb-base">
              <div id="md-render" class="markdown-body" v-html="parsedMd">
              </div>

            </div>
          </div>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>

import vSelect from 'vue-select'

//compo
import addResponse from './Popups/_new_response'
import mdRender from "../../mixins/mdRender";
export default {
  name: 'NewAPI',
  mixins : [mdRender],
  data () {
    return {
      editor:{editableResponseId :''},
      popups: {
        addResponse: false
      },
      wasSidebarOpen: null,
      methods: [
        {title: 'GET', color: 'primary'},
        {title: 'POST', color: 'success'},
        {title: 'PUT', color: 'warning'},
        {title: 'PATCH', color: 'dark'},
        {title: 'DELETE', color: 'danger'}
      ]
    }
  },
  components: {
    addResponse,
    vSelect
  },
  computed : {
    unSavedChanges(){return this.$store.getters['doc/getLocalSave']},
  },
  mounted () {
    this.wasSidebarOpen = this.$store.state.reduceButton
    this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
  },
  beforeDestroy () {
    if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
  },
  methods: {
    updateMd () {
      setTimeout(() => this.mdRender(), 500)
    },
    localSave () {
      setTimeout(() => {
        this.$store.dispatch('doc/saveNewApi', {
          title : this.apiTitle,
          method : this.apiMethod,
          path : this.apiPath,
          responses: this.apiResponses,
          requests : this.apiRequests
        })
      }, 15000)
    },
    checkPopup (e) {
      // comes with popupId
      this.popups[e.popupId] = false
    },

  // new document's form
    storeApi () {
      const payload = {
        items: {
          title : this.apiTitle,
          method : this.apiMethod,
          path : this.apiPath,
          responses: this.apiResponses,
          requests : this.apiRequests
        },
        notify: this.$vs.notify
      }
      this.$store.dispatch('doc/saveNewApi',payload)
    },
    submitForm () {
      //disable submit button
      this.$refs.submitButton.$el.setAttribute('disabled','true')
      setTimeout(()=>{ this.$refs.submitButton.$el.removeAttribute('disabled')},1500)

      this.storeApi() //dispatch store action
    },
    addResponse (newResponse) {
      this.apiResponses.push(newResponse)
      this.updateMd()
    },
    deleteResponse (key) {
      this.apiResponses.splice(key, 1)
      this.editor.editableResponseId = ''
      this.updateMd()
    },
    setApiMethod (method) {
      this.apiMethod = method
      this.updateMd()
    },
    editResponse(key) {
      this.editor.editableResponseId === key ? this.editor.editableResponseId = '' : this.editor.editableResponseId = key
    },
  //  markdown helper functions
    addTable (field, type) {
      const toSentenceCase = type.replace(/([A-Z])/g, ' $1')
      const typeTitle = toSentenceCase.charAt(0).toUpperCase() + toSentenceCase.slice(1)

      if (field === 'request') {
        this.apiRequests += `\n ### Request ${  typeTitle  }\n` +
          '|  NAME | TYPE  | Description  |\n' +
          '|:-:|:-:|:-:|\n' +
          '|   |   |   |\n' +
          '|   |   |   |\n' +
          '|   |   |   |\n'
      }
      this.updateMd()
    },
    addJsonBody (field, responseId = null) {
      if (field === 'request') {
        this.apiRequests +=
          '\n``` json\n' +
          '{\n' +
          '  "name": "users name",\n' +
          '  "school_name": "school name"\n' +
          '}\n' +
          '```\n'
      } else if (field === 'response' && this.editor.editableResponseId !== '') {
        this.apiResponses[this.editor.editableResponseId].mdData +=
          '\n``` json\n' +
          '{\n' +
          '  "name": "users name",\n' +
          '  "school_name": "school name"\n' +
          '}\n' +
          '```\n'
      }
      this.updateMd()
    },
  }
}
</script>

<style>
@import "../../assets/css/md-style.css";
@import "./../../../node_modules/highlight.js/styles/a11y-light.css";

.vs-textarea {
  min-height: 350px !important;
}
.btn-drop {
  border-radius: 0px 5px 5px 0px;
  border-left: 1px solid rgba(255, 255, 255, .2);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.editing {
  animation: blinker 1s linear infinite;
}

@keyframes blinker {
  50% {
    opacity: 0.3;
  }
}
</style>
