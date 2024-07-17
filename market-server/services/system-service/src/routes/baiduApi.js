// 百度开放平台对接接口路由
const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");

const { baiduApiFun } = require('../controllers/baiduApi');

const handleBaiduApiRoute = (req, res) => {
	const method = req.method;
	// 百度统计开放接口
	if (method === 'GET' && req.path === '/api/baiduApi') {
		const baiduApiPromise = baiduApiFun();
		return baiduApiPromise.then(baiduApiData =>{
			if(baiduApiData){
				return new SuccessModel(baiduApiData);
			}else{
				return new ErrorModel('获取成功！');
			}
		});
	}
}

module.exports = handleBaiduApiRoute;