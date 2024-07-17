const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG)

connection.connect();


// 执行sql语句 - promise
function execSQL(sql){
	const promise = new Promise((resolve, reject) => {
		connection.query(sql, (error, result) => {
			if (error) {
				reject(error)
				return
			}
			resolve(result)
		})
	})
	return promise;
}

module.exports = {
	execSQL
}