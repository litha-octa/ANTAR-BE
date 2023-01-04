// const reviewModel = require("../models/review");
// const { writeResponse, writeError } = require("../helpers/response");

// exports.createReview = (req, res) => {
//   reviewModel
//     .createReview(req.body)
//     .then(() => {
//       writeResponse(res, null, 201, {
//         message: "Review Telah terkirim !",
//       });
//     })
//     .catch((err) => {
//       writeError(res, 500, err);
//     });
// };

// exports.getReviewByUser = (req, res) => {
//   const id = req.params.id;
//   reviewModel
//     .getReviewByUser(id)
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

// exports.getReviewById = (req, res) => {
//   const id = req.params.id;
//   reviewModel
//     .getReviewById(id)
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

// exports.getAllReview = (req, res) => {
//   const id = req.params.id;
//   reviewModel
//     .getAllReview(id)
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
