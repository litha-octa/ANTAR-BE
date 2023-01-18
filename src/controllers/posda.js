const { writeResponse, writeError } = require("../helpers/response");
const posda = require("../models/posda");

const createPosda = (req, res) => {
  posda
    .createPosda(req.body)
    .then((data) => {
      writeResponse(res, null, 200, {
        message: "Data posda berhasil tersimpan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, err.status, err.msg);
    });
};

const deletePosda = (req, res) => {
  const id = req.params.id;
  posda
    .deletePosda(id)
    .then((data) => {
      if (data.affectedRows === 0) {
        writeError(res, 500, {
          message:
            "Id Posda tidak ditemukan, Tidak ada data Posda yang terhapus",
        });
      } else if (data.affectedRows !== 0) {
        writeResponse(res, null, 201, {
          message: "Data Posda Berhasil Dihapus",
          data,
        });
      }
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};

const getPosdaByKabinda = (req, res) => {
  const id = req.params.id;
  posda
    .getPosdaByKabinda(id)
    .then((data) => {
      writeResponse(res, null, 201, {
        message: " Posda Berhasil Ditemukan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};



const getPosdaById = (req, res) => {
  const id = req.params.id;
  posda
    .getPosdaById(id)
    .then((data) => {
      writeResponse(res, null, 201, {
        message: " Posda Berhasil Ditemukan",
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};


module.exports={
    createPosda,
    deletePosda,
    getPosdaById,
    getPosdaByKabinda,
}
