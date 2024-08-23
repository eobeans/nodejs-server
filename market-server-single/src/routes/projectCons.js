const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");
const {
	getProjectList,
	createNewProject,
	updateProjectCons,
	deleteProject
} = require('../controllers/projectCons');

// 处理项目相关路由
const handleProjectConsRoute = (req, res) => {
	// 定义处理路由的逻辑
	const method = req.method;
	const projectData = req.body;
	const token = req.headers.token;//post请求头部token

	// 项目列表
	if (method === 'GET' && req.path === '/api/projectCons/list') {
		const search = req.query.search || '';
		const listDataPromise = getProjectList(token, search);
		return listDataPromise.then((listData) =>{
			return new SuccessModel(listData);
		});
	}
	// 新建项目
	if (method === 'POST' && req.path === '/api/projectCons/new') {
		const newProjectDataPromise = createNewProject(projectData);
		return newProjectDataPromise.then(newProjectData =>{
			return new SuccessModel(newProjectData);
		});
	}
	
	// 修改项目
	if (method === 'POST' && req.path === '/api/projectCons/update') {
		const updatedProjectDataPromise = updateProjectCons(token, projectData);
		return updatedProjectDataPromise.then(updatedProjectData =>{
			if(updatedProjectData){
				return new SuccessModel('项目修改成功！');
			}else{
				return new ErrorModel('项目修改失败...');
			}
		});
	}
	
	// 删除项目
	if (method === 'POST' && req.path === '/api/projectCons/delete') {
		const deleteProjectDataPromise = deleteProject(token, projectData);
		return deleteProjectDataPromise.then(deleteProjectData =>{
			if(deleteProjectData){
				return new SuccessModel('删除项目成功！')
			}else{
				return new ErrorModel('删除项目失败.. .')
			}
		});
	}
}

module.exports = handleProjectConsRoute;
