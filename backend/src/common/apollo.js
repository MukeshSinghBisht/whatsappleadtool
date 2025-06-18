const { ApolloServer } = require('apollo-server-express');
const { schema } = require('./appollo.schema');
const server = new ApolloServer({ schema ,cors: { origin: 'http://localhost:4000', credentials: true }});
const startServer = async (app) => {
    try{
        await server.start();
        server.applyMiddleware({ 
            app,
            cors: false //disable cors as we are handling it in expresss
         });
    }catch(e){
        console.log(e)
        throw e;
    }
}
module.exports = { startServer };
