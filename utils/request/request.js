export const request = (cloudFnName,operation,data={},ext={}) =>{
  return new Promise((resolve,reject)=>{
    if(ext.showLoading !== false){
      uni.showLoading({
        title: '加载中'
      });
    }
    // eslint-disable-next-line no-undef
    uniCloud.callFunction({name:cloudFnName,data:{
      data
    }}).then(res =>{
      if (ext.showLoading !== false) {
				uni.hideLoading()
			}
			resolve(res.result.data);
    }).catch(err =>{
      if (ext.showLoading !== false) {
				uni.hideLoading()
			}
			reject(err);
    })
  })
}