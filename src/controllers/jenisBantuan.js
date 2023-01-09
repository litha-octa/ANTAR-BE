const { writeResponse, writeError } = require("../helpers/response");
const jenis = require('../models/jenisBantuan')

const addJenisBantuan = (req, res) => {
 jenis
    .addJenisBantuan(req.body)
    .then(() => {
      writeResponse(res, null, 201, {
        message: "Jenis Bantuan Berhasil Ditambah",
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getAllJenisBantuan = (req, res) => {
  jenis
    .getAllJenisBantuan()
    .then((data) => {
      writeResponse(res, null, 201, {
        message: "Jenis Bantuan Berhasil Ditemukan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const deleteJenisBantuan = (req, res) => {
  const id = req.params.id;
  jenis
    .deleteJenisBantuan(id)
    .then((data) => {
      if (data.affectedRows === 0) {
        writeError(res, 500, {
          message: "Id Bantuan tidak ditemukan, Tidak ada jenis bantuan yang terhapus",
        });
      } else if (data.affectedRows !== 0) {
        writeResponse(res, null, 201, {
          message: "Jenis Bantuan  Berhasil Dihapus",
          data,
        });
      }
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

module.exports = {
  addJenisBantuan,
  getAllJenisBantuan,
  deleteJenisBantuan,
};