const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const path = require('path');

// 依赖分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = override(
  // 添加Webpack别名
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src')
  }),

  // 添加依赖分析
  process.env.ANALYZER && addWebpackPlugin(new BundleAnalyzerPlugin())
);