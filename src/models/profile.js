// const dbConn = require('./../../config/db.config');
// const bcrypt = require('bcrypt');
// //const jwt = require('jsonwebtoken');

// exports.updateUserById = (data, id) => {
//     const qs = 'UPDATE user SET ? WHERE id = ? ';
//     const updated = [data, id];
//     return new Promise((resolve, reject) => {
//         data.password
//             ? bcrypt.hash(data.password, 10, (err, encryptedPass) => {
//                 if (err) return reject({ status: 500 });

//                 data.password = encryptedPass;

//                 dbConn.query(qs, updated, (err, result) => {
//                     if (err) {
//                         reject({
//                             status: 500,
//                         });
//                     } else {
//                         if (result.affectedRows === 0)
//                             return reject({
//                                 status: 401,
//                                 success: false,
//                                 msg: 'This account does not exist',
//                             });
//                         resolve(result);
//                     }
//                 });
//             })
//             : dbConn.query(qs, updated, (err, result) => {
//                 if (err) {
//                     reject({ status: 500 });
//                 } else {
//                     resolve(result);
//                 }
//             });
//     });
// };

// exports.getUserByNik = (nik) => {
//   const qs = "SELECT * FROM user WHERE nik = ? ";
//   return new Promise((resolve, reject) => {
//     dbConn.query(qs, nik, (err, result) => {
//       if (err) {
//         reject({ status: 500 });
//       } else {
//         if (result.length === 0)
//           return reject({
//             status: 401,
//             success: false,
//             msg: "This account does not exist",
//           });
//         resolve(result);
//       }
//     });
//   });
// };


// exports.getAllUser = (nik) => {
//   const qs =
//     "SELECT user.username, user.fullname, user.phone, user.email, user.nik FROM user";
//   return new Promise((resolve, reject) => {
//     dbConn.query(qs, nik, (err, result) => {
//       if (err) {
//         reject({ status: 500 });
//       } else {
//         if (result.length === 0)
//           return reject({
//             status: 401,
//             success: false,
//             msg: "This account does not exist",
//           });
//         resolve(result);
//       }
//     });
//   });
// };

// //module.exports = updateUserById;