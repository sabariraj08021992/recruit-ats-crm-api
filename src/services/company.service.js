const httpStatus = require('http-status');
const { getCompanyModel } = require('../models/company.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} company
 * @returns {Promise<Company>}
 */
const createCompany = async (body) => {
    const Company = await getCompanyModel()    
    return Company.create(body);
};

/**
 * Query for fields
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const fetchCompanies = async (filter, options) => {
    const Company = await getCompanyModel()
    const companies = Company.paginate(filter, options);
    return companies;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getCompanyById = async (id) => {
    const Company = await getCompanyModel()
    const company = Company.findById(id)
    if (!company) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
    }
    return company;
};

/**
 * Update company by id
 * @param {ObjectId} companyId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateCompanyById = async (companyId, updateBody) => {
    const Company = await getCompanyModel()
    const company = await getCompanyById(companyId);
    const filter = { "_id": companyId };
    const update = updateBody
    const opts = { new: true };
    const updatedCompany = await Company.findOneAndUpdate(filter,update,opts)
    return updatedCompany;
};

/**
 * Delete company by id
 * @param {ObjectId} companyId
 * @returns {Promise<Company>}
 */
const deleteCompanyById = async (companyId) => {
    const company = await getCompanyById(companyId);
    if (!company) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Company not found');
    }
    await company.deleteOne();
    return company;
};

/**
 * BulkInsertCompanies
 * @param {Array} companyArray
 * @returns {Promise<Company>}
 */
const bulkInsertCompanies = async (companyArray) => {
    const Company = await getCompanyModel();
    const response = Company.insertMany(
        companyArray,
        {
            writeConcern:true,
            ordered:false
        }
    )
    // console.log(response)
    return response
};

/**
 * bulkUpdateCompanies
 * @param {Object} inputArr
 * @returns {Promise<Company>}
 */
const bulkUpdateCompanies = async (obj) => {
    const Company = await getCompanyModel();
    const response = Company.updateMany(
        {
            _id: {$in: obj['ids']}
        },
        {
            $set: obj['set'],
        },
        {
            writeConcern:true
        }
    )
    return response
};

/**
 * bulkDeleteCompanies
 * @param {inputArr} inputArr
 * @returns {Promise<Company>}
 */
const bulkDeleteCompanies = async (obj) => {
    const Company = await getCompanyModel();
    const response = Company.deleteMany(
        {
            _id: {$in: obj['ids']}
        },
        {
            writeConcern:true
        }
    )
    return response
};

module.exports = {
    createCompany,
    fetchCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById,
    bulkInsertCompanies,
    bulkUpdateCompanies,
    bulkDeleteCompanies
};
  