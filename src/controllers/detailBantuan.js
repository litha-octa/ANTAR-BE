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

module.exports={
    addBantuan,
}