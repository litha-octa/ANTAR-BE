//require("dotenv").config();
const express = require('express')
const router = express.Router()
const multerUpload = require("../middle/upload");


const auth = require("../controllers/auth");
const jenis = require("../controllers/jenisBantuan");

//LOGIN
router.post("/login", auth.login);
//REGISTER
router.post("/register", auth.register);
//UPDATE
router.patch("/user/update/:id", multerUpload.any(), auth.updateUserById);
//GET USER BY ROLE
router.get("/user/role/:role", auth.getUserByRole);
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



// // UPDATE Profile
// router.patch('/user/update/:id', multerUpload.any(), profile.updateUserById);
// //GET USER BY NIK
// router.get("/user/:nik", profile.getUserByNik);
// //GET ALL USER
// router.get("/user", profile.getAllUser);

// //GET REVIEW BY ID
// router.post("/user-review/create/", review.createReview);
// router.get("/user-review/by/:id", review.getReviewByUser);
// router.get("/user-review/:id", review.getReviewById);

// router.get("/user-review", review.getAllReview);


// router.get('/sentiment-data/:id', sentiment.getCountSentiment);

// router.get("/user/:nik", profile.getUserToken);


module.exports = router;