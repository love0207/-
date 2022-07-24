import request from '@/utils/request'
/**
 *登录
 * @param {*} param0
 * @returns
 */
export const login = ({ username, password }) => {
  return request({
    method: 'POST',
    url: 'login',
    data: {
      username, password
    }
  })
}
// 用户列表
export const getuserList = ({ query, pagenum, pagesize }) => {
  return request({
    method: 'GET',
    url: 'users',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}

// 修改用户状态
export const editUserState = (id, type) => request({
  method: 'PUT',
  url: `users/${id}/state/${type}`
})

// 添加用户
export const adduser = (data) => request({
  method: 'POST',
  url: 'users',
  data
})

// 删除用户
export const delUserById = (id) => request({
  method: 'DELETE',
  url: `users/${id}`
})

// 分配角色
export const assginRole = (data) => request({
  method: 'PUT',
  url: `users/${data.id}/role`,
  data
})

// 根据 ID 查询用户信息
export const userInfoById = (id) => request({
  url: `users/${id}`
})

// 角色列表
export const rolelist = () => request({
  url: 'roles'
})

// 修改用户信息
export const editUserById = (data) => request({
  method: 'PUT',
  url: `users/${data.id}`,
  data
})
