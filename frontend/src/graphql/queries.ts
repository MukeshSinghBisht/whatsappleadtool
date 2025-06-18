import { gql } from "@apollo/client";
export const GET_LEADS = gql`
    query GetLeads{
        leads{
            id
            name
            phone
            message
            leadId
        }
    }`