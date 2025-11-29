import Dotenv from "dotenv-webpack";
import { readFileSync } from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import webpack from "webpack";
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
const AUTH_URL = process.env.AUTH_URL || "http://localhost:3003";
const DASHBOARD_URL = process.env.DASHBOARD_URL || "http://localhost:3001";
const USERS_URL = process.env.USERS_URL || "http://localhost:3002";

const publicPath = isProduction ? PUBLIC_PATH : "http://localhost:3000/";

const remotes = {
  auth: `auth@${AUTH_URL}/remoteEntry.js`,
  dashboard: `dashboard@${DASHBOARD_URL}/remoteEntry.js`,
  users: `users@${USERS_URL}/remoteEntry.js`,
};

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
    new webpack.DefinePlugin({
      __API_BASE_URL__: JSON.stringify(
        process.env.API_BASE_URL || "http://localhost:8080"
      ),
      __AUTH_URL__: JSON.stringify(remotes.auth),
      __DASHBOARD_URL__: JSON.stringify(remotes.dashboard),
      __USERS_URL__: JSON.stringify(remotes.users),
    }),
    new Dotenv(),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes,
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
        zustand: {
          singleton: true,
          requiredVersion: deps.zustand,
          eager: false,
        },
        "@repo/ui": {
          singleton: true,
          requiredVersion: deps["@repo/ui"],
          eager: false,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    ...(process.env.ANALYZE ? [new BundleAnalyzerPlugin()] : []),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: false,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};
