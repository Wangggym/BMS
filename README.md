# learn-react
### 这个是一个react全家桶的整体学习
* 核心是对react进行练习，因此前后端项目搭建都采用比较快速搭建方式
***
1. 服务器搭建 
    - 主要采用[json-server](https://github.com/typicode/json-server.git)快速搭建后端服务器，以提供api接口支持 
    - 安装：`npm i json-server -g` 
    - 创建/server
    - 创建/server/db.json并输入json的mock数据
    - 命令行 `json-server db.json -w -p 3000`

2. 客户端搭建
    - [roadhog](https://github.com/sorrycc/roadhog.git)快速切功能强大的react项目搭建工具 
    - 安装：`npm i roadhog -g`
    - 创建/public 放置静态文件（图片等） 创建/public/index.html
    - 创建/src 放置项目代码 创建/src/index.js
    - 依赖安装：`npm i react react-router react-dom -S` (注意：react-router采用3.0.0版本)
    - 分别写入基本内容到index.html与index.js

3. 运行语句
    - `cd server && json-server db.json -w -p 3000`  --打开后端服务器
    - `roadhog server`  --打开前端客户端
    - package.json中简化打开方式   
    - `"scripts": {
        "server": "cd server && json-server db.json -w -p 3000",
        "dev": "roadhog server"
     }`