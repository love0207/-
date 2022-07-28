import dayjs from 'dayjs'
export const dateformat = function (time) {
  return dayjs(time * 1000).format('YYYY-MM-DD')
}
