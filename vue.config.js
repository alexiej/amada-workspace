module.exports = {
  chainWebpack: (config) => {
      // Pug Loader
      config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-plain-loader')
      .loader('pug-plain-loader')
      .end();


      // const svgRule = config.module.rule('svg');
      // inlineSvgRule = config.module.rule('inline-svg');

      // svgRule
      //     .exclude
      //     .add(/i\/\.(.*)\.svg/)
      //     .end()

      // inlineSvgRule
      //     .test(/icons\\.(.*)\.svg/)
      //     .use('vue-svg-loader')
      //     .loader('vue-svg-loader')

      // const svRule = 
      // config.module.rule('svg')
      //   .use('file-loader')
      //   .loader('file-loader');    
      const svgRule = config.module.rule('svg');
      inlineSvgRule = config.module.rule('inline-svg');

      svgRule
          .exclude
          .add(/icons\/(.*)\.svg/)
          .end()

      inlineSvgRule
          .test(/icons\/(.*)\.svg/)
          .use('vue-svg-loader')
          .loader('vue-svg-loader')

      
      // config.module.rule('/images\/(.+)\.svg/')
      //   .use('file-loader')
      //   .loader('file-loader');
      // const svgRule = config.module.rule('svg');

      // svgRule.uses.clear();
      // svgRule
      //   .use('babel-loader')
      //   .loader('babel-loader')
      //   .end()
      //   .use('vue-svg-loader')
      //   .loader('vue-svg-loader');
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/settings.scss";'
      }
    }
  }
};
