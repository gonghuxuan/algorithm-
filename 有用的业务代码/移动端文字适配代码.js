/**
 * 字体适配
 * @param {String} width 字体宽度
 * @author xuan
 * @return {String} 字体宽度
 */

function AutoResponse(width = 750) {
    const target = document.documentElement;
    if (target.clientWidth >= 600) {
        target.style.fontSize = "80px";
    } else {
        target.style.fontSize = target.clientWidth / width * 100 + "px";
    }
}
AutoResponse();
window.addEventListener("resize", () => AutoResponse());


//  或者


// html {
//     font-size: calc(100vw / 7.5);
// }

