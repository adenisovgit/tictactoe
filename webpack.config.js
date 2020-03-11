// @ts-check

const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = () => {
  const config = {
    mode: 'development',
    entry: [
      `${__dirname}/src/front/index.js`,
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: `${__dirname}/front`,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: [
            /node_modules/,
          ],
        },
        {
          test: /\.html/,
          loader: 'raw-loader',
        },
        {
          test: /\.(sass|scss|css)$/,
          use: [{
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          }],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `${__dirname}/src/front/assets/index.html`,
      }),
    ],

  };

  return config;
};
