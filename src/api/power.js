import request from '@/utils/request'

export const rightslist = () => request({
  url: 'rights/list'
})

// 角色列表
export const rolelist = () => request({
  url: 'roles'
})

// 删除角色
export const delrole = (id) => request({
  method: 'DELETE',
  url: `roles/${id}`
})

// 权限列表
export const rights = () => request({
  url: 'rights/tree'
})

// 添加角色
export const addrole = (data) => request({
  url: 'roles',
  method: 'POST',
  data
})
// 角色授权
export const roleAuthorization = (userId, rids) => request({
  url: `roles/${userId}/rights`,
  method: 'POST',
  data: { rids }
})

// 编辑提交角色
export const editrole = ({ id, roleName, roleDesc }) => request({
  url: `roles/${id}`,
  method: 'PUT',
  data: { roleName, roleDesc }
})

// 删除角色指定权限
export const deleterolepower = (roleId, rightId) => request({
  url: `roles/${roleId}/rights/${rightId}`,
  method: 'DELETE'
})
