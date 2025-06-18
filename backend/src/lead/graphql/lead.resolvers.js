const leadService = require('../service/lead.service');
const resolvers = {
    Query: {
        leads: async () => await leadService.getLeads(),
    },
    Mutation: {
        addLead: async (_, { name, phone, message, leadId }) => {
            const lead = await leadService.createLead({ name, phone, message, leadId });
            return lead;
        },
    },
};
module.exports = resolvers;