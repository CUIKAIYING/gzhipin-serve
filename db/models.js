// 1、连接数据库
//1引入mongoose
const mongoose = require("mongoose");
//2连接数据库
mongoose.connect("mongodb://localhost:27017/gzhipin");
//3获取连接对象
const conn = mongoose.connection;
//绑定监听  (所有没有名字的函数都可以写成箭头函数)
conn.on("connected",()=>{
    console.log("db connect success!")
});

//2、定义特定集合
//1、定义Schema对象
const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type: String, required: true}, // 用户类型: dashen/laoban
    header: {type: String}, // 头像名称
    post: {type: String}, // 职位
    info: {type: String}, // 个人或职位简介
    company: {type: String}, // 公司名称
    salary: {type: String} // 月薪
});
//2定义model集合
const UserModel = mongoose.model("user",userSchema);

//暴露出去
exports.UserModel = UserModel;