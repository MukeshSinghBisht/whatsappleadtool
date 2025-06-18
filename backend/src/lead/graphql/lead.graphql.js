const { gql } = require('../../common/util');
const typeDefs = gql`
    type Lead {
        id: ID!
        name: String!
        phone: String!
        message: String!
        leadId: String!
    }
    type Query {
        leads: [Lead]
    }
    type Mutation {
        addLead(name: String!, phone: String!, message: String!, leadId: String!): Lead
    }`;

module.exports = typeDefs;
