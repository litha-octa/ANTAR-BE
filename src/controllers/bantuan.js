const { writeResponse, writeError } = require("../helpers/response");
const bantuan = require('../models/bantuan')

const addBantuan = (req, res) => {
  const { files } = req;
  const img = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body, img } : { ...req.body };
  bantuan
    .addBantuan(data)
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

const getAll= (req, res) => {
  bantuan
    .getAll()
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

const getbyCode = (req, res) => {
    const id = req.params.id
  bantuan
    .getbyCode(id)
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

const deleteBantuan = (req, res) => {
  const id = req.params.id;
  bantuan
    .deleteBantuan(id)
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

const update = (req, res) => {
  const { files } = req;
  const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
  const id = req.params.id;
  bantuan
    .update(data, id)
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



module.exports={
    addBantuan,
    getAll,
    getbyCode,
    deleteBantuan,
    update,
}

