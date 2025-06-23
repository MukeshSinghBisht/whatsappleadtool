import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type Lead = {
    id: string;
    name: string;
    phone: string;
    message: string;
    leadId: string;
}

type LeadState = {
    leads: Lead[];
    loading: boolean;
    error: string | null;
}

const initialState: LeadState = {
    leads: [],
    loading: false,
    error: null
}

const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {
        addLeadRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        addLeadSuccess: (state, action: PayloadAction<Lead>) => {
            state.loading = false;
            state.error = null;
            state.leads.push(action.payload)
        },
        addLeadFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { addLeadRequest, addLeadSuccess, addLeadFailure } = leadSlice.actions
export default leadSlice.reducer