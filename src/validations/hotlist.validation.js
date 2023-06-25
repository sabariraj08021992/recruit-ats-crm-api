const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const getHotlistsWithFilterSort = {
    body: Joi.object().keys({
        filterModel: Joi.array().optional(),
        sortModel: Joi.array().optional(),
        limit:Joi.number().optional(),
        page:Joi.number().optional()
    })
};

const createHotlist = {
    body: Joi.object().keys({
        entity_type: Joi.string().required(),
        hotlist_name: Joi.string().required(),
        hotlist_owner:Joi.string().custom(objectId),
        associated_companies:Joi.array().optional(),
        associated_contacts:Joi.array().optional(),
        associated_candidates:Joi.array().optional(),
        associated_jobs:Joi.array().optional(),
        associated_deals:Joi.array().optional(),
        hotlist_is_shared:Joi.boolean().required(),
        hotlist_created_by:Joi.string().custom(objectId),
    })
};

const getHotlistById = {
    params: Joi.object().keys({
        hotlistId: Joi.string().custom(objectId),
    })
};

const updateHotlistById =  {
    body: Joi.object().keys({
        hotlist_name: Joi.string().optional(),
        hotlist_owner:Joi.string().custom(objectId),
        associated_companies:Joi.array().optional(),
        associated_contacts:Joi.array().optional(),
        associated_candidates:Joi.array().optional(),
        associated_jobs:Joi.array().optional(),
        associated_deals:Joi.array().optional(),
        hotlist_is_shared:Joi.boolean().optional()
    })
};

const deleteHotlistById = {
    params: Joi.object().keys({
        hotlistId: Joi.string().custom(objectId),
    })
};

module.exports = {
    getHotlistsWithFilterSort,
    createHotlist,
    getHotlistById,
    updateHotlistById,
    deleteHotlistById
};
