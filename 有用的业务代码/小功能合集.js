/**
 * 
 * 目录
 * 
 * 1.监听其他标签页的更新通过storage
 * 2.随机颜色
 * 3.数字转金额
 */


// 监听其他标签页的更新通过storage

window.addEventListener('storage', (e) => {
    console.log(e)
})

//  css变量对于换肤的实现

//  减少使用background类似的复合属性，复合属性会覆盖之前的一些属性。

//  随机颜色
function getRandomColor() {
    let flag = true
    let colorStr
    while(flag) {
        colorStr = Math.random().toString(16)
        if(colorStr.length >= 8) {
            flag = false
        }
    }
    return '#' + colorStr.substring(2,8)
}

//  数字转金额
function numberToMoney(num) {
    if(typeof num !== 'string')
    num = num.toString()
    return  num.replace(/(?=\B(\d{3})+$)/g, ',')
}

function numberToMoney(num) {
    return  Number(num).toLocaleString()
}
