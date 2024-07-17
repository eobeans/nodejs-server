// 定义文件上传路由接口
const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");

const { uploadFun } = require('../controllers/upload');

const handleUploadRoute = (req, res) => {
	const method = req.method;
	const token = req.headers.token;//post请求头部token
	// 后台登录
	if (method === 'POST' && req.path === '/api/upload') {
		const uploadPromise = uploadFun(token);
		return uploadPromise.then(uploadData =>{
			if(uploadData){
				return new SuccessModel(uploadData);
			}else{
				return new ErrorModel('上传失败...');
			}
		});
	}
}

module.exports = handleUploadRoute;
