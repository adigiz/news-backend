const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

router.get("/api/users", userController.getAllUsers);
router.get("/api/users/:username", userController.getUserByUsername);
router.get("/api/users/:id", userController.getUserById);
router.put("/api/users/:username/update-password", userController.updatePassword);
router.delete("/api/users/:username", userController.deleteUser);

module.exports = router;
