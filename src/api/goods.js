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
