import CopyWebpackPlugin from "copy-webpack-plugin";
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

const publicPath = isProduction
  ? process.env.PUBLIC_PATH || "/"
  : "http://localhost:3000/";

const getRemoteUrl = (appName, defaultPort) => {
  if (isProduction) {
    const envVar = process.env[`${appName.toUpperCase()}_URL`];
    if (envVar) return envVar;
    return `https://${appName}-mf.netlify.app`;
  }
  return `http://localhost:${defaultPort}`;
};

export default {
  entry: "./src/index.tsx",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "eval-source-map",
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
      __AUTH_URL__: JSON.stringify(getRemoteUrl("auth", 3003)),
      __DASHBOARD_URL__: JSON.stringify(getRemoteUrl("dashboard", 3001)),
      __USERS_URL__: JSON.stringify(getRemoteUrl("users", 3002)),
    }),
    new Dotenv(),
    new ModuleFederationPlugin({
      name: "shell",
      filename: "remoteEntry.js",
      remotes: {
        auth: `auth@${getRemoteUrl("auth", 3003)}/remoteEntry.js`,
        dashboard: `dashboard@${getRemoteUrl("dashboard", 3001)}/remoteEntry.js`,
        users: `users@${getRemoteUrl("users", 3002)}/remoteEntry.js`,
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
    ...(isProduction
      ? [
          new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "public/_headers"),
                to: path.resolve(__dirname, "dist/_headers"),
              },
            ],
          }),
        ]
      : []),
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
