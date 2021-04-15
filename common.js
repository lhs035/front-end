/*!
 * 通用js方法
 * 
 * 随机数函数
 * 数组打乱
 * DOM 兼容写法, 获取元素的属性
 * DOM 封装一个获取元素的函数$$,根据传入的参数,查找到相对应的元素
 * DOM 获取第一个子元素,要求是兼容ie和标准浏览器 (while循环)
 * DOM 获取第一个子元素,要求是兼容ie和标准浏览器 (递归)
 * DOM 采用递归的方式, 获取上一个兄虎元素, 要求兼容ie低版本
 * 获取当前日期
 * 定义一个函数, 计算元素到顶部的距离
 * 拖拽
 * 碰撞检测
 */


// 随机数函数
function rand(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
}


//数组打乱1
arr.sort(function() {
    return Math.random() - 0.5;
});

//数组打乱2 
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

//兼容写法, 获取元素的属性
function getCssAttr(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
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


// 采用递归的方式, 获取上一个兄虎元素, 要求兼容ie低版本
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
wp.onmousedown = function() {
    var l = parseInt(getComputedStyle(wp).left);
    var t = parseInt(getComputedStyle(wp).top);
    var x = event.clientX;
    var y = event.clientY;
  
    wp.onmousemove = function() {
        var mx = event.clientX;
        var my = event.clientY;
        var ol = l - (x - mx);
        var ot = t - (y - my);
      
        // 控制不超出边界
        (ol <= 0) && (ol = 0);
        (ot <= 0) && (ot = 0);
      
        // 控制最大范围
        var maxL = window.innerWidth - wp.offsetWidth;
        var maxT = window.innerHeight - wp.offsetHeight;

        (ol >= maxL) && (ol = maxL);
        (ot >= maxT) && (ot = maxT);

        wp.style.left = ol + 'px';
        wp.style.top = ot + 'px';
    };
};

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
