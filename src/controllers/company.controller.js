const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sortModel = require('../utils/sortModel');
const filterModel = require('../utils/filterModel');
const catchAsync = require('../utils/catchAsync');
const { companyService,fieldService } = require('../services');

const getCompanies = catchAsync(async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sort_by','limit', 'page']);
    options.populate = "company_owner"
    const result = await companyService.fetchCompanies(filter, options);
    res.status(httpStatus.OK).send(result);
});

const getCompaniesWithFilterSort = catchAsync(async (req, res) => {
    let filter = {};
    if(req.body.filterModel){
        filter = filterModel(req.body.filterModel);
    }
    let options = {}
    if(req.body.sortModel){
        options['sort_by'] = sortModel(req.body.sortModel);
    }
    if(req.body.limit){
        options['limit'] = req.body.limit
    }
    if(req.body.page){
        options['page'] = req.body.page
    }
    options['populate'] = "company_owner"
    const result = await companyService.fetchCompanies(filter, options);
    res.status(httpStatus.OK).send(result);
});

const createCompany = catchAsync(async (req, res) => {
    const field = await companyService.createCompany(req.body)
    res.status(httpStatus.CREATED).send(field);
})

const getCompanyById = catchAsync(async (req, res) => {
    const company = await companyService.getCompanyById(req.params.companyId);
    res.status(httpStatus.OK).send(company);
});

const updateCompanyById = catchAsync(async (req, res) => {
    const company = await companyService.updateCompanyById(req.params.companyId, req.body);
    res.status(httpStatus.OK).send(company);
});

const deleteCompanyById = catchAsync(async (req, res) => {
    await companyService.deleteCompanyById(req.params.companyId);
    res.status(httpStatus.NO_CONTENT).send();
});

const bulkInsertCompanies = catchAsync(async (req, res) => {
    const results = await companyService.bulkInsertCompanies(req.body.companyArray);
    res.status(httpStatus.OK).send(results);
});

const bulkUpdateCompanies = catchAsync(async (req, res) => {
    const results = await companyService.bulkUpdateCompanies(req.body);
    res.status(httpStatus.OK).send(results);
});

const bulkDeleteCompanies = catchAsync(async (req, res) => {
    const results = await companyService.bulkDeleteCompanies(req.body);
    res.status(httpStatus.OK).send(results);
});

module.exports = {
    getCompanies,
    getCompaniesWithFilterSort,
    createCompany,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById,
    bulkInsertCompanies,
    bulkUpdateCompanies,
    bulkDeleteCompanies
}