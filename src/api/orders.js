import request from '@/utils/request'
// 获取订单数据列表
export const getOrders = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'orders',
    params: { query, pagenum, pagesize }
  })
}
