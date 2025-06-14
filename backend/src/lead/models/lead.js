
const mongoose = require('../../common/db').mongoose;
const Lead = mongoose.model('lead', new mongoose.Schema({
    name: String,
    phone: String,
    message: String,
    leadId: String
},{
    timestamps: true,
    collection: 'lead',
}))
module.exports = Lead
