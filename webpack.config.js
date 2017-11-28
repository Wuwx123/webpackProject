const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: "eval-source-map",//生成Source Maps（使调试更容易）

  entry:  {
    main:  path.resolve(__dirname, 'src/js/main.js'),
    print: path.resolve(__dirname, 'src/js/print.js')
  },//入口文件
  output: {
    path: path.resolve(__dirname, "dist"),//打包后的文件存放的地方
    // publicPath: 'http://baidu.com/',//项目发布地址
    filename: "js/[name]-[chunkhash].js"//打包后输出文件的文件名
  },

  devServer: {
    contentBase: "./dist",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    // “inline”选项会为入口页面添加“热加载”功能，“hot”选项则开启“热替换（Hot Module Reloading）”，
    // 即尝试重新加载组件改变的部分（而不是重新加载整个页面）。如果两个参数都传入，当资源改变时，
    // webpack-dev-server将会先尝试HRM（即热替换），如果失败则重新加载整个入口页面。

    // inline: true,//启用实时刷新（热加载）
    // hot:true,//启用热模块（热替换），即尝试重新加载组件改变的部分（而不是重新加载整个页面）   注意：这么写经常不生效
    // progress:true,//输出运行进度到控制台
    // open: true,//开启服务器将打开浏览器
    port:9090 //端口你可以自定义
  },

  module: {
    /*loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      }
    ]*/
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: { loader: "babel-loader"},
        include: path.resolve(__dirname, "src"),
        exclude: path.resolve(__dirname, "node_modules")
        // exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"/*, options: { importLoaders: 1 }*/ },//importLoaders参数作用：能使@import的css文件
          { loader: "postcss-loader",
            options: {
              // ident: "postcss",//要写上，否则{ importLoaders: 1 }无效
              plugins: function () {
              	return [
              	  require('postcss-import')(),//有ident: 'postcss'的作用，并且@import的css文件合并成一个；必须写在require("autoprefixer")前面
              	  require('autoprefixer')({
              	    broswers: ['last 5 versions']
              	  })
              	];
              }
            }
          }
        ]
      }
    ]
  },
    
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({//自动生成HTML文件
      // filename: "index-[hash].html",
      template: path.resolve(__dirname, "src/index.html"),
      title: "Webpack My Project",
      chunks: ["main", "print"],
      inject: "body"
    }),
    new CleanWebpackPlugin(['dist']),//清理 /dist 文件夹
    // new webpack.HotModuleReplacementPlugin()//热加载插件
  ],

}