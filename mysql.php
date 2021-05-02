<?php
/**
 * php连接mysql操作流程
 * 1. 创建数据库连接
 * 2. 判断连接是否成功
 * 3. 设置编码格式
 * 4. 编写SQL语句
 * 5. 执行SQL语句
 * 6. 关闭数据库
 */
// 创建数据库连接
$link = mysqli_connect(host,username,password,dbname[,port,socket]);

// 判断是否连接成功
if (!$link) {
    exit("连接失败");
}

// 设置编码格式
mysqli_set_charset($link, "utf8");

// 编写sql语句
$sql = "select * from student";

// 执行sql语句
$result = mysqli_query($link, $sql);

// 把结果转换为关联数组
// $arr = mysqli_fetch_all($result, MYSQLI_ASSOC);

// 关闭数据库
mysqli_close($link);
?>
