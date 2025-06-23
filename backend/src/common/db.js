const mongoose = require('mongoose');
// const mongoUrl = `mongodb+srv://whatsappleadtooluser:${encodeURIComponent('Whats&app#lead&tool')}@cluster0.fnxxfxi.mongodb.net/whatsappleadtool?retryWrites=true&w=majority&appName=Cluster0`
const config = require('./config');
const mongoUrl = config.MONGOURL;
async function connect(){
    try{
        await mongoose.connect(mongoUrl,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 15000,
        })
        if (mongoose.connection.readyState === 1) {
            console.log('✅ MongoDB connection established');
          } else {
            console.error('❌ MongoDB connection failed, state:', mongoose.connection.readyState);
            process.exit(1);
          }
    }catch(e){
        console.log(e)
        throw e;
    }
}

module.exports = {
    connect,
    mongoose
}
