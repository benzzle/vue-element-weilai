import request from '@/utils/request'

export function getSideMenu(...rest) {
  return request({
    url: '/api/admin/menu/menu',
    method: 'get',
    ...rest
  })
}

