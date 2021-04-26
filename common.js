/*!
 * 通用js方法
 * 
 * 随机数函数
 * 随机颜色 RGB
 * 数组打乱, sort打乱
 * 数组打乱, 添加到新数组
 * 数组去重
 * 数组去重 利用ES6 Set去重
 * 数组排序, 冒泡排序
 * 数组排序, sort排序
 *
 * 兼容写法, 获取元素的属性
 * 封装一个获取元素的函数$$,根据传入的参数,查找到相对应的元素
 * 获取第一个子元素,要求是兼容ie和标准浏览器 (while循环)
 * 获取第一个子元素,要求是兼容ie和标准浏览器 (递归)
 * 采用递归的方式, 获取上一个兄弟元素, 要求兼容ie低版本
 * 获取当前日期
 * 定义一个函数, 计算元素到顶部的距离
 *
 * 拖拽
 * 拖拽函数
 * 碰撞检测
 * 提取 URL 中的各个GET参数
 * 深拷贝 数组和对象综合方法
 * 对象复制器函数
 * 设置自定义滚动条
 */


// 随机数函数
function rand(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
}


// 随机颜色 RGB
function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}


//数组打乱, sort打乱
arr.sort(function() {
    return Math.random() - 0.5;
});


//数组打乱, 添加到新数组
function arrSort(arr) {
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        var index = rand(0, arr.length - 1);
        var ele = arr[index];
        // 判断newArr中是否含有ele, 如果有则不添加,没有就添加
        if (newArr.indexOf(ele) == -1) {
            newArr.push(ele);
        } else {
            i--;
        }
    }
    return newArr; // 返回新数组
}


//数组去重
for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
        if (arr[i] == arr[j]) {
            arr.splice(j, 1);
            j--;
        }
    }
}


/**
 * @desc 数组去重 利用ES6 Set去重
 * @param {[]} arr
 * @returns {[]} 返回去重后的数组
 */
function unique(arr) {
    let newArr = new Set(arr);
    return [...newArr];
    //return Array.from(new Set(arr));
}


// 数组排序, 冒泡排序
for (var i = 1; i < arr.length; i++) { // 外层控制趟数
    for (var j = 0; j < arr.length - i; j++) { // 里层控制比较的次数 = 数组长度 - 趟数
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}


/**
 * @desc 按顺序重新排列数组(从小到大)
 * @param {Array} arr
 * @returns {Array} 返回新的数组
 */
function sortArr(arr) {
    let arrNew = arr.slice(0);
    arrNew.sort((a, b) => a - b);
    return arrNew;
}


//兼容写法, 获取元素的属性
function getCssAttr(obj, attr) {
    return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}


// 封装一个获取元素的函数$$,根据传入的参数,查找到相对应的元素
function $$(ele) {
    // 先判断参数的类型只能是string, 且不为空字符串
    if (typeof ele != 'string' || ele == '') {
        return false;
    }
    // 获取ele的第一个字符
    var first = ele.charAt(0);
    // 声明一个html对象,用来接收元素
    var htmlObj = null;
    if (first == '#') {
        var str = ele.slice(1);
        htmlObj = document.getElementById(str);
    } else if (first == '.') {
        str = ele.slice(1);
        htmlObj = document.getElementsByClassName(str);
    } else {
        htmlObj = document.getElementsByTagName(ele);
    }
    return htmlObj;
}


// 获取第一个子元素,要求是兼容ie和标准浏览器 (while循环)
function getFirstElementChild(ele) {
    // 如果参数不存在
    if (!ele) {
        return null;
    }
    // 参数存在
    var f = ele.firstChild;
    while (f.nodeType != 1) {
        f = f.nextSibling;
        // 如果子节点全部遍历一遍,仍然没有元素节点
        if (f == null) {
            return null;
        }
    }
    return f;
}


// 获取第一个子元素,要求是兼容ie和标准浏览器 (递归)
function getFirst(ele) {
    if (!ele) {
        return null;
    }
    // 参数存在
    var f = ele.firstChild;
    if (f.nodeType == 1) {
        return f;
    } else {
        return getNext(f);
    }
}

function getNext(ele) {
    if (!ele) {
        return null;
    }
    //获取下一个节点
    var p = ele.nextSibling;
    // 判断p是否存在
    if (!p) {
        return null;
    }
    return p.nodeType == 1 ? p : getNext(p);
}


// 采用递归的方式, 获取上一个兄弟元素, 要求兼容ie低版本
function getPrev(ele) {
    var p = ele.previousSibling;
    // 判断p是否存在
    if (!p) {
        return null;
    }
    // 获取元素的上一个节点
    return p.nodeType == 1 ? p : getPrev(p);
}


// 获取当前日期
function currentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var mouth = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var week = date.getDay();
    var weekArray = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    second = second < 10 ? '0' + second : second;
    return year + '年' + mouth + '月' + day + '日 ' + hour + ':' + +minute + ':' + second + ' ' + weekArray[week];
}


