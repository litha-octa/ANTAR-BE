const dbConn = require("./../../config/db.config");
// const bcrypt = require("bcrypt");

const createKabinda = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM kabinda WHERE id = ? OR idWilayah = ?`;
    const checkData = [body.id, body.idWilayah];

    const qs = "INSERT INTO kabinda SET ?";

    dbConn.query(checkUser, checkData, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length > 0) {
          console.log(result);
          if (
            body.id === result[0].id &&
            body.idWilayah === result[0].idWilayah
          ) {
            reject({
              success: false,
              conflict: "id kabinda dan id wilayah",
              msg: "kabinda sudah tersedia",
              status: 409,
            });
          } else if (body.id === result[0].id) {
            reject({
              success: false,
              conflict: "id",
              msg: "id kabinda sudah tersedia",
              status: 409,
            });
          } else if (body.idWilayah === result[0].idWilayah) {
            reject({
              success: false,
              conflict: "id wilayah",
              msg: "id wilayah sudah tersedia",
              status: 409,
            });
          }
        } else {
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

const updateKabindaById = (data, id) => {
  const qs = "UPDATE kabinda SET ? WHERE id = ? ";
  const updated = [data, id];
  return new Promise((resolve, reject) => {
          dbConn.query(qs, updated, (err, result) => {
            if (err) {
              reject({
                status: 500,
              });
            } else {
              if (result.affectedRows === 0)
                return reject({
                  status: 401,
                  success: false,
                  msg: "This account does not exist",
                });
              resolve(result);
            }
          });
        })
};

const deleteKabinda = (id) => {
  const qs = "DELETE FROM kabinda WHERE id = ?";
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

const getKabindaById = (id) => {
  const qs = "SELECT * FROM kabinda WHERE id = ?";
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

const getKabinda = () => {
  const qs = "SELECT * FROM kabinda ";
  return new Promise((resolve, reject) => {
    dbConn.query(qs,  (err, result) => {
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
  createKabinda,
  updateKabindaById,
  deleteKabinda,
  getKabindaById,
  getKabinda,
};