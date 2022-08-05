const express = require( "express" );
const morgan = require( "morgan" );
const path = require( "path" );
const cookieParser = require("cookie-parser");
const fileUpload = require('express-fileupload');
const Config = require(`${__dirname}/./config/config.js`);
// routes
const corsRouter = require(`${__dirname}/./middleware/cors.js`);
const rakaRouter = require(`${__dirname}/./routes/api_raka.js`);
const taskRouter = require(`./routes/api_task.js`);

class ExpressLoader {
    #app; // private variable
    config;

    constructor() {
        this.#app = express();
        this.config = Config.app();
        // configfuration
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({ extended: true }));
        this.#app.use(cookieParser());
        this.#app.use(express.static(path.join(__dirname, 'public')));
        this.#app.use(fileUpload({
            limits: { fileSize: 500 * 1024 * 1024 }, //500MB
            useTempFiles : true,
            tempFileDir : `${__dirname}/public/uploaded`
        }));

        // all routes desclare
        this.#app.use('/', corsRouter);
        this.#app.use('/api/raka', rakaRouter);
        this.#app.use('/api/task', taskRouter);

        // view engine setup
        this.#app.set('views', path.join(__dirname, 'views'));
        this.#app.set('view engine', 'ejs');

        // catch 404 and forward to error handler
        this.#app.use(function(req, res, next) {
            // next(createError(404));
            res.status(422)
            res.json({})
        });

        // error handler
        this.#app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            // res.locals.message = err.message;
            // res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            // res.status(err.status || 500);
            // res.render('error');
            // tools_mysql.query('INSERT INTO log_error (message) VALUES ('+tools_mysql.escape(JSON.stringify(err))+')',function(d){},function(e){},req);
            res.status(500)
            res.json({})
        });

        // const port = this.config.port_internal;

        // Start application
        // this.server = this.#app.listen(port, () => {
        //     console.info( `Express running, now listening on port ${port}` );
        // });
        return this.#app
    }

    // get Server () {
    //     return this.server;
    // }

    set Server(port){
        return this.#app.set('port', port);
    }

    /**
     * @description Default error handler to be used with express
     * @param error Error object
     * @param req {object} Express req object
     * @param res {object} Express res object
     * @param next {function} Express next object
     * @returns {*}
     */
    static errorHandler ( error, req, res, next ) {
        let parsedError;

        // Attempt to gracefully parse error object
        try {
            if (error && typeof error === "object") {
                parsedError = JSON.stringify(error);
            } else {
                parsedError = error;
            }
        }catch(e){
            console.error(e);
        }

        // Log the original error
        console.error(parsedError);

        // If response is already sent, don't attempt to respond to client
        if (res.headersSent) {
            return next(error);
        }

        res.status(400).json({
            success: false,
            error
        });
    }
}

module.exports = ExpressLoader;
