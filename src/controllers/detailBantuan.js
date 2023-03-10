const { writeResponse, writeError } = require("../helpers/response");
const detail = require("../models/detailBantuan");

const addBantuan = (req, res) => {
   const { files } = req;
   const img = files.length > 0 ? `/images/${files[0].filename}` : null;
   const data = files.length > 0 ? { ...req.body, img } : { ...req.body };
  detail
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

const addPenerimaBantuan = (req, res) => {
  const { files } = req;
  const img = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body, img } : { ...req.body };
  // const data = req.body
  detail
    .addPenerimaBantuan(data)
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

const addRelawanBantuan = (req, res) => {
  detail
    .addRelawanBantuan(req.body)
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

const getAllPenerima = (req, res) => {
  detail
    .getAllPenerima()
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

const getPenerimaByCode = (req, res) => {
  const id = req.params.id
  detail
    .getPenerimaByCode(id)
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

const getPenerimaByNik = (req, res) => {
  const id = req.params.id;
  detail
    .getPenerimaByNik(id)
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

const getBantuanByStatus = (req, res) => {
  const id = req.params.id;
  detail
    .getBantuanByStatus(id)
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


const getRelawanInEvent = (req, res) => {
  // const id = req.params.id;
  detail
    .getRelawanInEvent()
    .then((data) => {
      writeResponse(res, null, 201, {
        message: "Data Relawan Berhasil Ditemukan",
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

const deletePenerimaBantuan = (req, res) => {
  const id = req.params.id;
  detail
    .deletePenerimaBantuan(id)
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
const deleteRelawanBantuan = (req, res) => {
  const id = req.params.id;
  detail
    .deleteRelawanBantuan(id)
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

const deleteAllDataBantuan = (req, res) => {
  const id = req.params.id;
  detail
    .deleteAllDataBantuan(id)
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

const updateByCode = (req, res) => {
  const { files } = req;
  const img = files.length > 0 ? `/images/${files[0].filename}` : null;
  const data = files.length > 0 ? { ...req.body,img } : { ...req.body };
  const userid = req.params.id;
 detail
    .updateByCode(data, userid)
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


module.exports = {
  addBantuan,
  addPenerimaBantuan,
  addRelawanBantuan,
  getAllBantuan,
  getAllPenerima,
  getPenerimaByCode,
  getPenerimaByNik,
  getBantuanByCode,
  getRelawanInEvent,
  deleteDetailBantuan,
  deletePenerimaBantuan,
  updateByCode,
  deleteRelawanBantuan,
  deleteAllDataBantuan,
  getBantuanByStatus,
  
};