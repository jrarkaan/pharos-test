// #!/usr/bin/env node
/**
 * Module dependencies.
 */
const Config = require(`${__dirname}/../config/config.js`);
const App = require(`${__dirname}/../app.js`);
const debug = require('debug')('base:server');
const http = require('http');
const { port_internal } = Config.app();
/**
 * Redis configuration
 */
// const redis = require("redis");
// config.redis.client = redis.createClient(config.db.redis);
// config.redis.client.keys("viewer_*", function (err, keys) {
//   keys.forEach(function (key, pos) {
//     config.redis.client.del(key, 0);
//   });
// });

/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(port_internal);
console.log(`Server is running on port: ${port}`)
/**
 * Create HTTP server.
 */
const app = new App();
app.Server = port;

const server = http.createServer(app);
/**
 * Socket a needed
 */

// const io = require('socket.io')(server,{
//     cors: {
//         origin: ["http://localhost:8080","https://guru.kelaspintar.id"],
//         methods: ["GET", "POST","PUT","PATCH","DELETE"],
//         allowedHeaders: ["token"],
//         credentials: true
//     }
// });
// const redisAdapter = require('socket.io-redis');
// io.adapter(redisAdapter(config.db.redis));

// const func_socket_listen = require(__dirname+'/../functions/socket_listen');
// const func_socket_broadcast = require(__dirname+'/../functions/socket_broadcast');
// const func_shared = require(__dirname+'/../functions/shared');

// func_socket_listen.init(io);
// func_socket_broadcast.init(io);
// func_shared.init(io);

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    let port = parseInt(val, 10);

    if(isNaN(port)){
        // named pipe
        return val;
    }

    if(port >= 0){
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
