const express = require('express');
const cors = require('cors')
const router = express.Router();
const Config = require(`${__dirname}/../config/config.js`);
const { cors: { whitelist } } = Config.app();

const corsOptionsDelegate = function (req, callback) {
    let corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    // corsOptions = { origin: true }
    // console.log(req.TAG,'CORS',JSON.stringify(corsOptions))
    callback(null, corsOptions) // callback expects two parameters: error and options
}

router.all('/*',cors(corsOptionsDelegate), function(req, res, next) {
    req.TAG = new Date().getTime();
    console.log(req.TAG,req.method,req.path)
    next();
});

module.exports = router;