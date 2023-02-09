// 可以给中文按照字典顺序排序
const city = ['上海', '北京', '深圳', '广州', '娄底']

city.sort((a, b) => a.localeCompare(b))

console.log(city)