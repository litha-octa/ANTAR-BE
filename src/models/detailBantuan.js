const dbConn = require("./../../config/db.config");
// const bcrypt = require("bcrypt");

const addPenerimaBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM penerima_bantuan WHERE code = ? OR nik = ?`;
    const checkData = [body.code, body.nik];

    const qs = "INSERT INTO penerima_bantuan SET ?";

    dbConn.query(checkUser, checkData, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length > 0) {
          console.log(result);
          if (body.code === result[0].code && body.nik ===result[0].nik) {
            reject({
              success: false,
              conflict: "code",
              msg: "data sudah tersedia",
              status: 409,
            });
          }else{
          dbConn.query(qs, body, (err, result) => {
            if (err) {
              reject({ status: 500 });
            } else {
              resolve(result);
            }
          });
        }
        }else if (result.length===0){
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

const addRelawanBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM relawan_bantuan WHERE code = ? OR id = ?`;
    const checkData = [body.code, body.id];

    const qs = "INSERT INTO relawan_bantuan SET ?";

    dbConn.query(checkUser, checkData, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length > 0) {
          console.log(result);
          if (body.code === result[0].code && body.id === result[0].id) {
            reject({
              success: false,
              conflict: "code",
              msg: "data sudah tersedia",
              status: 409,
            });
          }else{
            dbConn.query(qs, body, (err, result) => {
              if (err) {
                reject({ status: 500 });
              } else {
                resolve(result);
              }
            });
          }
        } else if (result.length===0) {
          dbConn.query(qs, body, (err, result) => {
            if (err) {
              reject({ status: 500 });
            } else {
              resolve(result);
            }
          });
        }
      }
    })})}

const addBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM detail_bantuan WHERE code = ?`;
    const checkData = [body.code];

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
              conflict: "code",
              msg: "data sudah tersedia",
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


const deleteDetailBantuan = (id) => {
  const qs =
    "DELETE FROM detail_bantuan WHERE code = ? ; DELETE FROM penerima_bantuan WHERE code = ?; DELETE FROM relawan_bantuan WHERE code = ?";
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

const getAllBantuan = () => {
  const qs ='SELECT detail_bantuan.code, detail_bantuan.title, jenis_bantuan.nama AS jenis, detail_bantuan.status, detail_bantuan.start_date, detail_bantuan.finish_date from detail_bantuan JOIN jenis_bantuan ON detail_bantuan.id_jenis = jenis_bantuan.id'
  return new Promise((resolve, reject) => {
    dbConn.query(qs, (err, result) => {
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

const getBantuanByCode = (id) => {
  const qs =
    "SELECT detail_bantuan.code, detail_bantuan.title, jenis_bantuan.nama AS jenis, detail_bantuan.status, detail_bantuan.start_date, detail_bantuan.finish_date from detail_bantuan JOIN jenis_bantuan ON detail_bantuan.id_jenis = jenis_bantuan.id WHERE detail_bantuan.code = ? ";
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

const getRelawanInEvent = (id) => {
      const qs =  "SELECT relawan_bantuan.code AS code ,relawan_bantuan.id AS id,relawan.name, relawan.phone, relawan.posda, relawan.area, relawan.recruitBy from relawan INNER JOIN relawan_bantuan ON relawan_bantuan.id = relawan.id WHERE (relawan_bantuan.code=? OR relawan_bantuan.id )";

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

// const getRiwayatBantuan = () => {
//   const qs =
//     "SELECT relawan_bantuan.code AS code ,relawan_bantuan.id AS id,relawan.name, relawan.phone, relawan.posda, relawan.area, relawan.recruitBy from relawan INNER JOIN relawan_bantuan ON relawan_bantuan.id = relawan.id WHERE (relawan_bantuan.code=? OR relawan_bantuan.id )";

//   return new Promise((resolve, reject) => {
//     dbConn.query(qs, (err, result) => {
//       if (err) {
//         reject({ status: 500 });
//       } else {
//         if (result.length === 0)
//           return reject({
//             status: 401,
//             success: false,
//             msg: "Data Bantuan Tidak Ditemukan",
//           });
//         resolve(result);
//       }
//     });
//   });
// };

module.exports = {
  addBantuan,
  addPenerimaBantuan,
  addRelawanBantuan,
  getAllBantuan,
  getBantuanByCode,
  getRelawanInEvent,
  deleteDetailBantuan,
};