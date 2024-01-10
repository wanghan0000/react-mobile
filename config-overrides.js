const path = require('path');
const { override, addWebpackModuleRule, addWebpackPlugin, addWebpackAlias, overrideDevServer, watchAll } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const {lessRegex , lessModuleRegex , getStyleLoaders , defaultCSSLoaderOption , cssLoaderOptions , lessLoader} = require('./configLess');

module.exports = {
  webpack: override(
    addWebpackModuleRule({
      test: lessRegex,
      exclude: lessModuleRegex,
      use: (getStyleLoaders(
        { ...defaultCSSLoaderOption, ...cssLoaderOptions, modules: false },
        lessLoader,
      ))
    }),

    addWebpackModuleRule({
      test: /\.svg$/,
      loader: '@svgr/webpack',
    }),
    addWebpackModuleRule({
      test: /\.(png|mp3|webp|jpe?g|gif|mp4)/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name][hash:5][ext][query]'
      }
    }),
    
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    process.env.ANALYZER && addWebpackPlugin(new BundleAnalyzerPlugin()),
    (config) => {
      if (process.env.REACT_APP_ENV === 'dev') {
        config.devtool = 'eval-source-map';
      }
      return config
    }
  ),
  devServer: overrideDevServer(watchAll(), (config) => {
    config.client = {
      overlay: false
    }
    return config
  })
};
