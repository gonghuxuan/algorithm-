let lastSource;
// 匹配srcipt
const scriptReg = /\<script.*src=["'](?<src>[^"']+)/gm;

// 获取服务器资源，匹配html文件里的script
async function extractNewScript() {
  const html = await fetch("./?_timestamp=" + Data.now()).then((res) => {
    res.text();
  });
  scriptReg.lastIndex = 0;
  let result = [];
  let match;
  while ((match = scriptReg.exec(html))) {
    result.push(match.groups.src);
  }
  return result;
}

// 通过判断新请求的script和上一次的是否相同。判断是否需要更新
async function needUpdate() {
  const newScripts = await extractNewScript();
  if (!lastSource) {
    lastSource = newScripts;
    return false;
  }
  let result = false;
  if (lastSource.length !== newScripts.length) {
    return true;
  }
  for (let i = 0; i < lastSource.length; i++) {
    if (lastSource[i] !== newScripts[i]) {
      result = true;
      break;
    }
  }
  lastSource = newScripts;
  return result;
}

const DURATION = 5000;
// 轮询判断是否更新
function autoRefresh() {
  setTimeout(async () => {
    const willUpdate = await needUpdate();
    if (willUpdate) {
      const result = confirm("页面需要更新，点击确定刷新页面");
      if (result) {
        location.reload();
      }
    }
    autoRefresh();
  }, DURATION);
}

autoRefresh();
