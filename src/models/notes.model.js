const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const noteSchema = mongoose.Schema(
  {
      note_type: {
        type: String,
        required: true,
      },
      note_description: {
        type: String,
        required: true,
      },
      entity_type: {
        type: String,
        required: true,
      },
      note_linked_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
      },
      note_added_by: {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User",
      },
      timestamps: {
        "createdAt":"note_added_on",
        "updatedAt":"note_last_modified"
      }
  }
);

/**
 * @typedef Team
 */
const Note = mongoose.model('Team', noteSchema);

module.exports = Note;
