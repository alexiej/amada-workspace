module.exports = {
  chainWebpack: (config) => {
    // Pug Loader
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end()

    const svgRule = config.module.rule('svg')
    const inlineSvgRule = config.module.rule('inline-svg')

    svgRule
      .exclude
      .add(/icons\/(.*)\.svg/)
      .end()

    inlineSvgRule
      .test(/icons\/(.*)\.svg/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/settings.scss";'
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      removeElectronJunk: true, // True by default,
      builderOptions: {
        mac: {
          icon: './build/icons/mac/icon.icns'
        }
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    }
  }
}
