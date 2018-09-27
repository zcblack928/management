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
connection.connect(()=>{
  console.log('连接数据库成功')
});
//导出路由
module.exports = router;

//接受前段添加用户的请求
router.post('/userAdd',(req,res)=>{
  //接收前端发送的数据
  let {username,password,groups}=req.body;
  // console.log(username,password,groups)
  //构造sql语句把数据存入数据库
  let sqlStr='insert into users(username,password,groups) values(?,?,?)';
  //接受到的参数数据
  let sqlParams=[username,password,groups];
  //执行sql语句，插入数据到数据库
  connection.query(sqlStr,sqlParams,(err,data)=>{
    if(err){
      throw err;
    }else{
      //判断是否插入数据库成功
      if(data.affectedRows>0){
        //响应一个成功的数据给前端
        res.send({"errcode":1,"msg":"添加成功"})
      }else{
        res.send({"errcode":0,"msg":"添加失败"})        
      }  
    }
  })
})

//接受前段获取用户列表的请求
router.get('/userList',(req,res)=>{
  //构造sql语句查询数据库所有数据
  let sqlStr='select * from users order by ctime desc';
  //把查询数据响应给前段
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    }else{
      res.send(data)
    }
  })
})

//接受前段的id并删除对应数据
router.get('/delete',(req,res)=>{
  //接受前段发送的id
  let id=req.query.id;
  // console.log(id)
  //构造sql语句执行删除操作
  let sqlStr=`delete from users where id=${id}`;
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    }else{
      //判断受影响行数是否大于0
      if(data.affectedRows>0){
        res.send({"errcode":1,"meg":"删除成功"})
      }else{
        res.send({"errcode":0,"meg":"删除失败"})        
      }
    }
  })
})

//接受前段的索引和id编辑数据
router.get('/edit',(req,res)=>{
  //接受前段发送的数据
  let {id}=req.query;
  // console.log(index,id)
  //编辑sql语句查询对应数据
  let sqlStr=`select * from users where id=${id}`;
  connection.query(sqlStr,(err,data)=>{
    if(err){
      throw err;
    }else{
      // console.log(data)
      res.send(data)
    }
  })
})

//接受前段数据，更新数据
router.post('/update',(req,res)=>{
  //接收前端发送的数据
  let {username,password,groups,id}=req.body;
  // console.log(username,password,groups)
  //构造sql语句把数据存入数据库
  let sqlStr=`update users set username=?,password=?,groups=? where id =${id}`
  //接受到的参数数据
  let sqlParams=[username,password,groups];
  //执行sql语句，插入数据到数据库
  connection.query(sqlStr,sqlParams,(err,data)=>{
    if(err){
      throw err;
    }else{
      //判断是否插入数据库成功
      if(data.affectedRows>0){
        //响应一个成功的数据给前端
        res.send({"errcode":1,"msg":"修改成功"})
      }else{
        res.send({"errcode":0,"msg":"修改失败"})        
      }  
    }
  })
})