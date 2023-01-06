const express = require('express');
const pool = require('../pool');
let router = express.Router();

//挂载路由
//register  post  /register

router.post('/reg', (req, res) => {
    //get the data
    let obj = req.body;
    // console.log(obj);
    //check if the data is empty
    if (!obj.uname) {
        res.send({
            code: 401,
            msg: 'empty username'
        });
        return;
    }
    if (!obj.upwd) {
        res.send({
            code: 402,
            msg: 'empty password'
        });
        return;
    }
    if (!obj.email) {
        res.send({
            code: 403,
            msg: 'empty email'
        });
        return;
    }
    if (!obj.phone) {
        res.send({
            code: 404,
            msg: 'empty phone number'
        });
        return;
    }
    else {
        pool.query('Insert into xz_user set ?', [obj], (err, result) => {
            if (err) {
                res.send({
                    code: 402,
                    msg: 'serve error'
                });
                return;
            }

            if (result.affectedRows > 0) {
                res.send({
                    code: 200,
                    msg: 'register successfully'
                });
            }

        })

    }
});

router.post('/login', (req, res) => {
    let obj = req.body;
    console.log(obj);
    if (!obj.uname) {
        res.send({
            code: 401,
            msg: "username is empty"
        });
        return;
    }
    if (!obj.upwd) {
        res.send({
            code: 402,
            msg: 'password is empty'
        });
        return;
    }
    else {
        pool.query('Select * from xz_user where uname = ? and upwd = ?', [obj.uname, obj.upwd], (err, result) => {

            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    code: 200,
                    msg: 'login in successfully'
                });
            }
            else {
                res.send({
                    code: 301,
                    msg: 'username or password wrong'
                });
                return;
            }

        });
    }
});

router.get('/detail', (req, res) => {
    let obj = req.query;
    if (!obj) {
        res.send({
            code: 401,
            msg: 'empty id'
        });
        return;
    }
    pool.query('Select * from xz_user where uid = ?', [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: result
            });

            console.log(result);
        }
        else {
            res.send({
                code: 301,
                msg: 'can not find it'
            });
            return;
        }
    })
});

router.post('/update', (req, res) => {
    let obj = req.body;
    console.log(obj);
    let i = 400;
    for (let key in obj) {
        i++
        if (!obj[key]) {
            res.send({
                code: i,
                msg: key + " require"
            });
            return;
        };
    }
    pool.query("update xz_user set ? where uid = ? ", [obj, obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: "update succ"
            });
        }
        else {
            res.send({
                code: 301,
                msg: "update error"
            });
            return;
        }
    })
})

router.post('/list', (req, res) => {
    let obj = req.body;
    // console.log(obj);
    if (!obj.count) obj.count = 2;
    if (!obj.pno) obj.pno = 1;
    obj.count = parseInt(obj.count);
    obj.pno = parseInt(obj.pno);
    pool.query("Select * from xz_user limit ?,?", [obj.count * (obj.pno - 1), obj.count], (err, result) => {
        if (err) throw err;
        //console.log(result);
        res.send({
            code: 200,
            msg: "ok",
            data: result
        });
    })

})

router.get('/delete', (req, res) => {
    let obj = req.query;
    //console.log(obj);
    if (!obj.uid) {
        res.send({
            code: 400,
            msg: 'empty id'
        });
        return;
    }
    pool.query('Delete from xz_user where uid = ?', [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                code: 200,
                msg: 'Delete succ'
            });
        }
        else {
            res.send({
                code: 301,
                msg: "delete error"
            });
            return;
        }
    })

})
module.exports = router;