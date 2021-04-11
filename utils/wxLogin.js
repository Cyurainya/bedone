function wxLogin(){
	return new Promise((resolve,reject)=>{
		uni.login({
			provider:'weixin',
			success:(loginRes)=>{
				
				resolve(loginRes)
			},
			fail: err => {
        reject(err)
      }
		})
	})
}
export default wxLogin