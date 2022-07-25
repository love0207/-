import dayjs from 'dayjs'
export const dateformat = function (time) {
  return dayjs(time).format('YYYY-MM-DD')
}
