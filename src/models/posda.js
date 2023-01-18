const dbConn = require("./../../config/db.config");

const createPosda = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM kabinda WHERE id = ?`;
    const checkData = [body.idKabinda];

    const qs = "INSERT INTO posda SET ?";

    dbConn.query(checkUser, checkData, (err, result) => {
      if (err) {
        reject({
          success: false,
          conflict: "nama posda",
          msg: "nama posda sudah terdaftar",
          status: 500,
        });
      } else {
        if (
          result.length > 0 &&
          result[0].id.toString() === body.idKabinda.toString()
        ) {
          dbConn.query(qs, body, (err, result) => {
            if (err) {
              reject({
                success: false,
                conflict: "id kabinda",
                msg: "id kabinda duplikat",
                status: 500,
              });
            } else {
              resolve(result);
            }
          });
        } else if (
          result.length > 0 &&
          result[0].id.toString() !== body.idKabinda.toString()
        ) {
          reject({
            success: false,
            conflict: "id kabinda",
            msg: "id kabinda tidak cocok",
            status: 409,
          });
        } else{
          reject({
            success: false,
            conflict: "id kabinda",
            msg: "id kabinda tidak ditemukan",
            status: 409,
          })
        }
    }})})}

    const deletePosda = (id) => {
      const qs =
        "DELETE FROM posda WHERE id = ?";
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

const getPosdaByKabinda = (id) => {
  const qs =
    "SELECT posda.id, posda.name, posda.idKabinda, kabinda.name AS kabinda FROM posda JOIN kabinda ON posda.idKabinda = kabinda.id WHERE posda.idKabinda =? ";
  return new Promise((resolve, reject) => {
    dbConn.query(qs,id, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
          return reject({
            status: 401,
            success: false,
            msg: "Data Bantuan Tidak Ditemukan",
          });
        resolve(result);
      }
    });
  });
};

const getPosdaById = (id) => {
  const qs =
    "SELECT posda.id, posda.name, posda.idKabinda, kabinda.name AS kabinda FROM posda JOIN kabinda ON posda.idKabinda = kabinda.id WHERE posda.id =? ";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, id, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
          return reject({
            status: 401,
            success: false,
            msg: "Data Bantuan Tidak Ditemukan",
          });
        resolve(result);
      }
    });
  });
};


module.exports = {
  createPosda,
  // getAll,
  getPosdaById,
  getPosdaByKabinda,
  // updateById,
  deletePosda,
};
