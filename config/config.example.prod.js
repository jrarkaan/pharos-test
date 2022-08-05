class Config {
    #env = ['dev', 'prod'];

    // please changes this config methods app for a need development
    // this methods requirement for config these service
    app(){
        return {
            env: this.#env[0], // dev: development or local and staging
            port_internal : 10081,
            cors: {
                whitelist:[
                    'http://localhost',
                    'http://localhost:8080',
                    'http://127.0.0.1:8080'
                ]
            }
        }
    }

    // configuration for database call
    database(){
        return {
            username:"root",
            password:"p4ssw0rd123",
            server:'127.0.0.1',
            dbMysql: 'general_db_id',
            portMysql: 3330
        }
    }

}

module.exports = new Config();
