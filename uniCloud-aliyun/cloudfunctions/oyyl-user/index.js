'use strict'
const {mpWxGetSessionKey} = require('wx-auth')

// eslint-disable-next-line no-undef
const db = uniCloud.database();
const collection = db.collection('oyyl-user')

exports.main = async(event) =>{
	const {
		operation,
		data
	} = event;

	if(operation === 'loginByWeixin'){
		//获取openid
		const res = await mpWxGetSessionKey(data)
		console.log(res)
		const {userInfo} = res
		let {
			openId,
			nickName :nickname,
			gender,
			avatarUrl:avatar
		} = userInfo;

		//通过openid查库里的数据
		const result = await collection.where({
			wx_openid:openId
		}).get();
		let id = null
		//判断数据库里面有没有用户登陆过的状态
		if(result.data.length > 0){
			//看看用户的头像之类的信息有没有更新过
			let user = result.data[0]
			id = user._id
			nickname = user.nickname;
			gender = user.gender;
			avatar = user.avatar
			
		}else{
			const newUser = await collection.add({
				nickname,
				gender,
				avatar,
				wx_openid:openId
			})
			id = newUser.id
		}
		return {
			data:{
				status:1,
				userInfo:{
					id,
					nickname,
					gender,
					avatar
				}
			}
		}
	}else if(operation === 'updateUserInfo'){
		//更新用户信息
		const {
			id,
			nickName:nickname,
			gender,
			avatarUrl:avatar
		} = data;
		const r = await collection.doc(id).update({
			nickname,
			gender,
			avatar
		})
		console.log(r)
		return {
			data: {
				status: 1,
				userInfo: {
					id,
					nickname,
					gender,
					avatar
				}
			}
		}
	}
	return {
		data:{
			status:0,
			msg:'获取用户失败'
		}
	}
}