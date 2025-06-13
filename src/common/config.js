const dotenv = require('dotenv');
const path = require('path');
dotenv.config({path: path.join(__dirname, '../../.env')});
module.exports = {
    MONGOURL: process.env.MONGOURL + encodeURIComponent(process.env.MONGOPASS)+process.env.MONGOHOSTSECTION
}
