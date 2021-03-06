const {join, resolve} = require('path')
const webpack = require('webpack')
const glob = require('glob')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const vuxLoader = require('vux-loader');

const extractCSS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})

const extractSTYLUS = new ExtractTextPlugin({
  filename: 'assets/css/[name].css',
  allChunks: true
})

const entries = {}

const chunks = []

glob.sync('./src/pages/**/app.js').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.js')[0]
  entries[chunk] = path
  chunks.push(chunk)
})

const debug = process.env.NODE_ENV !== "production"
const devPort = 8081
var config = {
  entry: entries,
  output: {
    path: resolve(__dirname, './MobileClient'),
    filename: 'assets/js/[name].js',
    publicPath: debug ? '/' : '../'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      assets: join(__dirname, '/src/assets'),
      common: join(__dirname, '/src/common'),
      components: join(__dirname, '/src/components'),
      root: join(__dirname, 'node_modules'),
      // 'jquery': 'jquery'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'style-loader'
            })),
            stylus: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              use: ['css-loader',
                { loader: 'postcss-loader', options: { sourceMap: 'inline' }}, 
                'stylus-loader'],
              fallback: 'style-loader'
            })),
            postcss: ExtractTextPlugin.extract({
              use: ['css-loader', { loader: 'postcss-loader', options: { sourceMap: 'inline' }}],
              fallback: 'style-loader'
            })
          }
        }
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [{ loader: 'css-loader', options: { sourceMap: debug } },
            { loader: 'postcss-loader', options: { sourceMap: debug } }],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.styl/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: debug } },
            { loader: 'postcss-loader', options: { sourceMap: debug } },
            { loader: 'stylus-loader', options: { sourceMap: debug } }],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            root: resolve(__dirname, 'src'),
            attrs: ['img:src', 'link:href']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      },
      /*{
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/img/[name].[hash:7].[ext]'
          }
        }]
      },*/
      {
        test: /\.(woff2?|woff|eot|ttf|otf|svg|svgz)(\?.*)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'assets/fonts/[name].[hash:7].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin('create by 木メメ木+大'),
    new CommonsChunkPlugin({
      name: 'vendors',
      filename: 'assets/js/vendors.js',
      chunks: chunks,
      minChunks: chunks.length
    }),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   jQuery: "jquery"
    // }),
    extractSTYLUS,
    extractCSS
  ],
  devServer: {
    host: '0.0.0.0',
    port: devPort,
    hot: true,
    historyApiFallback: false,
    noInfo: false,
    proxy: {
      '/api': {
        target: 'http://yuyue.tianshizhiwen.org',
        changeOrigin: true,
        secure: false
        // pathRewrite: {'^/api': ''}
      },
      '/static': {
        target: 'http://yuyue.tianshizhiwen.org',
        changeOrigin: true,
        // secure: false
        // pathRewrite: {'^/api': ''}
      }
    }
  },
  devtool: '#eval-source-map'
}

config = vuxLoader.merge(config, {
  plugins: [
    {
      name: 'vux-ui'
    }
  ]
})

glob.sync('./src/pages/**/*.html').forEach(path => {
  const chunk = path.split('./src/pages/')[1].split('/app.html')[0]
  const filename = chunk + '.html'
  const htmlConf = {
    filename: filename,
    template: path,
    inject: 'body',
    // favicon: './src/assets/img/logo.png',
    hash: process.env.NODE_ENV === 'production',
    chunks: ['vendors', chunk]
  }
  config.plugins.push(new HtmlWebpackPlugin(htmlConf))
})

module.exports = config

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: debug
    }),
    new OptimizeCSSPlugin()
  ])
}
