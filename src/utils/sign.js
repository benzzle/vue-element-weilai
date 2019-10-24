
var _ = require('lodash');
var md5 = require('md5')

// post
function signData(obj) {
  let initData = JSON.parse(JSON.stringify(obj))
  var coll = [];
  for (var i in obj) {
    if (i != 'sign') {
      if(typeof(obj[i])!='string') {
        obj[i] = JSON.stringify(obj[i])
      }
      coll.push({ 'key': i, 'value': obj[i] })
    }
  }

  let paramStr = sorted(coll)
  console.log('sign param', paramStr)
  let md5Str = md5(paramStr) + '7qIdL2kdYQzecQJplq8QXfzpolOgUGOM'
  let sign = md5(md5Str).toString()
  let data = Object.assign({ sign }, initData)
  return data;
}

// 排序
function sorted(obj) {
  obj = _.sortBy(obj, [function (o) { return o.key; }]);
  var dataStr = '';
  var arr = []
  _.forEach(obj, function (value, key) {
    arr.push(String(value['key']) + "=" + (String(value['value']) == 'undefined' ? "" : String(value['value'])))
    //   dataStr += (String(value['key'])+"="+String(value['value'])+"&")
  });
  dataStr = arr.join('&')
  return dataStr
}
export default {
  signData
}
