'use strict';
exports.main = async (event, context) => {
	console.log(event); //传入的参数
	console.log(context); //上下文信息
	
	//返回数据给客户端
	return {msg:"Hello uniCloud!"}
};
