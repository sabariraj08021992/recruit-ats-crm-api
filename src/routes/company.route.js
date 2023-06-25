const express = require("express")
const validate = require('../middlewares/validate');
const { companyController } = require('../controllers');
const { companyValidation } = require('../validations');

const router = express.Router();

router.post("/getCompanies", validate(companyValidation.getCompanies), companyController.getCompanies)

router.post("/fetch", validate(companyValidation.getCompaniesWithFilterSort), companyController.getCompaniesWithFilterSort)

router.post("/", companyValidation.createCompany, companyController.createCompany)

router.get("/:companyId", validate(companyValidation.getCompanyById), companyController.getCompanyById)

router.post("/:companyId", companyValidation.updateCompanyById, companyController.updateCompanyById)

router.delete("/:companyId", validate(companyValidation.deleteCompanyById), companyController.deleteCompanyById)

router.post("/bulk_process/insertCompanies", validate(companyValidation.bulkInsertCompanies), companyController.bulkInsertCompanies)

router.post("/bulk_process/updateCompanies", validate(companyValidation.bulkUpdateCompanies), companyController.bulkUpdateCompanies)

router.post("/bulk_process/deleteCompanies", validate(companyValidation.bulkDeleteCompanies), companyController.bulkDeleteCompanies)

module.exports = router;