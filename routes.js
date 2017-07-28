'use strict';
/**
 * THE INDEX ROUTER
 */
var express = require('express');
var router = express.Router();
var db = require("./model.js")

// Connect to DB 
db.connect()

var id = 1

// Routes
router.get("/", (req, res) => {
        res.sendFile(process.cwd() + '/views/index.html');
});

router.post("/", (req, res) => {
        if (req.body.message == "getUrl") {
		console.log(id)
                db.getUrlsPlus(id, function (data) {
                        res.json({data:data})
                })
        }

        if (req.body.message == "getUrlPlus") {
                db.getUrlsPlus(req.body.id, function (data) {
                        res.json({data:data})
                })
        }

        if(req.body.message == "setUrl") {
		//console.log(req.body.data.id)
		id = parseInt(JSON.parse(req.body.data).id) + 1
                db.setUrl(JSON.parse(req.body.data))
                console.log(JSON.parse(req.body.data))
                res.end()
        }
})


module.exports = router;
