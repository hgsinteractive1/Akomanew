// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
    config;

config = {
    // ### Production
    // When running Ghost in the wild, use the production environment
    // Configure your URL and mail settings here
    production: {
        url: 'http://b.akomanet.com',

        mail: {},
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost.db')
            },
            debug: false
        },

        // NOT USED JUST YET
        // Override the callback HOST value with the host we want SSO provider to call back
        // e.g. http://b.akomanet.com
        // e.g. http://127.0.0.1 -- NOT localhost as Twitter barfs at it
         TWITTER_CONSUMER_KEY: 'NRfJBexESA1fGKjXv9OidwLVd',
         TWITTER_CONSUMER_SECRET: 'MAYbbLLoiG2YSA0Tva6h4fPCs9TNAVJMxTeiwmXjIgcGK6A3F',
         TWITTER_CALLBACK: 'http://b.akomanet.com:/auth/twitter/callback',

        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        "homeTag":"faves",
        "salt":"ASDFASDCASFAZDFASGFASEDACS"
    },

    // ### Development **(default)**
    development: {

        // The url to use when providing links to the site, E.g. in RSS and email.
        // Change this to your Ghost blogs published URL.
        url: 'http://lgr.akomanet.com:2368',

        social: {
            twitter: {
                consumer_key: 'NRfJBexESA1fGKjXv9OidwLVd',
                consumer_secret: 'MAYbbLLoiG2YSA0Tva6h4fPCs9TNAVJMxTeiwmXjIgcGK62A3F',
                callback: '/auth/twitter/callback',
            },
            facebook: {
                client_id: '802215216531320',
                client_secret: 'ff50f138c26dd2992027ca4c506ef0fa',
                callback: '/auth/facebook/callback',
            }
        },

        mail: {
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: 'postmaster@sandbox55531d74d0ee4a9f8bf3e4449866d1d6.mailgun.org', // mailgun username
                    pass: '8a88aa074e49b70ab5db4fafbd65909d'  // mailgun password
                }
            }
        },

        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-dev.db')
            },
            debug: false
        },
        server: {
            // Host to be passed to node's `net.Server#listen()`
            host: '127.0.0.1',
            // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
            port: '2368'
        },
        paths: {
            contentPath: path.join(__dirname, '/content/')
        },
        "homeTag":"faves",
        "salt":"ASDFASDCASFAZDFASGFASEDACS"
    },

    // **Developers only need to edit below here**

    // ### Testing
    // Used when developing Ghost to run tests and check the health of Ghost
    // Uses a different port number
    testing: {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'sqlite3',
            connection: {
                filename: path.join(__dirname, '/content/data/ghost-test.db')
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing MySQL
    // Used by Travis - Automated testing run through GitHub
    'testing-mysql': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'mysql',
            connection: {
                host     : '127.0.0.1',
                user     : 'root',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    },

    // ### Testing pg
    // Used by Travis - Automated testing run through GitHub
    'testing-pg': {
        url: 'http://127.0.0.1:2369',
        database: {
            client: 'pg',
            connection: {
                host     : '127.0.0.1',
                user     : 'postgres',
                password : '',
                database : 'ghost_testing',
                charset  : 'utf8'
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2369'
        },
        logging: false
    }
};

// Export config
module.exports = config;