// 定义一个函数, 计算元素到顶部的距离
function getTop(obj) {
    // 判断 obj是不是body或者html
    if (obj.offsetParent == null) {
        return 0;
    }
    return obj.offsetTop + obj.offsetParent.clientTop + getTop(obj.offsetParent);
}


// 拖拽
ele.onmousedown = function() {
    var l = parseInt(getComputedStyle(ele).left);
    var t = parseInt(getComputedStyle(ele).top);
    var x = event.clientX;
    var y = event.clientY;
  
    ele.onmousemove = function() {
        var mx = event.clientX;
        var my = event.clientY;
        var ol = l - (x - mx);
        var ot = t - (y - my);
      
        // 控制不超出边界
        (ol <= 0) && (ol = 0);
        (ot <= 0) && (ot = 0);
      
        // 控制最大范围
        var maxL = window.innerWidth - ele.offsetWidth;
        var maxT = window.innerHeight - ele.offsetHeight;

        (ol >= maxL) && (ol = maxL);
        (ot >= maxT) && (ot = maxT);

        ele.style.left = ol + 'px';
        ele.style.top = ot + 'px';
    };
};


/**
 * @func 
 * @desc 元素拖拽的函数
 * @param {object} obj 开启拖拽的元素
 */
function drag(obj) {
    obj.onmousedown = function(event) {
        obj.setCapture && obj.setCapture(); // 兼容IE8

        event = event || window.event;

        var ol = event.clientX - obj.offsetLeft;
        var ot = event.clientY - obj.offsetTop;

        document.onmousemove = function(event) {
            event = event || window.event;

            var left = event.clientX - ol;
            var top = event.clientY - ot;

            (left <= 0) && (left = 0);
            (top <= 0) && (top = 0);

            var maxLeft = window.innerWidth - obj.clientWidth;
            var maxTop = window.innerHeight - obj.clientHeight;

            (left >= maxLeft) && (left = maxLeft);
            (top >= maxTop) && (top = maxTop);

            obj.style.left = left + "px";
            obj.style.top = top + "px";

        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;

            obj.releaseCapture && obj.releaseCapture(); // 兼容IE8
        };
        return false;
    };
}


// 碰撞检测
function isPeng(obj1, obj2) {
    var l1 = obj1.offsetLeft;
    var t1 = obj1.offsetTop;
    var r1 = obj1.offsetLeft + obj1.offsetWidth;
    var b1 = obj1.offsetTop + obj1.offsetHeight;

    var l2 = obj2.offsetLeft;
    var t2 = obj2.offsetTop;
    var r2 = obj2.offsetLeft + obj2.offsetWidth;
    var b2 = obj2.offsetTop + obj2.offsetHeight;

    // 判断是否碰撞
    if (l1 > r2 || t1 > b2 || r1 < l2 || b1 < t2) {
        return false; // 没有碰撞
    } else {
        return true; // 碰撞了
    }
}


