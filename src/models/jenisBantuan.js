// const dbConn = require("./../../config/db.config");
// const bcrypt = require("bcrypt");

// const getReviewById = (id) => {
//   const qs =
//     "SELECT review.id, user.username AS creator, review.rate, review.desc FROM review INNER JOIN user on review.creator = user.id WHERE review.id = ? ";
//   return new Promise((resolve, reject) => {
//     dbConn.query(qs, id, (err, result) => {
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
