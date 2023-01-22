const dbConn = require("./../../config/db.config");
const bcrypt = require("bcrypt");


const createPosda = (body) => {
  return new Promise((resolve, reject) => {
   const { password } = body;
    const checkUser = `SELECT * FROM kabinda WHERE id = ?`;
    const checkData = [body.idKabinda];

    const qs = "INSERT INTO posda SET ?";
bcrypt.hash(password, 10, (err, encryptedPass) => {
      if (err) return reject(err);

      body.password = encryptedPass;
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
    }})})})}

    const loginPosda = (body) => {
      return new Promise((resolve, reject) => {
        const { username, password } = body;
        const qs =
          "SELECT posda.id, posda.username, posda.name, posda.password,  posda.phone , posda.isVerify , posda.avatar , posda.role FROM posda WHERE posda.username=?";

        dbConn.query(qs, username, (err, result) => {
          if (err) return reject({ msg: err, status: 500 });
          console.log(result);
          if (result.length === 0)
            return reject({
              msg: "Username or Password is Wrong",
              status: 401,
            });
          bcrypt.compare(
            password,
            result[0].password,
            (err, isPasswordValid) => {
              // if (err) return reject({ msg: err, status: 500 });
              if (!isPasswordValid)
                return reject({
                  msg: "Username or Password is Wrong",
                  status: 401,
                });
              const { id, username, role, phone, isVerify } = result[0];

              return resolve({ id, username, role, phone, isVerify });
            }
          );
        });
      });
    };


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
    "SELECT posda.id, posda.name, posda.username, posda.phone, posda.isVerify, posda.avatar, posda.role, role.name AS role, posda.idKabinda, kabinda.name AS kabinda FROM posda JOIN kabinda ON posda.idKabinda = kabinda.id JOIN role ON posda.role = role.id WHERE posda.idKabinda =? ";
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
    "SELECT posda.id, posda.name, posda.username, posda.phone, posda.isVerify, posda.avatar, posda.role, role.name AS role, posda.idKabinda, kabinda.name AS kabinda FROM posda JOIN kabinda ON posda.idKabinda = kabinda.id JOIN role ON posda.role = role.id WHERE posda.id =? ";
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

const getAllPosda = () => {
  const qs =
    "SELECT posda.id, posda.name, posda.username, posda.phone, posda.isVerify, posda.avatar, posda.role, role.name AS role, posda.idKabinda, kabinda.name AS kabinda FROM posda JOIN kabinda ON posda.idKabinda = kabinda.id JOIN role ON posda.role = role.id";
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

const updatePosdaById = (data, id) => {
  const qs = "UPDATE posda SET ? WHERE id = ? ";
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
  });
};


module.exports = {
  createPosda,
  loginPosda,
  getAllPosda,
  getPosdaById,
  getPosdaByKabinda,
  updatePosdaById,
  deletePosda,
};
