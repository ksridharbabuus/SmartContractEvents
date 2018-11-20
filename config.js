var databaseOptions = {
    database:'', 
    username: '', 
    password:'', 
    host: '',
    port: 16430,
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
module.exports = {databaseOptions: databaseOptions} ;