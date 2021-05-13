'use strict';
const db = uniCloud.database();
const collection = db.collection('room');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const {
		operation,
		data
	} = event;
	if(operation == 'checkName'){
			const checkRes =  await collection.where({
				name:data.name
			}).get()
			console.log(checkRes)
			if(checkRes.affectedDocs == 0){				
			return {
				data:{
					status:2,
					data:'没有该自习室 请重新输入名字'
				}
			}
			}else{
				return {
					data:{
						status:1,
						data:checkRes
					}
				}
			}			
	}else if(operation == 'addRoom'){
		const checkRes =  await collection.where({
			name:data.name
		}).get()

		if(checkRes.affectedDocs == 0){
		  //没有才可以继续
			const res = await collection.add({
			name:data.name
		})
			return {
				data:{
					status:1,
					data:res,
				}
			}
		}else{
			return {
				data:{
					status:2,
					data:'房间名字已存在'
				}
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
