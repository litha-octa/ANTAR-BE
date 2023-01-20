//require("dotenv").config();
const express = require('express')
const router = express.Router()
const multerUpload = require("../middle/upload");


const auth = require("../controllers/auth");
const jenis = require('../controllers/jenisBantuan')
const detail = require("../controllers/detailBantuan"); 
const kabinda = require("../controllers/kabinda")
const posda = require("../controllers/posda");

//LOGIN
router.post("/login", auth.login);
//REGISTER
router.post("/register", auth.register);
//UPDATE
router.patch("/user/update/:id", multerUpload.any(), auth.updateUserById);
//GET USER BY ROLE
router.get("/user/role/:role", auth.getUserByRole);
//GET USER BY ID
router.get("/user/:id", auth.getUserById);
//GET ALL USER 
router.get("/user", auth.getAllUser);
// DELETE USER
router.delete('/user/delete/:id', auth.deleteUser);


//GET ALL JENIS bANTUAN
router.get("/jenis", jenis.getAllJenisBantuan);
//CREATE JENIS BANTUAN 
router.post("/jenis/create", jenis.addJenisBantuan);
//DELETE JENIS BANTUAN
router.delete("/jenis/delete/:id", jenis.deleteJenisBantuan);

//CREATE BANTUAN
router.post("/bantuan/create", multerUpload.any(), detail.addBantuan);
router.post("/bantuan/penerima", multerUpload.any(), detail.addPenerimaBantuan);
router.post("/bantuan/relawan", detail.addRelawanBantuan);
router.get("/bantuan/:id", detail.getBantuanByCode);
router.get("/bantuan", detail.getAllBantuan);
router.get("/bantuan/riwayat/:id", detail.getRelawanInEvent);

router.delete("/bantuan/delete/:id", detail.deleteAllDataBantuan);
router.delete("/bantuan/detail/:id", detail.deleteDetailBantuan);
router.delete("/bantuan/penerima/:id", detail.deleteDetailBantuan);
router.delete("/bantuan/relawan/:id", detail.deleteDetailBantuan);

router.post('/kabinda', kabinda.createKabinda);
router.patch("/kabinda/:id", multerUpload.any(), kabinda.updateKabindaById);
router.delete("/kabinda/:id", kabinda.deleteKabinda);
router.get("/kabinda/:id", kabinda.getKabindaById);
router.get("/kabinda", kabinda.getKabinda);

router.post ('/posda',posda.createPosda )
router.delete("/posda/:id", posda.deletePosda);
router.get("/posda/kabinda/:id", posda.getPosdaByKabinda);
router.get("/posda/:id", posda.getPosdaById);


module.exports = router;