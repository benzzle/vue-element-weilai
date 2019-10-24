import request from '@/utils/request'

//restful风格的需要添加type为restful

export function login(...rest) {
  return request({
    url: '/api/admin/auth/login',
    method: 'post',
    //type: "restful",   
    ...rest
  })
}

export function getInfo(...rest) {
  return request({
    url: '/api/admin/auth/me',
    method: 'get',
    ...rest
  })
}

export function logout(...rest) {
  return request({
    url: '/api/admin/auth/logout',
    method: 'post',
    ...rest
  })
}
