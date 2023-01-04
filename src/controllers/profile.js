// // const userModel = require("../models/profile");
// // const { writeResponse, writeError } = require("../helpers/response");
// // //const jwt = require("jsonwebtoken");

// // const updateUserById = (req, res) => {
// //   console.log(req.token__userid);
// //   const { files } = req;
// //   const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
// //   const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
// //   const idUser = req.token__userid;
// //   userModel
// //     .updateUserById(data, idUser)
// //     .then((res) => {
// //       writeResponse(res, null, 200, {
// //         success: "true",
// //         message: "Profile update successfully!",
// //       });
// //     })
// //     .catch((err) => {
// //       writeError(res, err.status, {
// //         success: err.success,
// //         conflict: err.conflict,
// //         message: err.msg,
// //       });
// //     });
// // };

// // const getUser= (req, res) => {
// //   const idUser = req.token__userid;
// //   userModel
// //     .getUser(idUser)
// //     .then((result) => {
// //       writeResponse(res, null, 200, result);
// //     })
// //     .catch((err) => {
// //       writeError(res, err.status, {
// //         success: err.success,
// //         conflict: err.conflict,
// //         message: err.msg,
// //       });
// //     });
// // };

// // module.exports = {
// //   updateUserById,
// //   getUser,
// // };

// //const dbConn = require('./../../config/db.config');
// const userModel = require('../models/profile');
// const { writeResponse, writeError } = require('../helpers/response');
// //const jwt = require('jsonwebtoken');

// exports.updateUserById = (req, res) => {
//     const { files } = req;
//     const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
//     const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
//     const userid = req.params.id;
//     userModel
//         .updateUserById(data, userid)
//         .then((result) => {
//             writeResponse(res, null, 200, result);
//         })
//         .catch((err) => {
//             writeError(res, err.status, {
//                 success: err.success,
//                 conflict: err.conflict,
//                 message: err.msg,
//             });
//         });
// };

// exports.getUserByNik = (req, res) => {
//     const nik = req.params.nik
//     userModel
//         .getUserByNik(nik)
//         .then((result) => {
//             writeResponse(res, null, 200, result);
//         })
//         .catch((err) => {
//             writeError(res, err.status, {
//                 success: err.success,
//                 conflict: err.conflict,
//                 message: err.msg,
//             });
//         });
// };

// exports.getAllUser = (req, res) => {
//   const nik = req.params.nik;
//   userModel
//     .getAllUser(nik)
//     .then((result) => {
//       writeResponse(res, null, 200, result);
//     })
//     .catch((err) => {
//       writeError(res, err.status, {
//         success: err.success,
//         conflict: err.conflict,
//         message: err.msg,
//       });
//     });
// };

// exports.getUserToken = (req, res) => {
//   const userId = req.params.token;
//   userModel
//     .getUser(userId)
//     .then((result) => {
//       writeResponse(res, null, 200, result);
//     })
//     .catch((err) => {
//       writeError(res, err.status, {
//         success: err.success,
//         conflict: err.conflict,
//         message: err.msg,
//       });
//     });
// };

// //module.exports = updateUserById;
