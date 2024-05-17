const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, getAllDoctorsController } = require('../controllers/adminCtrl');
const router = express.Router();

//get all users 
module.exports = router.get('/getAllUsers', authMiddleware, getAllUsersController);

module.exports = router.get('/getAllDoctors',authMiddleware, getAllDoctorsController);