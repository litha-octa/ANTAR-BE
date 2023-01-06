const dbConn = require("./../../config/db.config");
// const bcrypt = require("bcrypt");

const addBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM detail_bantuan WHERE code = ? OR id_relawan = ? OR id_penerima = ?`;
    const checkData = [body.code, body.id_relawan, body.id_penerima];

    const qs = "INSERT INTO detail_bantuan SET ?";

    dbConn.query(checkUser, checkData, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length > 0) {
          console.log(result);
          if (body.code === result[0].code) {
            reject({
              success: false,
              conflict: "code, id_relawan, id_penerima",
              msg: "data sudah tersedia",
              status: 409,
            });
          }
        }else{
          dbConn.query(qs, body, (err, result) => {
            if (err) {
              reject({ status: 500 });
            } else {
              resolve(result);
            }
          });
        }
      }
    });
  });
};

module.exports={
    addBantuan,
}