const { makeExecutableSchema } = require('@graphql-tools/schema');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFilesSync } = require('@graphql-tools/load-files');
const typeDefs = mergeTypeDefs(loadFilesSync('../**/*.graphql.js'));
const resolvers = mergeResolvers(loadFilesSync('../**/*.resolvers.js'));
const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = { schema };
