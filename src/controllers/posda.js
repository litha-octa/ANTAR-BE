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
       writeError(res, 500, err);
      // writeError(err.status, err.msg);
    });
};

const loginPosda = (req, res) => {
  posda
    .loginPosda(req.body)
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

const updatePosdaById = (req, res) => {
  const { files } = req;
  const avatar = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body, avatar } : { ...req.body };
  // const data = req.body
  const userid = req.params.id;
  posda
    .updatePosdaById(data, userid)
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


const getAllPosda = (req, res) => {
  posda
    .getAllPosda()
    .then((data) => {
      writeResponse(res, null, 201, {
        data,
      });
    })
    .catch((err) => {
      writeError(res, 500, err);
    });
};


module.exports={
    createPosda,
    loginPosda,
    deletePosda,
    updatePosdaById,
    getAllPosda,
    getPosdaById,
    getPosdaByKabinda,
}
