# How to Deploy sbercoininfo

sbercoininfo is splitted into 3 repos:
* [https://github.com/Sbercoin.com-SBER/sbercoininfo](https://github.com/Sbercoin.com-SBER/sbercoininfo)
* [https://github.com/Sbercoin.com-SBER/sbercoininfo-api](https://github.com/Sbercoin.com-SBER/sbercoininfo-api)
* [https://github.com/Sbercoin.com-SBER/sbercoininfo-ui](https://github.com/Sbercoin.com-SBER/sbercoininfo-ui)

## Prerequisites

* node.js v12.0+
* mysql v8.0+
* redis v5.0+

## Deploy sbercoin core
1. `git clone --recursive https://github.com/Sbercoin.com-SBER/sbercoinchain-core.git --branch=sbercoininfo`
2. Follow the instructions of [https://github.com/Sbercoin.com-SBER/sbercoinchain-core/blob/master/README.md#building-sbercoin-core](https://github.com/Sbercoin.com-SBER/sbercoinchain-core/blob/master/README.md#building-sbercoin-core) to build sbercoin
3. Run `sbercoind` with `-logevents=1` enabled

## Deploy sbercoininfo
1. `git clone https://github.com/Sbercoin.com-SBER/sbercoininfo.git`
2. `cd sbercoininfo && npm install`
3. Create a mysql database and import [docs/structure.sql](structure.sql)
4. Edit file `sbercoininfo-node.json` and change the configurations if needed.
5. `npm run dev`

It is strongly recommended to run `sbercoininfo` under a process manager (like `pm2`), to restart the process when `sbercoininfo` crashes.

## Deploy sbercoininfo-api
1. `git clone https://github.com/Sbercoin.com-SBER/sbercoininfo-api.git`
2. `cd sbercoininfo-api && npm install`
3. Create file `config/config.prod.js`, write your configurations into `config/config.prod.js` such as:
    ```javascript
    exports.security = {
        domainWhiteList: ['http://example.com']  // CORS whitelist sites
    }
    // or
    exports.cors = {
        origin: '*'  // Access-Control-Allow-Origin: *
    }

    exports.sequelize = {
        logging: false  // disable sql logging
    }
    ```
    This will override corresponding field in `config/config.default.js` while running.
4. `npm start`

## Deploy sbercoininfo-ui
This repo is optional, you may not deploy it if you don't need UI.
1. `git clone https://github.com/Sbercoin.com-SBER/sbercoininfo-ui.git`
2. `cd sbercoininfo-ui && npm install`
3. Edit `package.json` for example:
   * Edit `script.build` to `"build": "SBERINFO_API_BASE_CLIENT=/api/ SBERINFO_API_BASE_SERVER=http://localhost:7001/ SBERINFO_API_BASE_WS=//example.com/ nuxt build"` in `package.json` to set the api URL base
   * Edit `script.start` to `"start": "PORT=3000 nuxt start"` to run `sbercoininfo-ui` on port 3000
4. Edit nuxt.config.js if needed. For example, add your keys for google-analytics and/or yandex-metrika modules.
5. `npm run build`
6. `npm start`
