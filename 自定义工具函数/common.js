/*!
 * 通用js方法
 *
 * 随机数函数
 * 随机颜色 RGB
 *
 * 容写法, 获取元素的属性
 * 封装一个获取元素的函数$$,根据传入的参数,查找到相对应的元素
 * 获取第一个子元素,要求是兼容ie和标准浏览器 (while循环)
 * 获取第一个子元素,要求是兼容ie和标准浏览器 (递归)
 * 采用递归的方式, 获取上一个兄弟元素, 要求兼容ie低版本
 * 获取当前日期
 * 定义一个函数, 计算元素到顶部的距离
 *
 * 元素拖拽的函数
 * 碰撞检测
 * 提取 URL 中的各个GET参数
 * 封装AJAX
 * jquery扩展 复选框全选
 */

// 随机数函数
function rand(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
}

// 随机颜色 RGB
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}


//兼容写法, 获取元素的属性
function getCssAttr(obj, attr) {
    return window.getComputedStyle ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
}

// 封装一个获取元素的函数$$,根据传入的参数,查找到相对应的元素
function $$(ele) {
    // 先判断参数的类型只能是string, 且不为空字符串
    if (typeof ele != "string" || ele == "") {
        return false;
    }
    // 获取ele的第一个字符
    var first = ele.charAt(0);
    // 声明一个html对象,用来接收元素
    var htmlObj = null;
    if (first == "#") {
        var str = ele.slice(1);
        htmlObj = document.getElementById(str);
    } else if (first == ".") {
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
    var weekArray = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    second = second < 10 ? "0" + second : second;
    return year + "年" + mouth + "月" + day + "日 " + hour + ":" + +minute + ":" + second + " " + weekArray[week];
}

// 定义一个函数, 计算元素到顶部的距离
function getTop(obj) {
    // 判断 obj是不是body或者html
    if (obj.offsetParent == null) {
        return 0;
    }
    return obj.offsetTop + obj.offsetParent.clientTop + getTop(obj.offsetParent);
}

// 元素拖拽的函数
function drag(obj) {
    obj.onmousedown = function (event) {
        obj.setCapture && obj.setCapture(); // 兼容IE8

        event = event || window.event;

        var ol = event.clientX - obj.offsetLeft;
        var ot = event.clientY - obj.offsetTop;

        document.onmousemove = function (event) {
            event = event || window.event;

            var left = event.clientX - ol;
            var top = event.clientY - ot;

            left <= 0 && (left = 0);
            top <= 0 && (top = 0);

            var maxLeft = window.innerWidth - obj.clientWidth;
            var maxTop = window.innerHeight - obj.clientHeight;

            left >= maxLeft && (left = maxLeft);
            top >= maxTop && (top = maxTop);

            obj.style.left = left + "px";
            obj.style.top = top + "px";
        };
        document.onmouseup = function () {
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
    var dates = str.split("?")[1];
    var arr = dates.split("&");
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        var inArr = arr[i].split("=");
        obj[inArr[0]] = inArr[1];
    }
    return obj;
}


// 封装AJAX
function ajax(obj, callback) {
    // 获取类型
    let type = obj.type ? obj.type.toUpperCase() : "GET";
    // 获取接口地址
    let url = obj.url;
    // 传入的数据, 要处理成 a=b$c=d&e=f
    /**
     * act 作为和后台的约定
     *
     * act: "all"  获取所有数据
     * act: "add"  添加数据
     * act: "del"  获删除数据
     * act: "edit" 编辑数据
     */
    let arr = [];
    for (let key in obj.data) {
        let str = key + "=" + obj.data[key];
        arr.push(str);
    }
    let data = arr.join("&");

    // 创建ajax请求
    const req = new XMLHttpRequest();
    // 设置响应体数据的类型
    // req.responseType = "json";
    // 初始化及发送请求
    if (type == "GET") {
        req.open("GET", url + "?" + data);
        req.send();
    } else {
        req.open("POST", url);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(data);
    }
    // 绑定事件
    req.onreadystatechange = function () {
        if (this.readyState == 4) {
            if ((this.status >= 200 && this.status < 300) || this.status == 304) {
                // 把返回的结果作为参数传给回调函数
                callback(this.responseText);
            } else {
                console.log("请求失败" + this.status);
            }
        }
    };

    return false;
}

// jquery扩展 复选框全选
$.extend($.fn, {
    selectAll() {
        var flag = true;
        for (var i = 0; i < this.length; i++) {
            if (!this[i].checked) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    setChecked(type) {
        for (var i = 0; i < this.length; i++) {
            this[i].checked = type === false ? false : true;
        }
        return this;
    },
    getChecked() {
        if (this.length) return this[0].checked;
        return false;
    },
});

// 使用案例
$(".selectAll").change(function () {
    $(".selectItem").setChecked($(this).getChecked());
});

$(".selectItem").change(function () {
    $(".selectAll").setChecked($(".selectItem").selectAll());
});
