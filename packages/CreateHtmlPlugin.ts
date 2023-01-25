const ejs = require('ejs')

interface IOptions {
  inject: {
    data: Record<string, any>
  }
}
module.exports = (options) => {
  return {
    transformIndexHtml: {
      order: 'pre',
      handler: (html: string, ctx) => {
        const template = ejs.compile(html)
        if (!options?.inject.data) {
          throw new Error('createHtmlPlugin : inject data is required !')
        }
        const data = options.inject.data ?? {}
        return template(data)
      }
    }
  }
}
