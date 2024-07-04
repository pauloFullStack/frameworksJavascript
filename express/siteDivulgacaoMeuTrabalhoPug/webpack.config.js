const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // aqui modo 'development' sera construido um arquivo normal, caso seja 'production' sera criado arquiv min.js minificado
  mode: "production",
  // entry aponta para o arquivo sera convertido o js
  entry: "./src/js/index.js",
  // aqui o caminho e o nome do arquivo que sera criado apos a conversão do js modulo
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "script.js",
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          miniCssExtractPlugin.loader, // Injeta o CSS no DOM e minifica
          "css-loader", // Carrega os arquivos CSS
          "sass-loader", // Compila os arquivos Sass para CSS
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // o babel converte condigo atual javascript para um javascript padrão onde quase todos os navegadores entende
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    //   new htmlWebpackPlugin({
    //       title: 'Projeto Padrão',
    //       // Sera criado um arquivo index.html dentro da pasta 'dist'
    //       filename: 'index.html',
    //       // Esse é o local onde sera buscado o arquivo para gerar o html la em 'dist'
    //       template: './src/template.html'
    //   })
    new miniCssExtractPlugin({
      filename: "../css/style.css"
    }),
  ],
  watch: true,
};
