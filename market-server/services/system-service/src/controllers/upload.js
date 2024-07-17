// 上传相关方法

const { execSQL } = require('../db/mysql');

// 登录方法
const uploadFun = (username, password) => {
	const sql = `select * from login where username='${username}' and password='${password}' `;
	return execSQL(sql).then(loginResult => {
		// console.log(loginResult[0].password)
		return loginResult[0];
	});
}

module.exports = { uploadFun }