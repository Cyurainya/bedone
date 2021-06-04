'use strict';
const db = uniCloud.database();
const collection = db.collection('task-data');
const dbCmd = db.command

exports.main = async (event, context) => {
	const {
		operation,
		data
	} = event;
   
  if(operation == 'getTask'){
     //返回当前所有task
     const completeList = await collection.where(
      {userId :  data.userId}
     ).get()
     return {
      data:{
        status:1,
        data:completeList.data
      }
    }
  }else if(operation == 'getTaskByDay'){
    const completeList = await collection.where(
      {
        userId :  data.userId,
        time   :  data.time
      }
     ).get()
     return {
      data:{
        status:1,
        data:completeList.data
      }
    }
  }else if(operation == 'checkTask'){
     await collection.doc(data._id).update({
      checkBox:true
      })
      return {
        data:{
          status:1,
          data:'check成功',
        }
      }
  }else if(operation == 'revokeTask'){
    //撤销某个task的完成
    await collection.doc(data._id).update({
    checkBox:false
    })
    return {
      data:{
        status:1,
        data:'撤销成功',
      }
    }
  }else if(operation == 'editTask'){
    //编辑当前task
    await collection.doc(data._id).update({
      title: data.title,
      detail: data.detail,
      time: data.time,
    })
    return {
      data:{
        status:1,
        data:'编辑成功',
      }
    }
  }else if(operation == 'deleteTask'){
     //删除某个task
     await collection.doc(data._id).remove()
     return {
      data:{
        status:1,
        data:'删除成功',
      }
     }

  }else if(operation == 'addTask'){

    //添加某个task
    const res = await collection.add({
      title:data.title,
      detail:data.detail,
      userId:data.userId,
      time:data.time,
      checkBox:false,
      showSwipe:false
    })

    return {
      data:{
        status:1,
        data:'添加成功',
      }
    }
  }else if(operation == 'getWeekTask'){
    const res = await collection.where({
      userId:data.userId,
      time:dbCmd.in(data.time),
    }).get()
   
    return {
      data:{
        status:1,
        data:res.data,
      }
    }
  }
 
	//返回数据给客户端
	return {
    data:{
      status:0,
      data:'获取数据失败'
    }
  }
};
