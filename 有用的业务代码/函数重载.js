//  看晕别人让人很难理解的代码

function addMehod(object, name, fn) {
  const old = object[name];
  object[name] = function (...args) {
    if (args.length === fn.length) {
      return fn.apply(this, args);
    } else if (typeof old === "function") {
      return old.apply(this, args);
    }
  };
}
const obj = {};
addMehod(obj, "find", () => {
  console.log("0个参数");
});

addMehod(obj, "find", (name) => {
  console.log("1个参数");
});

addMehod(obj, "find", (name, age) => {
  console.log("2个参数");
});

obj.find(1, 2);
obj.find();
obj.find(1);
