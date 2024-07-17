// 博客相关方法

const { execSQL } = require('../db/mysql');

// 获取博客列表
const getBlogList = (searchTypeId,searchInput) => {
	let sql = `select * from blogs where 1=1 `;
	if(searchTypeId && searchInput){
		console.log('筛选+搜索')
		sql += `and type like '%${searchTypeId}%' and title like '%${searchInput}%' or content like '%${searchInput}%'`;
	}else if(searchTypeId != ''){
		console.log('筛选')
		sql += `and type like '%${searchTypeId}%'`;
	}else if(searchInput != ''){
		console.log('搜索')
		sql += `and title like '%${searchInput}%' or content like '%${searchInput}%'`;
	}
	return execSQL(sql);
}

// 获取博客详情
const getBlogDetail = (id) => {
	console.log(id)
	const sql = `select * from blogs where id='${id}'`;
	return execSQL(sql).then(rows => {
		console.log('rows', rows);
		// 调用详情后 阅读量+1
		const AddSeeSql =`update blogs set seeNum=seeNum+1 where id='${id}'`;
		return execSQL(AddSeeSql).then(AddSeeSqlRes => {
			console.log('AddSeeSqlRes', AddSeeSqlRes);
			return rows[0];
		});
	});
}

// 创建博客
const createNewBlog = (token, blogData) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0] && blogData.title != ''){
			const type = blogData.type;
			const title = blogData.title;
			const img = blogData.img;
			const content = blogData.content;
			const author = blogData.author;
			const createdAt = Date.now();
			const imgList = blogData.imgList;
			
			const sql = `
				insert into blogs (type, title, img, content, author, imgList, createdAt) values ('${type}', '${title}', '${img}', '${content}', '${author}', '${imgList}', ${createdAt})
			`
			return execSQL(sql).then(insertedResult => {
				console.log('insertedResult', insertedResult);
				return {
					id: insertedResult.insertId
				};
			});
		}else{
			return false;
		}
	});	
}


// 修改博客
const updateBlog = (token, blogData = {}) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const id = blogData.id;
			const type = blogData.type;
			const title = blogData.title;
			const img = blogData.img;
			const author = blogData.author;
			const content = blogData.content;
			const createdAt = Date.now();
			const imgList = blogData.imgList;
			const sql = `update blogs set type='${type}', title='${title}', img='${img}', author='${author}', content='${content}', createdAt='${createdAt}', imgList='${imgList}' where id=${id};`;
			return execSQL(sql).then(updateResult => {
				console.log('updateResult', updateResult);
				if(updateResult.affectedRows > 0){
					return true;
				}
				return false;
			});
		}else{
			return false;
		}
	});
}

// 删除博客
const deleteBlog = (token,blogData) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const id = blogData.id;
			const sql = `delete from blogs where id=${id};`;
			return execSQL(sql).then(deleteResult => {
				console.log('deleteResult', deleteResult);
				if(deleteResult.affectedRows > 0){
					return true;
				}
				return false;
			});
		}else{
			return false;
		}
	});
}

// 点赞博客
const likeBlog = (id) => {
	console.log(id)
	const likeBlogSql =`update blogs set likesNum=likesNum+1 where id='${id}'`;
	return execSQL(likeBlogSql).then(likeBlogSqlRes => {
		console.log('likeBlogSqlRes', likeBlogSqlRes);
		if(likeBlogSqlRes.affectedRows > 0){
			return true;
		}
		return false;
	});
}

// 分享博客
const shareBlog = (id) => {
	console.log(id)
	const shareBlogSql =`update blogs set commentNum=commentNum+1 where id='${id}'`;
	return execSQL(shareBlogSql).then(shareBlogSqlRes => {
		console.log('shareBlogSqlRes', shareBlogSqlRes);
		if(shareBlogSqlRes.affectedRows > 0){
			return true;
		}
		return false;
	});
}


module.exports = {
	getBlogList,
	getBlogDetail,
	createNewBlog,
	updateBlog,
	deleteBlog,
	likeBlog,
	shareBlog
}