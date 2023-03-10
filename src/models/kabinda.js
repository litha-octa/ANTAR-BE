const dbConn = require("./../../config/db.config");
const bcrypt = require("bcrypt");

const createKabinda = (body) => {
  return new Promise((resolve, reject) => {
    const { password } = body;
    const checkUser = `SELECT * FROM kabinda WHERE id = ? OR idWilayah = ?`;
    const checkData = [body.id, body.idWilayah];

    const qs = "INSERT INTO kabinda SET ?";
    bcrypt.hash(password, 10, (err, encryptedPass) => {
      if (err) return reject(err);

      body.password = encryptedPass;

      // dbConn.query(qs, body, (err, result) => {
      dbConn.query(checkUser, checkData, (err, result) => {
        if (err) {
          reject({ status: 500 });
        } else {
          if (result.length > 0) {
            console.log(result);
            if (
              body.username === result[0].username &&
              body.phone === result[0].phone
            ) {
              reject({
                success: false,
                conflict: "username and phone number",
                msg: "Username and Phone number is already taken",
                status: 409,
              });
            } else if (body.username === result[0].username || body.id === result[0].id) {
              reject({
                success: false,
                conflict: "username dan id",
                msg: "Username or id is already taken",
                status: 409,
              });
            } else if (body.phone === result[0].phone) {
              reject({
                success: false,
                conflict: "phone",
                msg: "Phone is already taken",
                status: 409,
              });
            } else if (
              body.idWilayah === result[0].idWilayah ||
              body.wilayah === result[0].wilayah
            ) {
              reject({
                success: false,
                conflict: "Wilayah",
                msg: "Wilayah is already taken",
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
  });
};
    

const loginKabinda = (body) => {
  return new Promise((resolve, reject) => {
    const { username, password } = body;
    const qs =
      "SELECT kabinda.id, kabinda.username, kabinda.name, kabinda.password,  kabinda.phone , kabinda.isVerify ,kabinda.idWilayah , kabinda.wilayah, kabinda.avatar,role.name AS 'role' from kabinda JOIN role ON kabinda.role = role.id WHERE kabinda.username = ?";

    dbConn.query(qs, username, (err, result) => {
      if (err) return reject({ msg: err, status: 500 });
      console.log(result);
      if (result.length === 0)
        return reject({ msg: "Username or Password is Wrong", status: 401 });
      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        // if (err) return reject({ msg: err, status: 500 });
        if (!isPasswordValid)
          return reject({ msg: "Username or Password is Wrong", status: 401 });
        const { id, username, role, phone, isVerify } = result[0];

        return resolve({ id, username, role, phone, isVerify });
      });
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
  loginKabinda,
  updateKabindaById,
  deleteKabinda,
  getKabindaById,
  getKabinda,
};