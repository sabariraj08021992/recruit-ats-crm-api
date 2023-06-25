/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
const filterModel = (f) => {
  let temp = {};
  for(let i=0;i<f.length;i++){
    if(f['field_name'] != undefined && f['filter_type'] != undefined && f['filter'] != undefined){
     let value = f['filter'];
     
      //contains string
      if(f['filter_type'] == "contains"){
        temp[f['field_name']] = {'$regex' : value, '$options' : 'i'}
      }

      //Doesn't contain string, only with a regular expression
      if(f['filter_type'] == "is"){
        let value = '^((?!'+f['filter_type']+').)*$'
        temp[f['field_name']] = {'$regex' : value, '$options' : 'i'}
      }

      //Exact case insensitive string
      if(f['filter_type'] == "is"){
        let value = '^'+f['filter_type']+'$'
        temp[f['field_name']] = {'$regex' : value, '$options' : 'i'}
      }
      
      //Begins with string
      if(f['filter_type'] == "begins_with"){
        let value = '^'+f['filter_type']
        temp[f['field_name']] = {'$regex' : value, '$options' : 'i'}
      }
      //Ends with string
      if(f['filter_type'] == "ends_with"){
        let value = f['filter_type']+'$'
        temp[f['field_name']] = {'$regex' : value, '$options' : 'i'}
      }

      //_id filter from array
      if(f['filter_type'] == "in"){
        let value = f['filter_type']
        temp[f['field_name']] = {'$in' : value}
      }

    }
  }
  return temp;
};

module.exports = filterModel;
