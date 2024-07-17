//创建服务器
const http = require('http');

const serverHandler = require('../app')
const server = http.createServer(serverHandler);

const PORT = 5000;	//上线改为：6666
server.listen(PORT, () => {
	console.log('服务已启动，端口号'+ PORT +'...')
})
