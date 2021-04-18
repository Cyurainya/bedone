'use strict';

const db = uniCloud.database();
const collection = db.collection('focus-data');
const dbCmd = db.command 
exports.main = async (event, context) => {
	const {
		operation,
		data
	} = event;
	 if(operation == 'focus'){
		const res = await collection.add({
		day:data.day,
		userId:data.userId,
		finish:data.finish,
		duration:data.duration
	})
	console.log(res)
	   return {
		data:{
		  status:1,
		  data:'操作成功'
		}
	  }
	}
	
	//返回数据给客户端
	return  {
    data:{
      status:0,
      data:'操作失败'
    }
  }
};
