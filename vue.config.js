const { defineConfig } = require('@vue/cli-service')
const fs = require("fs");
module.exports = defineConfig({
  devServer: {
    port: '8080',
    /* server: {
      type: "https",
      options: {
        key: fs.readFileSync('./server.key'),
        cert: fs.readFileSync('./server.crt'),
      },
    }, */
  },
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
