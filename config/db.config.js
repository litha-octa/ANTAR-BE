'use stirct';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
const mysql = require('mysql');

const config = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE
}

// const config = {
//   host: "165.22.242.111",
//   user: 'admin’@’localhost',
//   password: 'P4nRbZ!0k#20a',
//   database: 'eforkompimda',
// };
const db = mysql.createConnection(config);

module.exports = db;