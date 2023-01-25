const dbConn = require("./../../config/db.config");
const bcrypt = require("bcrypt");

const createRelawan = (body) => {
  return new Promise((resolve, reject) => {
    const { password } = body;
    const checkUser = `SELECT * FROM relawan WHERE username = ? OR phone = ?`;
    const checkData = [body.username, body.phone];

     const qs2 = "INSERT INTO user (id,username,password, phone,isVerify)  ?";
     const data = [
       body.id,
       body.username,
       body.password,
       body.phone,
       body.isVerify,
     ];
    const qs = "INSERT INTO relawan SET ?";
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
            } else if (body.username === result[0].username) {
              reject({
                success: false,
                conflict: "phone",
                msg: "Phone is already taken",
                status: 409,
              });
            } else if (body.phone === result[0].phone) {
              reject({
                success: false,
                conflict: "phone",
                msg: "Phone is already taken",
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
    
  });
};

const loginRelawan = (body) => {
  return new Promise((resolve, reject) => {
    const { username, password } = body;
    const qs =
      "SELECT relawan.id, relawan.username, relawan.password,  relawan.phone , relawan.isVerify ,relawan.avatar,role.name AS 'role' from relawan JOIN role ON relawan.role = role.id WHERE relawan.username = ?";

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

const updateRelawanById = (data, id) => {
  const qs = "UPDATE relawan SET ? WHERE id = ? ";
  const updated = [data, id];
  return new Promise((resolve, reject) => {
    data.password
      ? bcrypt.hash(data.password, 10, (err, encryptedPass) => {
          if (err) return reject({ status: 500 });

          data.password = encryptedPass;

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
      : dbConn.query(qs, updated, (err, result) => {
          if (err) {
            reject({ status: 500 });
          } else {
            resolve(result);
          }
        });
  });
};

const deleteRelawan = (id) => {
  const qs = "DELETE FROM relawan WHERE relawan.id = ?";
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

const getAllRelawan = () => {
  const qs =
    "SELECT relawan.id, relawan.username, relawan.avatar ,relawan.name , relawan.phone , relawan.isVerify, relawan.posda, relawan.kabinda, relawan.area, relawan.recruitBy ,role.name AS 'role' from relawan JOIN role ON relawan.role = role.id ";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
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

const getRelawanById = (id) => {
  const qs =
    "SELECT relawan.id, relawan.username, relawan.name , relawan.avatar,relawan.phone , relawan.isVerify, relawan.posda, relawan.kabinda, relawan.area, relawan.recruitBy ,role.name AS 'role' from relawan JOIN role ON relawan.role = role.id WHERE relawan.id = ?";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, id, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
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


const getRelawanByPosda = (id) => {
  const qs =
    "SELECT relawan.id, relawan.username, relawan.name , relawan.avatar, relawan.phone , relawan.isVerify, relawan.posda, relawan.kabinda, relawan.area, relawan.recruitBy ,role.name AS 'role' from relawan JOIN role ON relawan.role = role.id WHERE relawan.posda =?";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, id ,(err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
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

const getRelawanByKabinda = (id) => {
  const qs =
    "SELECT relawan.id, relawan.username, relawan.name , relawan.avatar, relawan.phone , relawan.isVerify, relawan.posda, relawan.kabinda, relawan.area, relawan.recruitBy ,role.name AS 'role' from relawan JOIN role ON relawan.role = role.id WHERE relawan.kabinda =?";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, id, (err, result) => {
      if (err) {
        reject({ status: 500 });
      } else {
        if (result.length === 0)
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
  createRelawan,
  loginRelawan,
  updateRelawanById,
  deleteRelawan,
  getAllRelawan,
  getRelawanById,
  getRelawanByPosda,
  getRelawanByKabinda,
};