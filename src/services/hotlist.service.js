const httpStatus = require('http-status');
const { Hotlist } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a field
 * @param {Object} body
 * @returns {Promise<Company>}
 */
const createHotlist = async (body) => {
    return Hotlist.create(body);
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
const fetchHotlists = async (filter, options) => {
    const hotlist = Hotlist.paginate(filter, options);
    return hotlist;
};

/**
 * Get company by id
 * @param {ObjectId} id
 * @returns {Promise<Company>}
 */
const getHotlistById = async (id) => {
    const hotlist = Hotlist.findById(id)
    if (!hotlist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Hotlist not found');
    }
    return hotlist;
};

/**
 * Update company by id
 * @param {ObjectId} hotlistId
 * @param {Object} updateBody
 * @returns {Promise<Company>}
 */
const updateHotlistById = async (hotlistId, updateBody) => {
   
    const hotlist = await getHotlistById(hotlistId);
    const filter = { "_id": hotlistId };
    const update = updateBody
    const opts = { new: true };
    const updatedHotlist = await Hotlist.findOneAndUpdate(filter,update,opts)
    return updatedHotlist;
};

/**
 * Delete company by id
 * @param {ObjectId} hotlistId
 * @returns {Promise<Company>}
 */
const deleteHotlistById = async (hotlistId) => {
    const hotlist = await getHotlistById(hotlistId);
    if (!hotlist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Hotlist not found');
    }
    await hotlist.deleteOne();
    return hotlist;
};



module.exports = {
    createHotlist,
    fetchHotlists,
    getHotlistById,
    updateHotlistById,
    deleteHotlistById
};
  