import { resolve as _resolve } from 'path';
import HtmlWebPackPlugin from "html-webpack-plugin";
import webpack from 'webpack';
import { fileURLToPath } from 'url';
import path from 'path';


const config = (env, argv) => {

  const { mode } = argv
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const additionalPlugins = mode === 'production'
    ? []
    : [new webpack.HotModuleReplacementPlugin()] // Enable hot module replacement

  const additionalEntries = mode === 'production' ? [] : ['webpack-hot-middleware/client?http://localhost:8000']
  return {
    mode,
    entry: [
      './client/src/index.js',
      ...additionalEntries
    ],
    resolve: {
      alias: {
        Components: _resolve(__dirname, 'client/src/components'),
        Context: _resolve(__dirname, 'client/src/context'),
        Pages: _resolve(__dirname, 'client/src/pages'),
        Modals: _resolve(__dirname, 'client/src/modals'),
        '@root': _resolve(__dirname)
      },

    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false
          },
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.BUILT_AT': JSON.stringify(new Date().toISOString()),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new HtmlWebPackPlugin({
        template: "./client/public/index.html",
        filename: "./index.html",
      }),
      ...additionalPlugins
    ],
  }
}

export default config