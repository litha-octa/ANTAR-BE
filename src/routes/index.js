//require("dotenv").config();
const express = require('express')
const router = express.Router()
const multerUpload = require("../middle/upload");


const auth = require("../controllers/auth");
const jenis = require('../controllers/jenisBantuan')
const detail = require("../controllers/detailBantuan"); 
const kabinda = require("../controllers/kabinda")
const posda = require("../controllers/posda");
const relawan = require("../controllers/relawan");
const newTask = require ('../controllers/bantuan')

//LOGIN
router.post("/login", auth.login);
//REGISTER
router.post("/register", multerUpload.any(), auth.register);
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
router.get("/bantuan/status/:id", detail.getBantuanByStatus);
router.get("/bantuan", detail.getAllBantuan);
router.get("/bantuan/penerima", detail.getAllPenerima);
router.get("/bantuan/riwayat/:id", detail.getRelawanInEvent);

router.delete("/bantuan/delete/:id", detail.deleteAllDataBantuan);
router.delete("/bantuan/detail/:id", detail.deleteDetailBantuan);
router.delete("/bantuan/penerima/:id", detail.deleteDetailBantuan);
router.delete("/bantuan/relawan/:id", detail.deleteDetailBantuan);

router.post("/kabinda", kabinda.createKabinda);
router.post('/kabinda/auth', kabinda.loginKabinda);
router.patch("/kabinda/:id", multerUpload.any(), kabinda.updateKabindaById);
router.delete("/kabinda/:id", kabinda.deleteKabinda);
router.get("/kabinda/:id", kabinda.getKabindaById);
router.get("/kabinda", kabinda.getKabinda);

router.post ('/posda',posda.createPosda)
router.post("/posda/auth", posda.loginPosda);
router.delete("/posda/:id", posda.deletePosda);
router.patch("/posda/:id", multerUpload.any(), posda.updatePosdaById);
router.get("/posda/kabinda/:id", posda.getPosdaByKabinda);
router.get("/posda/:id", posda.getPosdaById);
router.get("/posda", posda.getAllPosda);

router.post("/relawan", multerUpload.any(), relawan.createRelawan);
router.post("/relawan/auth", relawan.loginRelawan);
router.delete("/relawan/:id", relawan.deleteRelawan);
router.patch("/relawan/:id", multerUpload.any(), relawan.updateRelawanById);
router.get("/relawan", relawan.getAllRelawan);
router.get("/relawan/:id", relawan.getRelawanById);
router.get("/relawan/posda/:posda", relawan.getRelawanByPosda);
router.get("/relawan/kabinda/:kabinda", relawan.getRelawanByKabinda);

router.post("/new", multerUpload.any(), newTask.addBantuan);
router.patch("/new/:id", multerUpload.any(), newTask.update);
router.delete("/new/:id", newTask.deleteBantuan);
router.get("/new", newTask.getAll);
router.get("/new/:id", newTask.getbyCode);

module.exports = router;