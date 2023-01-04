// const sentiment = require("../models/sentiment");
// const { writeResponse, writeError } = require("../helpers/response");

// exports.getCountSentiment = (req, res) => {
//   const id = req.params.id;
//   sentiment
//     .getCountSentiment(id)
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
