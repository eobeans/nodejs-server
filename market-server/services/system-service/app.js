const { rejects } = require('assert');
const { log } = require('console');
const { resolve } = require('path');

// 接口路由
const handleBlogRoute = require('./src/routes/blog');
const handleLoginRoute = require('./src/routes/login');
const handleProjectRoute = require('./src/routes/project');
const handleProjectConsRoute = require('./src/routes/projectCons');
const handleUploadRoute = require('./src/routes/upload');
const handleBaiduApiRoute = require('./src/routes/baiduApi');
const handleImgServerRoute = require('./src/routes/imgServer');


// 处理post数据
const getPostData = (req) =>{
	// 使用promise异步处理post请求（数据用户发送后，拿到再处理）
	const promise = new Promise((resolve, rejects) => {
		// 如果用户不是post请求方式，resolve空，return
		if(req.method !== 'POST'){
			resolve({});
			return;
		}
		// 如果用户不是json格式，resolve空，return
		if(req.headers['content-type'] !== 'application/json'){
			resolve({});
			return;
		}
		// 正常走
		let postData = '';
		req.on('data',(chunk) => {
			postData += chunk.toString();
		});
		req.on('end',() => {
			if(!postData) {
				resolve({});
				return;
			}
			resolve(
				JSON.parse(postData)
			);
		});
	});
	return promise;
};

// 服务器处理程序
const serverHandler = (req, res) => {
	// 设置相应格式，解决返回数据乱码问题
	res.setHeader('Content-Type', 'application/json;charset=utf-8');
	
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.setHeader("Access-Control-Allow-Origin","*");
	
	//允许的header类型
	res.setHeader("Access-Control-Allow-Headers","content-type");
	
	//跨域允许的请求方式 
	res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
	
	// 获取 path
	// 返回示例:req.path = /api/blog/detail
	// 返回示例:req.query = [Object: null prototype] { id: '2' } || {}
	const url = require('url');
	const method = req.method;
	var queryParse = url.parse(req.url, true);
	if(req.url.includes("?")) {
		// console.log('请求地址"?"有拼接:',queryParse);
		req.path = queryParse.pathname;
		req.query = queryParse.query;
	} else {
		req.path = queryParse.pathname;
		req.query = queryParse.query;
		// console.log('请求地址"?"后没有拼接！', queryParse);
	}
	
	
	// 处理 POST 数据
	getPostData(req).then((postData) => {
		req.body = postData;

		// 图片评分相关的路由
		const imgServerPromise = handleImgServerRoute(req, res);
		if (imgServerPromise) {
			imgServerPromise.then(resData => {
				res.end(JSON.stringify(resData));
			});
			return;
		}

		// 博客相关的路由
		const blogDataPromise = handleBlogRoute(req, res);
		if (blogDataPromise) {
			blogDataPromise.then(blogData => {
				res.end(JSON.stringify(blogData));
			});
			return;
		}
		
		// 登录相关的路由
		const loginPromise = handleLoginRoute(req, res);
		if (loginPromise) {
			loginPromise.then(loginData => {
				res.end(JSON.stringify(loginData));
			});
			return;
		}
		
		// 项目展示相关的路由
		const projectPromise = handleProjectRoute(req, res);
		if (projectPromise) {
			projectPromise.then(projectData => {
				res.end(JSON.stringify(projectData));
			});
			return;
		}
		
		// 寄售项目展示相关的路由
		const projectConsPromise = handleProjectConsRoute(req, res);
		if (projectConsPromise) {
			projectConsPromise.then(projectConsData => {
				res.end(JSON.stringify(projectConsData));
			});
			return;
		}
		
		// 七牛云上传相关的路由
		const uploadPromise = handleUploadRoute(req, res);
		if (uploadPromise) {
			uploadPromise.then(uploadData => {
				res.end(JSON.stringify(uploadData));
			});
			return;
		}
		
		// 百度统计路由
		const baiduApiPromise = handleBaiduApiRoute(req, res);
		if (baiduApiPromise) {
			baiduApiPromise.then(baiduApiData => {
				res.end(JSON.stringify(baiduApiData));
			});
			return;
		}
		
		// 未匹配到任何路由
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.write('404 Not Found');
		res.end();
	})
}

module.exports = serverHandler;