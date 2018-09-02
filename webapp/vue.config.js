module.exports = {
    outputDir: '../public',
    productionSourceMap: false,

    pwa: {
      name: 'OUISRC中文社区'
    },
    configureWebpack: {
      externals:{
        'vue': 'Vue',
        'vue-router': 'VueRouter'
      }
    }
}
