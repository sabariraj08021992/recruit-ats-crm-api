/**
 * Create an object composed of the picked object properties
 * @param {string[]} sortArr
 * @returns {String}
 */
const sortModel = (s) => {
  let temp = [];
  for(let i=0;i<s.length;i++){
    if(s['field_name'] != undefined && s['sort'] != undefined){
      let str = s['field_name']+":"+s['sort'];
      temp.push(str)
    }
  }
  return temp.join(",")
};
module.exports = sortModel;
