
import Axios from './request'
import { MessageBox, Message } from 'element-ui'
import sign from '@/utils/sign'
const callbackFn = (res, success, fail) => {
  if ( res.code === 1 ) {
    success && success(res)
  } else {
    if (fail) {
      fail(res)
    } else {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
    }
  }
}
/**
 * @desc 
 * @param  {...any} rest 
 */
let axios = (...rest) => {
  let resArr = rest[0];   //参数传值，一般接口会传递params，成功回调，失败回调（不需要特殊处理失败回调就不传）
  let success = resArr[1];
  let fail = resArr[2];
  let requestMethod = resArr.method.toLowerCase();
  let ajaxData = JSON.parse(JSON.stringify(resArr[0]))
  if(requestMethod === "post"){ //post请求
    ajaxData = sign.signData(ajaxData)
    return Axios.post(resArr.url, ajaxData).then(res => {
      callbackFn(res, success, fail)
    })
  }else{                        //get,put/delete请求
    if(resArr.type && resArr.type === "restful" && ajaxData.id !== undefined){
      delete ajaxData.id
    }
    ajaxData = sign.signData(ajaxData)
    return Axios[requestMethod](resArr.url, {
      params: ajaxData
    }).then(res => {
      callbackFn(res, success, fail)
    })
  }
}
export default axios



/**********************************下面的代码暂时未用，需要的时候需要添加到post类型里面去****************************************/


/**
 * @desc TODO---做到的时候在看，因为基本上上传都是用的element提供的组件upload
 * POST请求 上传文件:
 * @param {String} url //请求地址
 * @param {Object} data //请求参数
 * @param {Function} success //成功回调
 * @param {Function} fail //失败回调
 */

function postFormRequest(url, data = {}, obj = {}, success, fail) {
  let signData = sign.signData(obj)
  data.append("sign", signData.sign)
  return Axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => {
    if (res.data.code == -1) {
      window.location.href = `${window.location.origin}/login`
    } else {
      typeof success === 'function' && success(res)
    }
  }).catch(error => {
    typeof fail === 'function' && fail(error)
  })
}