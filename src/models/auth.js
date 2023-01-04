const dbConn = require("./../../config/db.config");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { password } = body;
    const checkUser = `SELECT * FROM user WHERE username = ? OR phone = ?`;
    const checkData = [body.username, body.phone];

    const qs = "INSERT INTO user SET ?";
    bcrypt.hash(password, 10, (err, encryptedPass) => {
      if (err) return reject(err);

      body.password = encryptedPass;

      // dbConn.query(qs, body, (err, result) => {
      dbConn.query(checkUser, checkData, (err, result) => {
        if (err) {
          reject({ status: 500 });
        } else {
          if(result.length > 0){ 
            console.log(result)
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
          
          }else if (result.length===0){
              dbConn.query(qs, body, (err, result) => {
                if (err) {
                  reject({ status: 500 });
                } else {
                  resolve(result);
                }
              });
            
        }}
      });
    });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { username, password } = body;
    const qs =
      "SELECT user.id, user.username, user.password, role.name AS 'role' from user JOIN role ON user.role = role.id WHERE user.username = ?";

    dbConn.query(qs, username, (err, result) => {
      if (err) return reject({ msg: err, status: 500 });
      console.log(result);
      if (result.length === 0)
        return reject({ msg: "Username or Password is Wrong", status: 401 });
      bcrypt.compare(password, result[0].password, (err, isPasswordValid) => {
        // if (err) return reject({ msg: err, status: 500 });
        if (!isPasswordValid)
          return reject({ msg: "Username or Password is Wrong", status: 401 });
        const { id, username, role } = result[0];

        return resolve({ id, username, role });
      });
    });
  });
};

const updateUserById = (data, id) => {
    const qs = 'UPDATE user SET ? WHERE id = ? ';
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
                                msg: 'This account does not exist',
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

const deleteUser = (id) => {
  const qs =
    "DELETE FROM user WHERE user.id = ?";
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

const getUserByRole = (role) => {
  const qs =
    "SELECT user.id, user.username, role.name AS 'role' from user JOIN role ON user.role = role.id WHERE user.role = ?";
  return new Promise((resolve, reject) => {
    dbConn.query(qs, role, (err, result) => {
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
  login,
  register,
  updateUserById,
  getUserByRole,
  deleteUser,
};
