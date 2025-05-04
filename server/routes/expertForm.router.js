const express = require('express');
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const expertFormController = require("../controller/Customer/expertForm.controller");
const expertFormAdminController = require("../controller/Admin/formManage.controller");
//Customer
router.post("/create", expertFormController.sendExpertForm);

//Admin
router.get("/", expertFormAdminController.getExpertForm);
router.delete("/:id", expertFormAdminController.deleteExpertForm);
router.post("/reply/:rid", [authMiddleware], expertFormAdminController.replyExpertForm);

module.exports = router;