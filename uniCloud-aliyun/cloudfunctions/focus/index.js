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
	  return {
			data:{
				status:1,
				data:'操作成功'
			}
	  }
	}else if(operation == 'focusGetByDay'){
		const res = await collection.where(
      {
        userId :  data.userId,
        day   :  data.time
      }
     ).get()
     return {
      data:{
        status:1,
        data:res.data
      }
    }
	}else if(operation == 'getWeekFocus'){
		const res = await collection.where({
      userId:data.userId,
      day:dbCmd.in(data.time),
    }).get()
    console.log(res)
    return {
      data:{
        status:1,
        data:res.data,
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