// 提取 URL 中的各个GET参数
function getUrlDate(str) {
    var dates = str.split('?')[1];
    var arr = dates.split('&');
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var inArr = arr[i].split('=');
        obj[inArr[0]] = inArr[1];
    }
    return obj;
}


/**
 * @func
 * @desc 深拷贝 数组和对象综合方法
 */
function deepCopy(obj) {
    var result = Array.isArray(obj) ? [] : {};
    // 判断obj是可用的引用类型
    if (obj && typeof(obj) == 'object') {
        for (var key in obj) {
            // 先判断obj[key] 是否是一个对象
            if (obj[key] && typeof(obj[key]) == 'object') {
                result[key] = deepCopy(obj[key]);
            } else {
                result[key] = obj[key];
            }
        }
    }
    return result;
}


/**
 * @desc 对象复制器函数
 * @param { {} | [] } obj - 数组,对象
 * @returns 返回新的数组或对象
 */
function copy(obj) {
    const copy = Object.create(Object.getPrototypeOf(obj));
    const propNames = Object.getOwnPropertyNames(obj);

    propNames.forEach(function (name) {
        const desc = Object.getOwnPropertyDescriptor(obj, name);
        Object.defineProperty(copy, name, desc);
    });

    return copy;
}


/**
 * @function
 * @desc 设置自定义滚动条
 * @param {HTMLElement} scrollEle - 要滚动的元素
 * @param {HTMLElement} scrollBarEle - 滚动条
 * @todo 函数需要改进, 并不能正常使用
 */
function setScrollBar(scrollEle, scrollBarEle) {
    var scrollEleHeight = scrollEle.clientHeight;
    var scrollEleParentHeight = scrollEle.parentNode.clientHeight;
    var scrollBarHeight = scrollEleParentHeight * scrollEleParentHeight / scrollEleHeight;
    scrollBarEle.style.height = scrollBarHeight + "px"; // 设置滚动条的高度
    var maxMoveHeight = scrollEleHeight - scrollEleParentHeight; // 内容最大可移动高度

    // 拖动滚动条
    scrollBarEle.onmousedown = function(event) {
        event = event || window.event;
        var cy = event.clientY;
        var top = this.offsetTop;

        document.onmousemove = function(event) {
            event = event || window.event;
            var my = event.clientY;
            var t = top + (my - cy);
            var maxH = scrollEleParentHeight - scrollBarHeight;
            (t <= 0) && (t = 0);
            (t >= maxH) && (t = maxH);
            scrollBarEle.style.top = t + 'px';

            var num = -maxMoveHeight * t / maxH;
            scrollEle.style.transform = 'translateY( ' + num + 'px )';
        };
        document.onmouseup = function() {
            document.onmousemove = null;
        };
        return false;
    };

    // 滚动内容
    (function addMousewheel(obj) {
        if (!obj) {
            return;
        }
        obj.addEventListener('DOMMouseScroll', scrollFun); // 火狐
        obj.onmousewheel = scrollFun; // 谷歌
        var dir; // 记录滚动方向

        function scrollFun(event) {
            event = event || window.event;
            var t = scrollBarEle.offsetTop;
            if (event.wheelDelta) { // 谷歌
                dir = event.wheelDelta > 0 ? true : false;
            } else { // 火狐
                dir = event.detail > 0 ? false : true;
            }
            dir ? t -= 10 : t += 10;

            var maxH = scrollEleParentHeight - scrollBarHeight;
            (t <= 0) && (t = 0);
            (t >= maxH) && (t = maxH);
            scrollBarEle.style.top = t + 'px';

            var num = -maxMoveHeight * t / maxH;
            scrollEle.style.transform = 'translateY( ' + num + 'px )';

            event.preventDefault && event.preventDefault();
            return false;
        }
    })(scrollEle.parentNode);
}
