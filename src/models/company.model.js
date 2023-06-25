const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const { generateSchema } = require("../utils/schema-generator")

let Company = null;

const setCompanyModel = async () => {
    let modelResponse = await generateSchema("company");
    let schemaObj = modelResponse['schema'];
    let timeStampObj = modelResponse['timestamps']
    const companySchema = mongoose.Schema(
        {   
            ...schemaObj,
            company_teams:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:"User",
                default:[]
            },
            company_contacts:{
                type: mongoose.SchemaTypes.ObjectId,
                ref:"Contact",
                default:[]
            },
            company_is_pulic:{
                type: Boolean,
                default:true
            }
        },
        {
            ...timeStampObj
        }
    )

    // add plugin that converts mongoose to json
    companySchema.plugin(toJSON);
    companySchema.plugin(paginate);
    
    /**
     * @typedef Company
     */
    Company = mongoose.model("Company", companySchema);
}

const getCompanyModel = async () => {
    if(!Company)
        await setCompanyModel()            
    return Company
}

module.exports = {
    getCompanyModel,
    setCompanyModel
};