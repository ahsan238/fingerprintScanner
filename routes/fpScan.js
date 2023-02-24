var express = require('express');
var router = express.Router();

/* GET Fingerprint Scan page */
router.get('/fingerprint',function(req, res, next){
    res.render('fpScan')
  })

