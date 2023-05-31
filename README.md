<!-- 参考feedback代码 -->

# location_server

# 拉取代码
`git clone xxx` (在 shell 里运行，后续命令也是)

# 配置环境
1. `node >= 16`
2. `npm >= 8.1.0`
3. 修改 src/config/config.default.ts 文件内 数据库和 redis 相关配置: 将25行config.sequelize中username和password修改为自己数据库的用户名和密码

# 安装依赖
## 安装 cnpm
`npm install -g cnpm@7.1.0`
## 安装依赖
`cnpm install`

# 开发
1. `npm run dev` 启动 server 服务

<!-- # 部署
1.  将代码更新同步到 gitlab 中：`git push origin master`
2.  连接服务器 106.15.170.182 
3.  `cd ～/ydroid-server` 进入项目文件夹
4.  拉取最新代码 `git pull origin master`
5.  `sudo npm stop` 停止旧项目
6.  `sudo npm start` 启动新项目 （如果项目提示端口被占用，可以运行命令 `sudo lsof -i:7001` 检查7001端口是否被占用）


# 数据库备份
+ 服务器 106.15.170.182 设置了定时任务 每周五 10点 10分 运行 ～/bz302_db_auto_backup.sh 脚本文件导出 mysql bz_302 表的数据
+ 之后会 scp 到 47.117.122.40 服务器的 ~/bz302_db 文件夹中 -->


