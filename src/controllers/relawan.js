const { writeResponse, writeError } = require("../helpers/response");
const relawan = require("../models/relawan");

const loginRelawan = (req, res) => {
  relawan
    .loginRelawan(req.body)
    .then((data) => {
      writeResponse(res, null, 200, {
        message: "Proses Login Berhasil",
        data,
      });
    })
    .catch((err) => {
      writeError(res, err.status, err.msg);
    });
};
const createRelawan = (req, res) => {
  relawan
    .createRelawan(req.body)
    .then(() => {
      writeResponse(res, null, 201, {
        message: "Akun Relawan Berhasil Terdaftar",
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};
const updateRelawanById = (req, res) => {
  const { files } = req;
  const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
  const userid = req.params.id;
  relawan
    .updateRelawanById(data, userid)
    .then((data) => {
      if (data.changedRows === 0) {
        writeResponse(res, null, 201, {
          message: "Tidak Ada Data yang Diperbaharui",
        });
      } else {
        writeResponse(res, null, 201, {
          message: "Data User Berhasil Diperbaharui",
        });
      }
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};
const getRelawanByKabinda = (req, res) => {
  const kabinda = req.params.kabinda;
  relawan
    .getRelawanByKabinda(kabinda)
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};
const getRelawanByPosda = (req, res) => {
  const posda = req.params.posda;
  relawan
    .getRelawanByPosda(posda)
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getRelawanById = (req, res) => {
  const id = req.params.id;
  relawan
    .getRelawanById(id)
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getAllRelawan = (req, res) => {
  relawan
    .getAllRelawan(req)
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};
const deleteRelawan = (req, res) => {
  const id = req.params.id;
    relawan
    .deleteRelawan(id)
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
  loginRelawan,
  createRelawan,
  updateRelawanById,
  getRelawanByKabinda,
  getRelawanByPosda,
  getRelawanById,
  getAllRelawan,
  deleteRelawan,
};