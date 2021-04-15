'use strict';

const db = uniCloud.database();
const collection = db.collection('task-data');

exports.main = async (event, context) => {
	const {
		operation,
		data
	} = event;
	if(operation == 'searchTask'){
    let {
      title,
      detail,
      date,
      duration,
      userId
    } = data
		const newTask = await collection.add({
      title,
      detail,
      date,
      duration,
      userId
    })
    return {
      data:{
        status:1,
        task:{
          title,
          detail,
          date,
          duration,
          userId
        }
      }
    }
	}else if(operation == 'addTask'){
		
	}else if(operation == 'editTask'){
		
	}
	//返回数据给客户端
	return event
};
