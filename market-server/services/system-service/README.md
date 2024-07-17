<p align="center">
    <img width="200" src="https://cdn.zhoukaiwen.com/logo.png">
</p>

<p align="center">
	<a href="https://gitee.com/kevin_chou/qdpz-nodejs/stargazers" target="_blank">
		<img src="https://svg.hamm.cn/gitee.svg?type=star&user=kevin_chou&project=qdpz-nodejs"/>
	</a>
	<a href="https://gitee.com/kevin_chou/qdpz-nodejs/members" target="_blank">
		<img src="https://svg.hamm.cn/gitee.svg?type=fork&user=kevin_chou&project=qdpz-nodejs"/>
	</a>
	<img src="https://svg.hamm.cn/badge.svg?key=Platform&value=NodeJS"/>
</p>

<h1 align="center">《前端铺子》· NodeJS后端 </h1>

<div align="center">


<p>基于Nodejs + Nodemon + MySQL 前端铺子后端它来啦~</p>

```
🕙 项目基本保持每日更新，右上随手点个 🌟 Star 关注，这样才有持续下去的动力，谢谢～
```

</div>

</br></br>

### 文档地址
[点击查看详细说明文档，一定要仔细看哦～](http://qdpz.zhoukaiwen.com/)

### 项目说明

1.  项目使用Nodejs + Nodemon + MySQL～
2.  已完成接口 - 16个：
> * 登录	- login（1个接口）
> * 项目管理	- project（7个接口）
> * 文章管理	- blogs（7个接口）
> * 文件上传	- upload(1个接口,基于七牛云)
> * 百度统计Api	- baiduApi(1个接口,调用第三方)
1.  做后端是因为有很多很多小伙伴强烈的需求，索性：辞职做开源！
2.  其他功能还在补充中，如果有其他需求也可以留言给我～
3.  开源的初衷就是为了方便同行的小伙伴，还请各位多支持～ 
4.  本人自知技术还处于底层，还是有很多需要学习的地方！


### 目录说明
```                
├─bin              	// 入口文件夹
│	├─www.js		// 入口文件
│
├─src      			// 业务代码及其他
│	└─config		// 数据库文件夹
│		└─db		// 同上
│	└─controllers	// 接口的相关方法
│		└─blog		// 博客管理的相关方法（举例说明）
│
└─db				// 执行sql语句的封装文件夹
│	└─mysql.js		// sql语句的封装文件
│
├─model       		// 方法成功/失败的统一封装
│	└─responseModel	// 同上
│
├─routes       		// 接口路由管理
│	└─blog			// 同上（举例说明）
│
├─.gitignore		// git忽略文件
├─app.js			// 数据请求等全局处理的封装
├─package-lock.json	// 依赖
├─README.md			// 说明文档

```

### 运行教程
1.  安装依赖 pnpm i 或者 npm i
2.  创建本地数据库，并执行脚本创建数据表，执行文件该目录下 ./qdpz-sql/sdweb.sql
3.  配置数据连接，使用自己的用户名和密码，配置文件在  ./src/config/db.js
4.  启动：pnpm dev 或者 npm run dev


### 部署教程 · 宝塔
1.  安装pm2并Nodejs npm环境
2.  导入SQL文件
3.  导入项目后，npm i安装
4.  修改bin/www.js的端口，修改sec/congif/db.js的数据库名、用户名、密码
5.  在“安全”中，放行你修改的端口
6.  打开pm2管理器，添加项目
7.  设置端口号（状态是绿色播放图标就ok，没有显示端口号的话肯定是项目启动失败了，建议重新走一遍流程）
8.  浏览器输入 ip/域名:端口号 来访问node项目了
9.  傻瓜式部署，按流程来没有任何问题；

### 作者信息

1.  原作者：周凯文 (Kevin)
2.  现作者：eobeans


