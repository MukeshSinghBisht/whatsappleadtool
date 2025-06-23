import { Lead } from "../redux/slices/leadSlice";

export async function postLead(lead: Lead): Promise<Lead> {
    // mock call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return lead;
}