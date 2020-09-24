import markdown from "markdown-it";
import hljs from "highlight.js";

export default {
  data() {
    return {
      apiMethod: {
        title: '',
        color: 'primary'
      },
      apiPath: '',
      apiTitle: '',
      apiRequests: '',
      apiResponses: [],
      parsedMd: '',
    }
  },
  methods: {
    mdRender() {
      const md = new markdown({
        html: true,
        linkify: true,
        typographer: true,
        breaks: true,
        highlight(str, lang) {
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
      this.parsedMd = md.render(this.synthesizeMd())
    },
    synthesizeMd() {
      const apiTitle = '# '+this.apiTitle + '\n'
      const methodTag = this.renderMethodBlock()
      const responses = this.renderResponsesBlock()
      const requests = this.renderRequestsBlock()
      return apiTitle + methodTag + requests + responses
    },
    renderRequestsBlock () {
      return '## Requests \n' + this.apiRequests
    },
    renderResponsesBlock () {
      let responses = ''
      this.apiResponses.forEach((val, index) => {
        responses += `\n ## Responses \n <button type="button" disabled="disabled" class="vs-component mr-3 vs-button vs-button-${  val.color  } vs-button-filled">` +
          `<span class="vs-button-text vs-button--text">${  val.code  }</span></button>` + `<span class="text-bold">${  val.title  }</span>` + `\n${
            val.mdData  }\n`
      })
      return responses
    },
    renderMethodBlock() {
      return `<button type="button" disabled="disabled" class="vs-component mr-3 vs-button vs-button-${this.apiMethod.color} vs-button-filled">` +
        `<span class="vs-button-text vs-button--text">${this.apiMethod.title}</span></button>` + `<span class="text-bold">/${this.apiPath}</span> \n`
    }
  }
}
