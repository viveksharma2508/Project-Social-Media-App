// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: 'mysql',
//   });

// const User = db.define('User', {
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             len: [6, 255]
//         }
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true,
//             len: [6, 255]
//         }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//             len: [6, 1024]
//         }
//     },
//     date: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     tableName:'authUser'
// });

// module.exports = {
//     User,
//     db
// }


const mysql = require('mysql');

const connection = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
})

connection.connect();
module.exports = connection;