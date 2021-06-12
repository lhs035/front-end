/**
 * 冒泡排序 bubbleSort(array)
 *
 * 数组去重 添加到新数组 unique1(array)
 * 数组去重 set方法 unique2(array) 
 *
 * 数组打乱 添加到新数组 shuffle1(arr)
 * 数组打乱 sort打乱 shuffle2(arr)
 *
 * 数组排序 从小到大或从大到小 sortArr(arr)
 * 数组中的最大值和最小值 maxminArr(arr)
 */

// 随机数函数
function rand(m, n) {
  return Math.floor(Math.random() * (n - m + 1) + m);
}

// 冒泡排序
function bubbleSort(array) {
  const arr = array.slice();
  const len = arr.length;
  // 外层控制趟数
  for (let i = 0; i < len - 1; i++) {
    // 里层控制比较的次数 = 数组长度 -1 - 趟数
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// 数组去重 添加到新数组
function unique1(array) {
  const arr = [];
  array.forEach((item) => {
    if (!arr.includes(item)) {
      arr.push(item);
    }
  });
  return arr;
}

// 数组去重 set方法
function unique2(array) {
  return [...new Set(array)];
}

//数组打乱 添加到新数组 数组中重复值不行
function shuffle1(arr) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
        // 随机数函数 rang()
        let index = rand(0, arr.length - 1);
        let item = arr[index];
        // 判断newArr中是否含有ele, 如果有就不添加, 没有就添加
        if (newArr.indexOf(item) === -1) {
            newArr.push(item);
        } else {
            i--;
        }
    }
    return newArr;
}

//数组打乱 sort打乱
function shuffle2(arr) {
    const newArr = [...arr];
    return newArr.sort(() => Math.random() - 0.5);
}

// 数组排序 从小到大或从大到小
function sortArr(arr) {
    const newArr = [...arr];
    newArr.sort((a, b) => a - b);
    return newArr;
}

// 数组中的最大值和最小值
function maxminArr(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    return "最大值是" + max + ", 最小值是" + min;
}
