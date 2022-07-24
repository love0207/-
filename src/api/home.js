import request from '@/utils/request'
/**
 *
 * 请求左侧菜单列表
 */
export const getmenus = () => {
  return request({
    method: 'GET',
    url: 'menus'
  })
}
