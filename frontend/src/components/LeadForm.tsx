'use client'
import React, { useState } from 'react'
import { addLeadRequest, Lead } from '@/redux/slices/leadSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useMutation } from '@apollo/client'
import { ADD_LEAD } from '@/graphql/mutations'
import {GET_LEADS} from '@/graphql/queries'
import { v4 as uuidv4 } from 'uuid'

const LeadForm = () => {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.lead)
    const [formData, setFormData ] = useState<Lead>({
        id: '',
        name: '',
        phone: '',
        message: '',
        leadId: ''
    })
    const [addLead] = useMutation(ADD_LEAD, {
        refetchQueries: [GET_LEADS]
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addLead({
            variables: {
               ...formData,
                leadId: uuidv4()
            }
        })
        setFormData({
            id: '',
            name: '',
            phone: '',
            message: '',
            leadId: ''
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <input name="name" onChange={handleChange} placeholder='Name' required/>
            <input name="phone" onChange={handleChange} placeholder='Phone' required/>
            <input name="message" onChange={handleChange} placeholder='Message' required/>
            <button disabled={loading} type="submit">Submit</button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
        </form>
    )
}
export default LeadForm
