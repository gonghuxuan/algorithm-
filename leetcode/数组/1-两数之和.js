// #两数之和
// 给定一个整数数组 nums 和一个目标值 target ，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 示例:

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

function twoSum(nums, sum) {
  let map = new Map();
  let arr = [];
  try {
    nums.forEach((element, index) => {
      let k = sum - element;
      if (map.has(k)) {
        throw new Error([map.get(k), index]);
      } else {
        map.set(element, index);
      }
    });
  } catch (error) {
    return error;
  }

  // console.log("🚀 ~ file: 1-两数之和.js:21 ~ nums.forEach ~ map", map);
  return []; // 考虑没有匹配的情况
}

(nums = [2, 7, 11, 15]), (target = 9);

let arr = twoSum(nums, target);

console.log("🚀 ~ file: 1-两数之和.js:29 ~ arr", arr);

// forEach 无法return无法中止循环，返回为undefined， 若想中止循环，可以用try  catch返回，如twoSum应用,可以用try catch退出循环，如果想要返回东西，需要在error中取出来

// map存取检查为set get has，任何都可作为键

// function twoSum(nums, sum) {
//   let map = new Map();
//   let arr = [];
//   nums.forEach((element, index) => {
//     let k = sum - element;
//     if (map.has(k)) {
//       arr = [map.get(k), index];
//     } else {
//       map.set(element, index);
//     }
//   });
//   // console.log("🚀 ~ file: 1-两数之和.js:21 ~ nums.forEach ~ map", map);
//   return arr; // 考虑没有匹配的情况
// }
