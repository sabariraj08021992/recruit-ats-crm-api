const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { fieldService } = require('../services');

const createFields = async (req, res) => {
    const field = await fieldService.createField(req.body)
    res.status(httpStatus.CREATED).send(field);
}

const getAllFields = async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await fieldService.getAllFields(filter, options);
    res.send(result);
};

const getFieldsByEntity = async (req, res) => {
    const result = await fieldService.getFieldsByEntity(req.params.entity_type);
    res.send(result);
};

module.exports = {
    createFields,
    getAllFields,
    getFieldsByEntity
}