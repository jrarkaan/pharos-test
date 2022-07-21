const mysql = require('mysql2');
const Config = require(`${__dirname}/./config.js`);

// for connection MySQL Database
class MySQLConnection {
    #vpool; // private variable
    #sqlParams; // private

    constructor () {
        const { username, password, server, dbMysql, portMysql } = Config.database();

        this.#sqlParams = {
            host: server,
            user: username,
            password: password,
            database: dbMysql,
            port: portMysql,
            dateStrings: true,
            multipleStatements: true
        };

        this.#vpool = mysql.createPool(this.#sqlParams);
    }
    // // for regex query
    escape(str){
        try{
            if(typeof str!== 'undefined' && str!==null)
                return this.#vpool.escape((''+str).replace(/[\u0800-\uFFFF]/g, ''));
            else return this.#vpool.escape(str);
        }catch(err){
            console.error('Err: ', err)
        }
    }
    // // for execute query
    async query(script, callback_ok, callback_err, req){
        try{
            if(typeof req === 'undefined') req = {};
            await this.#vpool.getConnection(function(err, connection){
                if(err){
                    if(typeof req.printLog === 'undefined' || req.printLog) console.info(`${req.TAG} TOOLS_MYSQL_E1: ${script}; ${JSON.stringify(err)}`);
                    callback_err(err);
                    return;
                }
                connection.query(script, function(err, results) {
                    connection.release();
                    if (err){
                        if(typeof req.printLog === 'undefined' || req.printLog) console.info(`${req.TAG} TOOLS_MYSQL_E2: ${script}; ${JSON.stringify(err)}`);
                        callback_err(err);
                        return;
                    }
                    if(typeof req.printLog === 'undefined' || req.printLog)console.info(`${req.TAG}: DBMYSQL: OK: ${script}`);
                    callback_ok(results);
                });
            });
        }catch(err){
            console.error("Err: ", err)
        }

    }
}

// all of these obect reprentation from the class connection. feel free to create a new connection new Database,
// which is for currently (21/07/22) our team just only use MySQL, and MongoDB for development. hopefully this base
// could be use another connection
module.exports = {
    mysql: new MySQLConnection(),
    postgres: null,
    mongodb: null
};
