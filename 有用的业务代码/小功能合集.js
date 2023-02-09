// 监听其他标签页的更新通过storage

window.addEventListener('storage', (e) => {
    console.log(e)
})

//  css变量对于换肤的实现

//  减少使用background类似的复合属性，复合属性会覆盖之前的一些属性。