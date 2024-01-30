import { EggAppConfig, EggAppInfo, PowerPartial } from "midway";
const path = require("path");
// const fs = require("fs");
export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1589696235680_2533";

  // add your config here
  config.middleware = [];

  // config.redis = {
  //   client: {
  //     port: 6379,
  //     host: "127.0.0.1",
  //     // password: null,
  //     password: "aplus@2020",
  //     db: 0,
  //   },
  // };

  config.sequelize = {
    dialect: "mysql",
    database: "locationTap",
    host: "127.0.0.1",
    port: "3306",
    username: "root",
    password: "curidemo",
    // password: "52KangChun",
    timezone: "+08:00",
  };

  config.view = {
    mapping: {
      ".ejs": "ejs",
    },
    defaultViewEngine: "ejs",
    defaultExtension: ".ejs",
  };

  // 静态资源重定向，如前端请求 http://127.0.0.1:7001/static/images/logo.png 自动重定向到public/static/images/logo.png
  config.static = {
    // 静态化访问前缀,如：`http://127.0.0.1:7001/static/images/logo.png`
    prefix: "/",
    dir: [
      path.join(appInfo.HOME, 'ydroid-files'),
      path.join(appInfo.baseDir, "app/public"),
      path.join(appInfo.baseDir, "app/public/lab-web"),
      path.join(appInfo.baseDir, "app/public/lab-manage-web"),
    ], // `String` or `Array:[dir1, dir2, ...]` 静态化目录,可以设置多个静态化目录
    maxAge: 31536000, // in prod env, 0 in other envs
  };

  config.multipart = {
    mode: "file",
  };

  config.cors = {
    credentials: true,
    origin:'http://localhost:3000',
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };
  // config.siteFile = {
  //   "/favicon.ico": fs.readFileSync("fdu-logo.png"),
  // };

  config.sessionRedis = {
    key: "APLUS_ID",
    maxAge: 72 * 3600 * 1000,
    httpOnly: true,
    encrypt: false,
  };
  config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ["*"],
  };

  config.logger = {
    consoleLevel: "DEBUG",
  };

// <<<<<<< HEAD
//   config.sequelize = {
//     dialect: "mysql",
//     database: "bz302",
//     host: "127.0.0.1",
//     port: "3306",
//     username: "root",
//     password: "52KangChun",
//     timezone: "+08:00",
//   };
// =======
// >>>>>>> 10c9ecc8d14fe401c868255e2bdfaf50019bdae3

  return config;
};
