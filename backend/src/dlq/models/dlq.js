const mongoose = require('../../common/db').mongoose;
const Dlq = mongoose.model('dlq', new mongoose.Schema({
    payload: String,
    createdAt: Date
}))
module.exports = Dlq
