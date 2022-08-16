const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "@/assets/style/style.scss";
        `
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
})
