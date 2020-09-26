import markdown from 'markdown-it'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      documentationForm : {
        apiMethod: {
          title: '',
          color: 'primary'
        },
        apiPath: '',
        apiTitle: '',
        apiRequests: '',
        apiResponses: [],
        parsedMd: ''
      }
    }
  },
  methods: {
    mdRender () {
      const md = new markdown({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${
                hljs.highlight(lang, str, true).value
              }</code></pre>`
            } catch (__) {
            }
          }
          return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
        }
      })
      this.documentationForm.parsedMd = md.render(this.synthesizeMd())
    },
    synthesizeMd () {
      const apiTitle = `# ${this.documentationForm.apiTitle  }\n`
      const methodTag = this.renderMethodBlock()
      const responses = this.renderResponsesBlock()
      const requests = this.renderRequestsBlock()

      //check for empty objects and avoid binding them
      let data = ''
      this.documentationForm.apiTitle !== '' ? data += apiTitle : 0
      this.documentationForm.apiMethod.title !== '' ? data += methodTag : 0
      this.documentationForm.apiRequests !== '' ? data += requests : 0
      this.documentationForm.apiResponses.length > 0 ? data += responses : 0

      return data
    },
    renderRequestsBlock () {
      return `## Requests \n${  this.documentationForm.apiRequests}`
    },
    renderResponsesBlock () {
      let responses = '\n ## Responses \n '
      this.documentationForm.apiResponses.forEach((val, index) => {
        responses += `<button type="button" disabled="disabled" class="vs-component mr-3 vs-button vs-button-${  val.color  } vs-button-filled">` +
          `<span class="vs-button-text vs-button--text">${  val.code  }</span></button>` + `<span class="text-bold">${  val.title  }</span>` + `\n${
          val.mdData  }\n`
      })
      return responses
    },
    renderMethodBlock () {
      return `<button type="button" disabled="disabled" class="vs-component mr-3 vs-button vs-button-${this.documentationForm.apiMethod.color} vs-button-filled">` +
        `<span class="vs-button-text vs-button--text">${this.documentationForm.apiMethod.title}</span></button>` + `<span class="text-bold">/${this.documentationForm.apiPath}</span> \n`
    }
  }
}
