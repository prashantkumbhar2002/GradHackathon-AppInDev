const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post('/getUserData', authMiddleware, authController)

router.post('/apply-doctor', authMiddleware, applyDoctorController)

router.post('/get-all-notification', authMiddleware, getAllNotificationController)

router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)



module.exports = router;
