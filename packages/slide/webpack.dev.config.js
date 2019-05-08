'use strict';
const nodeEnv = process.env.NODE_ENV;
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:path.resolve(__dirname,"./src/example/app.js"),
  output:{
    filename:'bundle.js'
  },
  module:{
    rules : [
      {
        test: /\.(js|jsx)$/,
        use : {
          loader : "babel-loader"
        },
        exclude : /node_modules/
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [    //postcss-loader的插件
                  //require('postcss-import')({root: loader.resourcePath}),  //将css文件中的通过@import导入的css打包在一起
                  // require('postcss-cssnext')(),
                  require('autoprefixer')({   //自动添加浏览器前缀名
                      browsers: ['last 5 versions']
                  }),
                  // require('cssnano')()
              ]
            }
          },
         'less-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [    //postcss-loader的插件
                  //require('postcss-import')({root: loader.resourcePath}),  //将css文件中的通过@import导入的css打包在一起
                  // require('postcss-cssnext')(),
                  require('autoprefixer')({   //自动添加浏览器前缀名
                      browsers: ['last 5 versions']
                  }),
                  // require('cssnano')()
              ]
            }
          },
         'sass-loader'
        ]
      },
      {
        test : /\.css$/,
        use : [{loader : "style-loader"},{loader : "css-loader"}]
      },
      {
        test: /\.(png|gif|jpg|jpe?g|bmp)$/i,
        use : [
          {
            loader : 'url-loader',
            options : {
              limit : '8192'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: '8192'
          }
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      template: 'src/example/index.html'
    }),
    //new ExtractTextPlugin('css/[name].[chunkhash:8].css'),
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    }),

  ],
  //我们在这里对webpack-dev-server进行配置,这个配置在没有的情况下，端口默认是8080，且webpack-dev-server默认热更新（即使不设置）
  devServer: {
    contentBase:path.join(__dirname,"./"),// 本地服务器在哪个目录搭建页面，一般我们在当前目录即可；
    historyApiFallback:true,//当我们搭建spa应用时非常有用，它使用的是HTML5 History Api，任意的跳转或404响应可以指向 index.html 页面；
    inline:true,//用来支持dev-server自动刷新的配置，webpack有两种模式支持自动刷新，一种是iframe模式，一种是inline模式；使用iframe模式是不需要在devServer进行配置的，只需使用特定的URL格式访问即可；不过我们一般还是常用inline模式，在devServer中对inline设置为true后，当我们启动webpack-dev-server时仍要需要配置inline才能生效
    hot:true,// 启动webpack热模块替换特性,这里是个坑
    port:8080,//配置服务端口号
    host:'localhost',//服务器的IP地址，可以使用IP也可以使用localhost
    compress:true,//服务端压缩是否开启
  }
}
