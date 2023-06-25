const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const attachmentSchema = mongoose.Schema(
  {
    attachment_label:{
      type: String,
      required: true,
    },
    entity_type: {
      type: String,
      required: true,
    },
    related_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
    },
    attachment_added_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:"User",
    },
    timestamps: {
      "createdAt":"attachment_added_on",
      "updatedAt":"attachment_last_modified"
    }
  }
);

/**
 * @typedef Attachment
 */
const Attachment = mongoose.model('Attachment', attachmentSchema);

module.exports = Attachment;
