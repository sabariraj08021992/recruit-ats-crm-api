const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const manageColumnSchema = mongoose.Schema(
    {   
        entity_type: {
            type: String,
            required: true
        },
        related_columns:{
            type: Object,
            required: true
        },
        created_by: {
            type: mongoose.SchemaTypes.ObjectId,
            ref:"User"
        },
    },
    {
        timestamps: {
          "createdAt":"manage_column_added_on",
          "updatedAt":"manage_column_last_modified"
        }
    }
);

/**
 * @typedef ManageColumn
 */
const ManageColumn = mongoose.model("ManageColumn", manageColumnSchema);

module.exports = ManageColumn;
