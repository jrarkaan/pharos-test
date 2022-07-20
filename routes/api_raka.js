const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post('/', function (req, res, next){
    res.status(200).json({
        event: true
    })
});

module.exports = router;