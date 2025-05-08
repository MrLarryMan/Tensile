const path = require('path');

module.exports = {
    development: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../data/database.sqlite'),
        logging: false,
    },
    test: {
        dialect: 'sqlite',
        storage: path.join(__dirname, '../data/test-database.sqlite'),
        logging: false,
    },
    production: { 
        dialect: 'sqlite',
        storage: path.join(__dirname, '../data/database.sqlite'),
        logging: false,
    }
}