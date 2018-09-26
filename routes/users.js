var express = require('express');
var router = express.Router();
//引入mysql模块
let mysql=require('mysql');
//创建连接
const connection = mysql.createConnection({
  host     : 'localhost',  // 主机名
  user     : 'root',   // 用户名
  password : 'root', // 密码
  database : 'admin'  // 数据库的名字
})

//调用连接方法
connection.connect();

//接受前段发送的请求
router.post('/userAdd',(req,res)=>{
  //接受前段发送的请求
  let {username,password,region}=req.body;
  
  res.send('1')
})

module.exports = router;
