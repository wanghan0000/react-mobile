const paths = require('react-scripts/config/paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const lessLoaderOptions = {};
const cssLoaderOptions = {};
const lessRegex = /\.less$/;
const webpackEnv = process.env.NODE_ENV;
const isEnvDevelopment = webpackEnv === 'development';
const isEnvProduction = webpackEnv === 'production';
const shouldUseSourceMap = isEnvProduction
    ? process.env.GENERATE_SOURCEMAP !== 'false'
    : isEnvDevelopment;


    const postcssPxToRem = require('postcss-pxtorem')({
        rootValue: 37.5,
        propList: ['*'],
        // 其他可能的配置
      });
      
      // 在 postcssPlugins 数组中
    //   const postcssPlugins = [
    //     // 已有的插件...
    //     postcssPxToRem,
    //   ];

const getStyleLoaders = (cssOptions, preProcessor) => {
    const postcssPlugins = [
        'postcss-flexbugs-fixes',
        [
            'postcss-preset-env',
            {
                autoprefixer: {
                    flexbox: 'no-2009',
                },
                stage: 3,
            },
        ],
        postcssPxToRem
    ];
    postcssPlugins.push('postcss-normalize');
    //postcssPlugins.push(postcssPxToRem);
    const loaders = [
        isEnvDevelopment && require.resolve('style-loader'),
        isEnvProduction && {
            loader: MiniCssExtractPlugin.loader,
            options: paths.publicUrlOrPath.startsWith('.')
                ? { publicPath: '../../' }
                : {},
        },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                postcssOptions: {
                    ident: 'postcss',
                    config: false,
                    plugins: postcssPlugins,
                },
                sourceMap: shouldUseSourceMap,
            },
        }
    ].filter(Boolean);

    if (preProcessor) {
        loaders.push(preProcessor);
    }

    //公告less引入
    // loaders.push({
    //     loader: 'style-resources-loader',
    //     options: ({
    //         patterns: [path.resolve(__dirname, './src/style/variables.less')]
    //     })
    // })

    return loaders;
};

const defaultCSSLoaderOption = {
    importLoaders: 2,
    sourceMap: shouldUseSourceMap,
};

const lessLoader = {
    loader: require.resolve('less-loader'),
    // not the same as react-scripts
    options: {
        sourceMap: shouldUseSourceMap,
        ...lessLoaderOptions,
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                '@base-font-size': 37.5,
                '@use-css-vars': 1,
            },
            rewriteUrls: 'local', // https://github.com/bholloway/resolve-url-loader/issues/200#issuecomment-999545339
            ...(lessLoaderOptions.lessOptions || {}),
        },
    },
};


module.exports = {
    defaultCSSLoaderOption,
    lessLoader,
    getStyleLoaders,
    lessRegex,
    cssLoaderOptions
}