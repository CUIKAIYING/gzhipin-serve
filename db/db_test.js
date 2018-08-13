//引入mongoose
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_server');
//连接对象
const conn = mongoose.connection
// 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
    console.log('数据库连接成功')
})
