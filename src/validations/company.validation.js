const Joi = require('joi');
const validator = require('../utils/validate');
const { generateDynamicFormValidatorSchema } = require("./dynamic-form.validation")

const { password, objectId } = require('./custom.validation');

const getCompanies = {
    query: Joi.object().keys({
        sort_by:Joi.string().optional(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    })
};

const getCompaniesWithFilterSort = {
    body: Joi.object().keys({
        filterModel: Joi.array().optional(),
        sortModel: Joi.array().optional(),
        limit:Joi.number().optional(),
        page:Joi.number().optional()
    })
}

const createCompany = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("company")
    validationRule = {
        ...validationRule,
    } 
    const { status, errors } = await validator(req.body, validationRule, {})
    if (!status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: errors
            });
    } else {
        next();
    }
};

const getCompanyById = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId),
    }),
};

const updateCompanyById = async (req, res, next) => {
    validationRule = await generateDynamicFormValidatorSchema("company")
    validationRule = {
        ...validationRule,
    }
    const { status: paramStatus, errors: paramErrors } = await validator(req.params, {
        companyId: "objectId"
    }, {})    
    const { status, errors } = await validator(req.body, validationRule, {})
    if (!paramStatus || !status) {
        res.status(412)
            .send({
                success: false,
                message: 'Validation failed',
                data: [...paramErrors, errors]
            });
    } else {
        next();
    }
};

const deleteCompanyById = {
    params: Joi.object().keys({
        companyId: Joi.string().custom(objectId),
    }),
};

const bulkInsertCompanies = {
    body: Joi.object().keys({
        companyArray: Joi.array().required()
      }),
};

const bulkUpdateCompanies = {
    body: Joi.object().keys({
        ids: Joi.array().required(),
        set:Joi.object().required()
      }),
};

const bulkDeleteCompanies = {
    body: Joi.object().keys({
        ids: Joi.array().required()
      }),
};
  
module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    getCompaniesWithFilterSort,
    updateCompanyById,
    deleteCompanyById,
    bulkInsertCompanies,
    bulkUpdateCompanies,
    bulkDeleteCompanies
};
  