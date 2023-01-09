const { writeResponse, writeError } = require("../helpers/response");
const detail = require("../models/detailBantuan");

const addBantuan = (req, res) => {
  detail
    .addBantuan(req.body)
    .then((data) => {
      writeResponse(res, null, 200, {
        message: "Data pemberian bantuan berhasil tersimpan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, err.status, err.msg);
    });
};

const addPenerimaBantuan = (req, res) => {
  detail
    .addPenerimaBantuan(req.body)
    .then((data) => {
      writeResponse(res, null, 200, {
        message: "Data pemberian bantuan berhasil tersimpan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, err.status, err.msg);
    });
};


const getAllBantuan = (req, res) => {
  detail
    .getAllBantuan()
    .then((data) => {
      writeResponse(res, null, 201, {
        message: " Bantuan Berhasil Ditemukan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getBantuanByCode = (req, res) => {
  const id = req.params.id
  detail
    .getBantuanByCode(id)
    .then((data) => {
      writeResponse(res, null, 201, {
        message: " Bantuan Berhasil Ditemukan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const deleteDetailBantuan = (req, res) => {
  const id = req.params.id;
  detail
    .deleteDetailBantuan(id)
    .then((data) => {
      if (data.affectedRows === 0) {
        writeError(res, 500, {
          message:
            "Id Bantuan tidak ditemukan, Tidak ada detail bantuan yang terhapus",
        });
      } else if (data.affectedRows !== 0) {
        writeResponse(res, null, 201, {
          message: "Data Bantuan  Berhasil Dihapus",
          data,
        });
      }
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};


module.exports = {
  addBantuan,
  addPenerimaBantuan,
  getAllBantuan,
  getBantuanByCode,
  deleteDetailBantuan,
};