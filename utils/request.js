function myRequest(name,data) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    uniCloud.callFunction({
      name:name,
      data:{data} || {}
    }).then(res =>{
      resolve(res)
    }).catch(err =>{
      reject(err)
    })
  })
}

export default myRequest
