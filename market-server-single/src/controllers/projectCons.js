// 寄售项目相关方法

const { execSQL } = require('../db/mysql');

// 获取项目列表
const getProjectList = (token, search) => {
	let sql;
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			sql = `select * from consignment where 1=1`;
		}else{
			sql = `select * from consignment where projectShow = '1'`;
		}
		return execSQL(sql);
	});
}

// 创建项目
const createNewProject = (projectData) => {
	const projectName = projectData.projectName;
	const type = projectData.type;
	const price = projectData.price;
	const contact = projectData.contact;
	const url = projectData.url;
	const details = projectData.details;
	const imgList = projectData.imgList;
	const videoList = projectData.videoList;
	const sql = `insert into consignment (projectName, type, price, contact, url, details, imgList, videoList) values ('${projectName}', '${type}', '${price}', '${contact}', '${url}', '${details}', '${imgList}', '${videoList}')`
	return execSQL(sql).then(insertedResult => {
		console.log('insertedResult', insertedResult);
		return {
			id: insertedResult.insertId
		};
	});
}

const updateProjectCons = (token, projectData = {}) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const proId = projectData.id;
			const projectShow = projectData.projectShow;
			console.log(proId, projectShow)
			const sql = `update consignment set projectShow='${projectShow}' where id=${proId};`;
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
const deleteProject = (token, projectData) => {
	// 先验证headers是否有登录token;
	const sqlToken = `select * from login where token='${token}'`;
	return execSQL(sqlToken).then(sqlTokenResult => {
		if(sqlTokenResult[0]){
			const proId = projectData.id;
			
			const sql = `delete from consignment where id=${proId};`;
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


module.exports = {
	getProjectList,
	createNewProject,
	updateProjectCons,
	deleteProject
}