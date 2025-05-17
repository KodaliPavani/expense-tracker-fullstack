const express = require("express");
const router = express.Router();
const { registerUser, loginUser , forgotPassword } = require("../controllers/userController");

router.post("/signUp", registerUser);
router.post("/signIn", loginUser);
router.get("/forgotpassword/:email", forgotPassword); 
module.exports = router;
