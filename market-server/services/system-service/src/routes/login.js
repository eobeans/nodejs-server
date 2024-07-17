// 定义登录路由接口
const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");

const { loginFun, userInfoFun } = require('../controllers/login');

const handleLoginRoute = (req, res) => {
	const method = req.method;
	const loginData = req.body;
	// 后台登录
	if (method === 'POST' && req.path === '/system/login') {
		const username =  loginData.username || '';
		const password = loginData.password || '';
		const loginPromise = loginFun(username, password);
		return loginPromise.then(loginData =>{
			if(loginData){
				return new SuccessModel(loginData);
			}else{
				return new ErrorModel('登录失败...');
			}
		});
	}

	// 获取用户信息
	if (method === 'GET' && req.path === '/system/info') {
		console.log("Authorization", req.headers.authorization)
		const token =  req.headers.authorization ? req.headers.authorization.replace("Bearer ", "") : ""
		const sqlPromise = userInfoFun(token);
		return sqlPromise.then(loginData =>{
			if(loginData){
				const userInfo = {
					username: loginData.username,
					roles: ['admin']
				}
				return new SuccessModel(userInfo);
			}else{
				return new ErrorModel('获取用户信息...');
			}
		});
	}
}

module.exports = handleLoginRoute;
