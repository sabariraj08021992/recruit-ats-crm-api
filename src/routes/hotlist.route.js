const express = require("express")
const validate = require('../middlewares/validate');
const { hotlistController } = require('../controllers');
const { hotlistValidation } = require('../validations');

const router = express.Router();

router.post("/fetch", validate(hotlistValidation.getHotlistsWithFilterSort), hotlistController.getHotlistsWithFilterSort)

router.post("/", validate(hotlistValidation.createHotlist), hotlistController.createHotlist)

router.get("/:hotlistId", validate(hotlistValidation.getHotlistById), hotlistController.getHotlistById)

router.post("/:hotlistId", validate(hotlistValidation.updateHotlistById), hotlistController.updateHotlistById)

router.delete("/:hotlistId", validate(hotlistValidation.deleteHotlistById), hotlistController.deleteHotlistById)

module.exports = router;