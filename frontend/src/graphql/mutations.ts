import { gql } from "@apollo/client";
export const ADD_LEAD = gql`
    mutation AddLead($name: String!, $phone: String!, $message: String!, $leadId: String!) {
        addLead(name: $name, phone: $phone, message: $message, leadId: $leadId){
            id
            name
            phone
            message
            leadId
        }    
    }`