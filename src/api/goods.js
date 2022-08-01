import request from '@/utils/request'
// 获取商品数据列表
export const getGoodsList = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'goods',
    params: { query, pagenum, pagesize }
  })
}

// 删除商品
export const delgoods = (id) => request({
  url: `goods/${id}`,
  method: 'delete'
})

// 获取商品分类列表
export const getCateList = () => request({
  url: 'categories'

})

// 参数列表
export const getParameterList = (id, sel) => request({
  url: `categories/${id}/attributes`,
  params: { sel }
})
// 添加商品
export const addgoods = (data) => request({
  url: 'goods',
  method: 'post',
  data
})

// 添加动态或静态属性
export const addParams = (id, name, sel) => request({
  url: `categories/${id}/attributes`,
  method: 'POST',
  data: { attr_name: name, attr_sel: sel }
})
// 根据id查询参数
export const editParams = (id, attrId, attrsel) => request({
  url: `categories/${id}/attributes/${attrId}`,
  params: {
    attr_sel: attrsel
  }
})
// 编辑提交参数
export const submitEdit = (id, attrId, name, attrsel, vals) => request({
  url: `categories/${id}/attributes/${attrId}`,
  method: 'PUT',
  data: {
    attr_name: name, attr_sel: attrsel, attr_vals: vals
  }
})
// 删除参数
export const deleteParams = (id, attrid) => request({
  url: `categories/${id}/attributes/${attrid}`,
  method: 'DELETE'
})

// 商品分类数据列表
export const classifyList = ({ type, pagenum, pagesize }) => request({
  url: 'categories',
  params: {
    type, pagenum, pagesize
  }
})
