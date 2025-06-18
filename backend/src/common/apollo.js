const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const express = require('express');
const { schema } = require('./appollo.schema');
const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ token: req.headers.authorization })
});

const startServer = async (app) => {
    try {
        await server.start();
        
        app.use('/graphql', express.json(), expressMiddleware(server, {
            context: ({req}) => ({ token: req.headers.authorization })
        }));

        // Add a simple health check endpoint
    }catch(e){
        console.log(e)
        throw e;
    }
}
module.exports = { startServer };
