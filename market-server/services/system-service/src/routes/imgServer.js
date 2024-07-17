const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");
const {
	getImgList,
	createNewImgScore,
	saveOrUpdataImgAverageScore
} = require('../controllers/imgServer');

// 处理项目相关路由
const handleImgServerRoute = (req, res) => {
	// 定义处理路由的逻辑
	const method = req.method;
	const bodyData = req.body;

	// 项目列表
	if (method === 'GET' && req.path === '/api/imgServer/list') {
    const search = req.query.search || '';
		const listDataPromise = getImgList(search);
		return listDataPromise.then((listData) =>{
			return new SuccessModel(listData);
		});
	}

	// 新建项目
	if (method === 'POST' && req.path === '/api/imgServer/newAdd') {
    console.log('bodyData', bodyData)
    if (Object.keys(bodyData).length == 0) {
      return new ErrorModel("filename|score|username 不能为空")
    }
		const newPromise = createNewImgScore(bodyData);
		return newPromise.then(data =>{
			return new SuccessModel(data);
		});
	}

	// 更新平均分
	if (method === 'POST' && req.path === '/api/imgServer/average') {
		const newPromise = saveOrUpdataImgAverageScore();
		return newPromise.then(data =>{
			return new SuccessModel(data);
		});
	}
}

module.exports = handleImgServerRoute;
