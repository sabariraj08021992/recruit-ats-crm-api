const httpStatus = require('http-status');
const pick = require('../utils/pick');
const sortModel = require('../utils/sortModel');
const filterModel = require('../utils/filterModel');
const catchAsync = require('../utils/catchAsync');
const { hotlistService } = require('../services');

const getHotlistsWithFilterSort = catchAsync(async (req, res) => {
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
   
    options['populate'] = "hotlist_owner,hotlist_created_by,associated_companies";

    const result = await hotlistService.fetchHotlists(filter, options);
    res.status(httpStatus.OK).send(result);
});

const createHotlist = catchAsync(async (req, res) => {
    const hotlist = await hotlistService.createHotlist(req.body)
    res.status(httpStatus.CREATED).send(hotlist);
})

const getHotlistById = catchAsync(async (req, res) => {
    const hotlist = await hotlistService.getHotlistById(req.params.hotlistId);
    res.status(httpStatus.OK).send(hotlist);
});

const updateHotlistById = catchAsync(async (req, res) => {
    const hotlist = await hotlistService.updateHotlistById(req.params.hotlistId, req.body);
    res.status(httpStatus.OK).send(hotlist);
});

const deleteHotlistById = catchAsync(async (req, res) => {
    await hotlistService.deleteHotlistById(req.params.hotlistId);
    res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
    getHotlistsWithFilterSort,
    createHotlist,
    getHotlistById,
    updateHotlistById,
    deleteHotlistById,
}