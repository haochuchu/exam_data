var express=require("express");
var mysql=require("mysql");
var router=express.Router();

var pool=mysql.createPool({
	host:"127.0.0.1",//localhost
	user:"root",//用户名
	password:"",//密码
	database:"exam",//数据库
	port:"3306"
});

router.post("/test",function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
		pool.query('SELECT * from news',function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});
});

router.post("/test1",function(req,res){
	var id=req.body["id"];
	res.header("Access-Control-Allow-Origin", "*");
		pool.query(`SELECT * from news where id=${id}`,function(err,rows,fields){
		if(err) throw err;
		res.send(rows);
	});
});

router.post('/test2',function(req,res){
	var id=req.body["id"];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`delete from news where id='${id}'`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("删除成功")
	});
});

router.post('/test3',function(req,res){
	var id=req.body["id"];
	var title=req.body["title"];
	var content=req.body["content"];
	res.header("Access-Control-Allow-Origin", "*");
	pool.query(`update news set title='${title}',content='${content}' where id='${id}'`, function(err, rows, fields) {
		if (err) throw err;
	  	res.send("修改成功")
	});
});
module.exports=router;