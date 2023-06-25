const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const hotListSchema = mongoose.Schema(
    {   
        entity_type: {
            type: String,
            required: true
        },
        hotlist_name: {
            type: String,
            required: true,
            unique:true
        },
        hotlist_owner: {
            type: String,
            required: true
        },
        associated_companies: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Company",
            default:[]
        }],
        associated_contacts:[{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Contact",
            default:[]
        }],
        associated_candidates: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Candidate",
            default:[]
        }],
        associated_jobs: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref:"Job",
            default:[]
        }],
        associated_deals: [{
            // type: mongoose.SchemaTypes.ObjectId,
            // ref:"Deal",
            // default:[]
        }],
        hotlist_is_shared: {
            type: Boolean,
            default:false
        },
        hotlist_created_by: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps: {
          "createdAt":"hotlist_added_on",
          "updatedAt":"hotlist_last_modified"
        }
    }
);

    // add plugin that converts mongoose to json
    hotListSchema.plugin(toJSON);
    hotListSchema.plugin(paginate);

/**
 * @typedef Hotlist
 */
const Hotlist = mongoose.model("Actions", hotListSchema);

module.exports = Hotlist;
