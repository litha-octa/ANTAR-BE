const { writeResponse, writeError } = require("../helpers/response");
const authModel = require("../models/auth");

const login = (req, res) => {
    authModel
        .login(req.body)
        .then((data) => {
            writeResponse(res, null, 200, {
                message: 'Proses Login Berhasil',
                data
            });
        })
        .catch((err) => {
            writeError(res, err.status, err.msg);
        });
};

const register = (req, res) => {
    authModel
        .register(req.body)
        .then(() => {
            writeResponse(res, null, 201, {
                message: "Register User Berhasil",
            });
        })
        .catch((err) => {
            writeError(res, 500, err);
        });
};

const updateUserById = (req, res) => {
  const { files } = req;
      const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
      const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
      const userid = req.params.id;
  authModel
    .updateUserById(data, userid)
    .then((data) => {
        if (data.changedRows === 0){ 
          writeResponse(res, null, 201, {
            message: "Tidak Ada Data yang Diperbaharui",
          });
        }else{
            writeResponse(res, null, 201, {
              message: "Data User Berhasil Diperbaharui",
            });
        }
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getUserByRole = (req, res) => {
  const role = req.params.role;
  authModel
    .getUserByRole(role)
    .then((data) => {
        writeResponse(res, null, 201, {
          data,
        });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const deleteUser = (req, res) => {
  const id = req.params.id;
  authModel
    .deleteUser(id)
    .then((data) => {
        if (data.affectedRows === 0) {
          writeError(res, 500, {
            message: "Id user tidak ditemukan, Tidak ada akun yang terhapus",
          });
        } else if (data.affectedRows !== 0) {
          writeResponse(res, null, 201, {
            message: "Akun Berhasil Dihapus",
            data,
          });
        }
      
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

module.exports = {
  login,
  register,
  updateUserById,
  getUserByRole,
  deleteUser,
};