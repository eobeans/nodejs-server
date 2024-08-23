// 寄售项目相关方法

const { execSQL } = require('../db/mysql');

// 获取项目列表
const getImgList = (query) => {
	let sql = `select * from images where ISNULL(score)`;
  if (query) {
    sql = `select * from images`;
  }
	return execSQL(sql);
}

// 创建项目
const createNewImgScore = (bodyData) => {
	const filename = bodyData.filename;
	const score = bodyData.score;
	const username = bodyData.username;
	const sql = `insert into images_score (filename, score , username) values ('${filename}', '${score}', '${username}')`
	return execSQL(sql).then(insertedResult => {
		console.log('insertedResult', insertedResult);
		return {
			id: insertedResult.insertId
		};
	});
}

// 更新平均分
const saveOrUpdataImgAverageScore = () => {
	const sql = `INSERT INTO images (filename, score)
	SELECT filename, AVG(score)
	FROM images_score
	GROUP BY filename
	ON DUPLICATE KEY UPDATE score = VALUES(score)`
	return execSQL(sql);
}

module.exports = {
	getImgList,
	createNewImgScore,
	saveOrUpdataImgAverageScore
}