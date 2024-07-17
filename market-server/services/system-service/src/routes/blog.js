const {
	SuccessModel,
	ErrorModel
} = require("../model/responseModel");
const {
	getBlogList,
	getBlogDetail,
	createNewBlog,
	updateBlog,
	deleteBlog,
	likeBlog,
	shareBlog
} = require('../controllers/blog');

// 处理博客相关路由
const handleBlogRoute = (req, res) => {
	// 定义处理路由的逻辑
	const method = req.method;
	const blogData = req.body;
	const token =  req.headers.token;//post请求头部token

	// 博客列表
	if (method === 'GET' && req.path === '/api/blog/list') {
		const searchTypeId = req.query.searchTypeId || '';
		const searchInput = req.query.searchInput || '';
		const listDataPromise = getBlogList(searchTypeId,searchInput);
		return listDataPromise.then((listData) =>{
			return new SuccessModel(listData);
		});
	}
	// 博客详情
	if (method === 'GET' && req.path === '/api/blog/detail') {
		const detailDataPromise = getBlogDetail(req.query.id);
		return detailDataPromise.then(detailData =>{
			return new SuccessModel(detailData);
		});
	}
	// 新建博客
	if (method === 'POST' && req.path === '/api/blog/new') {
		const author = 'kevin'
		req.body.author = author;
		const newBlogDataPromise = createNewBlog(token, blogData);
		return newBlogDataPromise.then(newBlogData =>{
			return new SuccessModel(newBlogData);
		});
	}
	
	// 修改博客
	if (method === 'POST' && req.path === '/api/blog/update') {
		const updatedBlogDataPromise = updateBlog(token, blogData);
		return updatedBlogDataPromise.then(updatedBlogData =>{
			if(updatedBlogData){
				return new SuccessModel('修改博客成功！');
			}else{
				return new ErrorModel('修改博客失败...');
			}
		});
	}
	// 删除博客
	if (method === 'POST' && req.path === '/api/blog/delete') {
		const deleteBlogDataPromise = deleteBlog(token, blogData);
		return deleteBlogDataPromise.then(deleteBlogData =>{
			if(deleteBlogData){
				return new SuccessModel('删除博客成功！')
			}else{
				return new ErrorModel('删除博客失败.. .')
			}
		});
	}
	
	// 点赞博客
	if (method === 'GET' && req.path === '/api/blog/like') {
		const likeBlogDataPromise = likeBlog(req.query.id);
		return likeBlogDataPromise.then(likeBlogData =>{
			if(likeBlogData){
				return new SuccessModel('点赞成功！')
			}else{
				return new ErrorModel('点赞失败.. .')
			}
		});
	}
	
	// 分享博客
	if (method === 'GET' && req.path === '/api/blog/share') {
		const shareBlogDataPromise = shareBlog(req.query.id);
		return shareBlogDataPromise.then(shareBlogData =>{
			if(shareBlogData){
				return new SuccessModel('分享成功！')
			}else{
				return new ErrorModel('分享失败.. .')
			}
		});
	}
	
}

module.exports = handleBlogRoute;
