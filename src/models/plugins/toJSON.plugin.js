/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  deleteAtPath(obj[path[index]], path, index + 1);
};

const toJSON = (schema) => {
  let transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    transform = schema.options.toJSON.transform;
  }

  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform(doc, ret, options) {
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });


      if(ret.company_name){
        ret.company_id = ret._id.toString();
      }else if(ret.candidate_email){
        ret.candidate_id = ret._id.toString();
      }else if(ret.job_name){
        ret.job_id = ret._id.toString();
      }else if(ret.contact_email){
        ret.contact_id = ret._id.toString();
      }else if(ret.account_name){
        ret.account_id = ret._id.toString();
      }else if(ret.user_email){
        ret.user_id = ret._id.toString();
      }else if(ret.field_name){
        ret.field_id = ret._id.toString();
      }else{
        ret.id = ret._id.toString();
      }

      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;
      if (transform) {
        return transform(doc, ret, options);
      }
    },
  });
};

module.exports = toJSON;
