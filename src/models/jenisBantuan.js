const dbConn = require("./../../config/db.config");
// const bcrypt = require("bcrypt");

const addJenisBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM jenis_bantuan WHERE id = ? OR nama = ?`;
    const checkData = [body.id, body.nama];

    const qs = "INSERT INTO jenis_bantuan SET ?";
    
      dbConn.query(checkUser, checkData, (err, result) => {
        if (err) {
          reject({ status: 500 });
        } else {
          if (result.length > 0) {
            console.log(result);
            if (
              body.id === result[0].id &&
              body.nama === result[0].nama
            ) {
              reject({
                success: false,
                conflict: "id & nama jenis bantuan",
                msg: "Jenis Bantuan sudah tersedia",
                status: 409,
              });
            } else if (body.id === result[0].id) {
              reject({
                success: false,
                conflict: "id",
                msg: "id jenis bantuan sudah tersedia",
                status: 409,
              });
            } else if (body.nama === result[0].nama) {
              reject({
                success: false,
                conflict: "nama",
                msg: "jenis bantuan sudah tersedia",
                status: 409,
              });
            }
          } else if (result.length === 0) {
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

const getAllJenisBantuan = () => {
  const qs =
    "SELECt * from jenis_bantuan ";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
          return reject({
            status: 401,
            success: false,
            msg: "Jenis Bantuan Tidak Ditemukan",
          });
        resolve(result);
      }
    });
  });
};

const deleteJenisBantuan = (id) => {
  const qs = "DELETE FROM jenis_bantuan WHERE id = ?";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, id, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
          return reject({
            status: 404,
            success: false,
            msg: "data not found",
          });
        resolve(result);
      }
    });
  });
};


module.exports = {
  addJenisBantuan,
  getAllJenisBantuan,
  deleteJenisBantuan,
};