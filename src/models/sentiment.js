// const dbConn = require("./../../config/db.config");

// exports.getCountSentiment = (id) => {
//   const qs = "SELECT COUNT(sentiment) AS total FROM review WHERE sentiment = ?";
//   return new Promise((resolve, reject) => {
//     dbConn.query(qs,id, (err, result) => {
//       if (err) {
//         reject({ status: 500 });
//       } else {
//         if (result.length === 0)
//           return reject({
//             status: 404,
//             success: false,
//             msg: "data not found",
//           });
//         resolve(result);
//       }
//     });
//   });
// };