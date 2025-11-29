import { readFileSync } from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ModuleFederationPlugin from "webpack/lib/container/ModuleFederationPlugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
);

const deps = packageJson.dependencies;
const isProduction = process.env.NODE_ENV === "production";

const PUBLIC_PATH = process.env.PUBLIC_PATH || "";

const publicPath = isProduction ? PUBLIC_PATH : "http://localhost:3001/";

export default {
  entry: "./src/index.tsx",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "eval-source-map",
  optimization: {
    runtimeChunk: false,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: isProduction
      ? "[name].[contenthash].chunk.js"
      : "[name].chunk.js",
    clean: true,
    publicPath: publicPath,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.mjs"),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css",
            chunkFilename: "styles.[contenthash].chunk.css",
          }),
        ]
      : []),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "dashboard",
      filename: "remoteEntry.js",
      exposes: {
        "./Dashboard": "./src/App.tsx",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
          eager: false,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
          eager: false,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: deps["react-router-dom"],
          eager: false,
        },
        "@repo/ui": {
          singleton: true,
          requiredVersion: deps["@repo/ui"],
          eager: false,
        },
      },
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  devServer: {
    port: 3001,
    hot: true,
    open: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
