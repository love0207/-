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
