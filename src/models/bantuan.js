const dbConn = require("./../../config/db.config");

const addBantuan = (body) => {
  return new Promise((resolve, reject) => {
    const checkUser = `SELECT * FROM bantuan WHERE code = ?`;
    const checkData = [body.code];

    const qs = "INSERT INTO bantuan SET ?";

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
          } else {
            dbConn.query(qs, body, (err, result) => {
              if (err) {
                reject({ status: 500 });
              } else {
                resolve(result);
              }
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

const deleteBantuan = (id) => {
  const qs = "DELETE FROM bantuan WHERE code = ? ";
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

const getAll = () => {
  const qs = "SELECT * from bantuan";
  // "SELECT detail_bantuan.code, detail_bantuan.title, jenis_bantuan.nama AS jenis, detail_bantuan.status, detail_bantuan.start_date, detail_bantuan.finish_date from detail_bantuan JOIN jenis_bantuan ON detail_bantuan.id_jenis = jenis_bantuan.id";
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

const getbyCode = (id) => {
  const qs = "SELECT * from bantuan WHERE code = ?";
  // "SELECT detail_bantuan.code, detail_bantuan.title, jenis_bantuan.nama AS jenis, detail_bantuan.status, detail_bantuan.start_date, detail_bantuan.finish_date from detail_bantuan JOIN jenis_bantuan ON detail_bantuan.id_jenis = jenis_bantuan.id";
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

const update = (data, id) => {
  const qs = "UPDATE bantuan SET ? WHERE code = ? ";
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
                  msg: "data does not exist",
                });
              resolve(result);
            }
          });
        // })
    //   : dbConn.query(qs, updated, (err, result) => {
    //       if (err) {
    //         reject({ status: 500 });
    //       } else {
    //         resolve(result);
    //       }
    //     });
  });
};




module.exports={
    addBantuan,
    deleteBantuan,
    getAll,
    getbyCode,
    update,
}