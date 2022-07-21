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
                    'http://127.0.0.1:8080',
                    'https://guru.kelaspintar.id',
                    'https://staging-guru.kelaspintar.id',
                    'http://staging-satrio.kelaspintar.co.id',
                    'https://staging-satrio.kelaspintar.co.id',
                    'https://indo-testassessment.extramarks.com',
                    'https://assessment.extramarks.id',
                    'https://kelaspintar.id',
                    'https://www.kelaspintar.id',
                    'http://kelaspintar.id',
                    'http://www.kelaspintar.id'
                ]
            }
        }
    }

    // configuration for database call
    database(){
        return {
            username:"root",
            password:"admin123",
            server:'127.0.0.1',
            dbMysql: 'inventory',
            portMysql: 5200
        }
    }

}

module.exports = new Config();