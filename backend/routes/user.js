let mongoose = require("mongoose"),
express = require("express"),
router = express.Router();

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')



// login route
router.post('/login', loginUser)


module.exports = router