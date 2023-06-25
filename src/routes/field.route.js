const express = require("express")
const validate = require('../middlewares/validate');
const fieldController = require('../controllers/field.controller');
const fieldValidation = require('../validations/field.validation');

const router = express.Router();

router.post("/", validate(fieldValidation.createFields), fieldController.createFields)

router.get("/", validate(fieldValidation.getAllFields), fieldController.getAllFields)

router.get("/:entity_type", validate(fieldValidation.getFieldsByEntity), fieldController.getFieldsByEntity)

module.exports = router;