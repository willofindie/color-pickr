const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = mode => {
  return {
    mode: 'production',
    entry: 'index.js',
    output: { filename: 'bundle.js', path: path.resolve('./dist') },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          sideEffects: false,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    loose: true,
                  },
                ],
                '@babel/preset-react',
              ],
              plugins: [
                ['@babel/plugin-proposal-class-properties', { loose: true }],
                ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
              ],
            },
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve('./'), 'node_modules'],
      extensions: ['.js', '.jsx'],
      alias: {
        react: path.resolve('./node_modules/react'),
        'react-dom': path.resolve('./node_modules/react-dom'),
        'color-pickr': path.resolve('../dist/index.umd'),
      },
    },
    plugins: [
      new HtmlWebpackPlugin({ template: 'template.html' }),
      new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
        analyzerMode: 'static',
      }),
    ],
    devServer: {
      hot: false,
      disableHostCheck: true,
      contentBase: path.resolve('./'),
      stats: 'errors-only',
    },
    optimization: {
      runtimeChunk: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 10,
        maxInitialRequests: 10,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -5,
          },
        },
      },
    },
  };
};
