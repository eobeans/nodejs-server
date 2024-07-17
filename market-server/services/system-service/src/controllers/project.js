// 项目相关方法

const { execSQL } = require('../db/mysql');

// 获取项目列表
const getProjectList = (search) => {
	let sql = `select * from project where 1=1 `;
	if(search){
		sql += `and title like '%${search}%' or content like '%${search}%'`;
	};
	return execSQL(sql);
}

// 获取项目详情
const getProjectDataDetail = (id) => {
	console.log(id)
	const sql = `select * from project where id='${id}'`;
	return execSQL(sql).then(rows => {
		console.log('rows', rows);
		// 调用详情后 阅读量+1
		const AddSeeSql =`update project set seeNum=seeNum+1 where id='${id}'`;
		return execSQL(AddSeeSql).then(AddSeeSqlRes => {
			console.log('AddSeeSqlRes', AddSeeSqlRes);
			return rows[0];
		});
	});
}

// 创建项目
const createNewProject = (token, projectData) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const type = projectData.type;
			const title = projectData.title;
			const img = projectData.img;
			const content = projectData.content;
			const author = projectData.author;
			const createdAt = Date.now();
			const imgList = projectData.imgList;
			const sql = `
				insert into project (type, title, img, content, author, imgList, createdAt) values ('${type}', '${title}', '${img}', '${content}', '${author}', '${imgList}', ${createdAt})
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

// 修改项目
const updateProject = (token, id, projectData = {}) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const type = projectData.type;
			const title = projectData.title;
			const img = projectData.img;
			const author = projectData.author;
			const content = projectData.content;
			const createdAt = Date.now();
			const imgList = projectData.imgList;
			const sql = `update project set type='${type}', title='${title}', img='${img}', author='${author}', content='${content}', createdAt='${createdAt}', imgList='${imgList}' where id=${id};`;
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

// 删除项目
const deleteProject = (token, id) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const sql = `delete from project where id=${id};`;
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

// 点赞项目
const likeProject = (id) => {
	// console.log(id)
	const likeProjectSql =`update project set likesNum=likesNum+1 where id='${id}'`;
	return execSQL(likeProjectSql).then(likeProjectSqlRes => {
		console.log('likeProjectSqlRes', likeProjectSqlRes);
		if(likeProjectSqlRes.affectedRows > 0){
			return true;
		}
		return false;
	});
}

// 分享项目
const shareProject = (id) => {
	// console.log(id)
	const shareProjectSql =`update project set commentNum=commentNum+1 where id='${id}'`;
	return execSQL(shareProjectSql).then(shareProjectSqlRes => {
		console.log('shareProjectSqlRes', shareProjectSqlRes);
		if(shareProjectSqlRes.affectedRows > 0){
			return true;
		}
		return false;
	});
}

// 获取会员项目列表
const getVipProList = () => {
	let sql = `select * from viplist where 1=1 order by zindex asc`;
	return execSQL(sql);
}


module.exports = {
	getProjectList,
	getProjectDataDetail,
	createNewProject,
	updateProject,
	deleteProject,
	likeProject,
	shareProject,
	getVipProList
}