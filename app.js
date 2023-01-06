const express = require('express');
//挂载路由
const userRouter = require('./routers/user.js');
const productRouter = require('./routers/product');
const bodyParser = require('body-parser');

let app = express();
app.listen(8080);
//use static resource in folder public  
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false //内部解析为对象使用querystring
    //true 表示使用拓展模块 qs
}));
//添加前缀
// /user/reg
app.use('/user', userRouter);
app.use('/product', productRouter);
