let express = require('express');  //搭建服务器
let router = express.Router();  //路由
const md5 = require("blueimp-md5");  //password加密
const {UserModel} = require("../db/models");  //引入数据库中的集合
const filter = {password:0};  //服务器返回消息中过滤掉password


//注册的路由
router.post("/regist",function(req,res){
  //获取请求参数{username, password, type}
  const {username, password,type} = req.body;
  //注册时根据username查询数据库，看是否存在（有没有人注册过这个用户名）：存在 or 不存在
  UserModel.findOne({username}, function (err,userDoc) {
      if(userDoc){  //此用户已存在，返回注册失败的信息 ——code：标识
        res.send({code:1, msg:"此用户已存在"})
      }else{  //用户不存在，可以注册
        //  集合的返回只是一个实例对象，可以对其实例对象进行CRUD操作
        new UserModel({username,password:md5(password),type}).save((error, userDoc)=>{
          res.send({code:0, data:{_id:userDoc._id},username,type})
        })
      }
  });
});

//登陆的路由
router.post("/login",function(req,res){
//  获取请求参数
    const {username,password} = req.body;
//    处理数据：根据username和password去数据库查找
    UserModel.findOne({username,password:md5(password)}, filter, function (error,userDoc) {
    //    返回数据响应，有值和没有值
        if(!userDoc){  //登录失败
           res.send({code:1, msg:"用户名或密码错误"})

        }else{ // 登录成功
          //  生成一个cookie（userid: user_id）,并交给浏览器保存
          res.cookie("userid", user._id, {maxAge:1000*60*60*24*7});
            res.send({code:0, date:userDoc})
        }

    })
});

module.exports = router;
