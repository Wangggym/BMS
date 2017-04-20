# learn-react
### 这个是一个react全家桶的整体学习
* 核心是对react进行练习，因此前后端项目搭建都采用比较快速搭建方式
***
>第一部分 搭建基本app
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
***
>第二部分 router路由搭建，form表单创建，form表单验证及高阶函数
1. router路由搭建
    - 创建/src/pages 创建/src/pages/Home.js 创建/src/pages/UserAdd.js
    - 写入基本代码
2. form表单验证
    * 用户姓名不能超过5个字符串且不能为空字符串
    * 用户年龄在1到120之间
    * 用户必须选择性别
    * 思路在用户onchange时进行验证传入参数`(fields,value)`,进行字段验证
3. form高阶函数
    - 充分利用react,数据驱动思想,form只提供给用户填写,显示内容作用。
    - 至于form表单验证,form表单表单提交则交给专业组件来做,
    - component只接受数据props,已经返回回调方法及参数 
***
>第三部分 
1. 创建userList显示数据库数据
    - 在componentWillMount或者componentDidMount时,发起数据请求。将请求来的数据放置在state中，如下：
    ```javascript
    ...
    constructor(props) {
        super(props)
        this.state = {
            userList: false
        }
    }
    componentDidMount() {
        fetch('http://localhost:3000/user')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                })
            })
    }
    //数据map方法生成
    ...
    {userList.map((user,index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                ...
            </tr>
        )
    })}
    ```

