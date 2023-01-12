const { writeResponse, writeError } = require("../helpers/response");
const kabindaModel = require("../models/kabinda");

const createKabinda = (req, res) => {
  kabindaModel
    .createKabinda(req.body)
    .then(() => {
      writeResponse(res, null, 201, {
        message: "akun kabinda Berhasil Ditambah",
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const updateKabindaById = (req, res) => {
//   const { files } = req;
//   const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
//   const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
const data = req.body
  const userid = req.params.id;
  kabindaModel
    .updateKabindaById(data, userid)
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

const deleteKabinda = (req, res) => {
  const id = req.params.id;
  kabindaModel
    .deleteKabinda(id)
    .then((data) => {
      if (data.affectedRows === 0) {
        writeError(res, 500, {
          message: "Id kabinda tidak ditemukan, Tidak ada akun yang terhapus",
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

const getKabindaById = (req, res) => {
  const id = req.params.id;
  kabindaModel
    .getKabindaById(id)
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getKabinda = (req, res) => {
  kabindaModel
    .getKabinda()
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

module.exports = {
  createKabinda,
  updateKabindaById,
  deleteKabinda,
  getKabindaById,
  getKabinda,
};