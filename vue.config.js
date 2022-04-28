module.exports = {
  devServer: {
    proxy: {
      // 项目里我的所有接口的地址都是 /api开头(因为在request.js里配置了baseURL: '/api')
      // 例如: 我的请求地址/api/xx/xx
      // 当node服务器遇到以 '/api' 开头的请求, 就会把target字段里的值加上, 那么请求地址就变成了
      // http://kumanxuan1.f3322.net:8881/cms/api/xx/xx
      // 最后pathRewrite的意思是, 把 '/api'替换为空
      // 所以请求地址就变成了http://kumanxuan1.f3322.net:8881/cms/xx/xx
      // 重启项目就可以了
      '/api': {
        target: 'http://kumanxuan1.f3322.net:8881/cms', // 后台接口地址
        //   ws:true, // 如果要代理websockets, 配置这个参数
        //   secure: true, // 如果是https接口, 需要配置换个参数
        // changeOrigin: true, // 是否跨域
        pathRewrite: {
          // 重写路径
          '^/api': ''
        }
      }
    }
  }
}
