const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");
const {
	getProjectList,
	getProjectDataDetail,
	createNewProject,
	updateProject,
	deleteProject,
	likeProject,
	shareProject,
	getVipProList
} = require('../controllers/project');

// 处理项目相关路由
const handleProjectRoute = (req, res) => {
	// 定义处理路由的逻辑
	const method = req.method;
	const projectData = req.body;
	const token = req.headers.token;//post请求头部token
	const projectDataId = req.body.id; //post请求url不能传参要获取body下的id

	// 项目列表
	if (method === 'GET' && req.path === '/api/project/list') {
		const search = req.query.search || '';
		const listDataPromise = getProjectList(search);
		return listDataPromise.then((listData) =>{
			return new SuccessModel(listData);
		});
	}
	
	// 项目详情
	if (method === 'GET' && req.path === '/api/project/detail') {
		const detailDataPromise = getProjectDataDetail(req.query.id);
		return detailDataPromise.then(detailData =>{
			return new SuccessModel(detailData);
		});
	}
	
	// 新建项目
	if (method === 'POST' && req.path === '/api/project/new') {
		const newProjectDataPromise = createNewProject(token, projectData);
		return newProjectDataPromise.then(newProjectData =>{
			return new SuccessModel(newProjectData);
		});
	}
	
	// 修改项目
	if (method === 'POST' && req.path === '/api/project/update') {
		const updatedProjectDataPromise = updateProject(token, projectDataId, projectData);
		return updatedProjectDataPromise.then(updatedProjectData =>{
			if(updatedProjectData){
				return new SuccessModel('项目修改成功！');
			}else{
				return new ErrorModel('项目修改失败...');
			}
		});
	}
	
	// 删除项目
	if (method === 'POST' && req.path === '/api/project/delete') {
		const deleteProjectDataPromise = deleteProject(token, projectDataId);
		return deleteProjectDataPromise.then(deleteProjectData =>{
			if(deleteProjectData){
				return new SuccessModel('删除项目成功！')
			}else{
				return new ErrorModel('删除项目失败.. .')
			}
		});
	}
	
	// 点赞项目
	if (method === 'GET' && req.path === '/api/project/like') {
		const likeProjectDataPromise = likeProject(req.query.id);
		return likeProjectDataPromise.then(likeProjectData =>{
			if(likeProjectData){
				return new SuccessModel('项目点赞成功！')
			}else{
				return new ErrorModel('项目点赞失败.. .')
			}
		});
	}
	
	// 分享项目
	if (method === 'GET' && req.path === '/api/project/share') {
		const shareProjectDataPromise = shareProject(req.query.id);
		return shareProjectDataPromise.then(shareProjectData =>{
			if(shareProjectData){
				return new SuccessModel('项目分享成功！')
			}else{
				return new ErrorModel('项目分享失败.. .')
			}
		});
	}
	
	// 会员项目列表
	if (method === 'GET' && req.path === '/api/vipProList/list') {
		const listDataPromise = getVipProList();
		return listDataPromise.then((listData) =>{
			return new SuccessModel(listData);
		});
	}
}

module.exports = handleProjectRoute;
