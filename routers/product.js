const express = require('express');
const pool = require('../pool');


let router = express.Router();

router.get('/list', (req, res) => {
    let obj = req.query;
    // console.log(obj);
    if (!obj.pno) {
        obj.pno = 1;
    }
    if (!obj.count) {
        obj.count = 3;
    }
    obj.pno = parseInt(obj.pno);
    obj.count = parseInt(obj.count);
    pool.query("select * from xz_laptop limit ?,?", [obj.count * (obj.pno - 1), obj.count], (err, result) => {
        if (err) throw err;
        res.send({
            code: 200,
            msg: "succ",
            data: result
        });
    })
})

module.exports = router;