const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    },
    extract: false
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack : {
    performance: {
      hints:'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  },
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: '192.168.8.151',
    port: '8082',
    https: false,
    hotOnly: false
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.8.150:8098/', // API服务器的地址
    //     ws: true,  // 代理websockets
    //     changeOrigin: true, //  虚拟的站点需要更管origin
    //     pathRewrite: {   // 重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  chainWebpack(config) {
    config.resolve.symlinks(true);
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'));
    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  },
  publicPath: '/MemorialHall'
}
