// 第88题

// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。

// 说明:

// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n ）来保存 nums2 中的元素。

// 示例:

// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3

// 输出: [1,2,2,3,5,6]

// https://www.pzijun.cn/algorithms/array/2.html

function merge(num1, m, num2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;
  while (len2 >= 0) {
    if (len1 <= 0) {
      num1[len--] = num2[len2--];
      continue;
    }
    num1[len--] = num1[len1] >= num2[len2] ? num1[len1--] : num2[len2--];
  }
}

(nums1 = [1, 2, 3, 0, 0, 0]), (m = 3);
(nums2 = [2, 5, 6]), (n = 3);

merge(nums1, m, nums2, n);
console.log("🚀 ~ file: 88.js:36 ~ nums1", nums1);
