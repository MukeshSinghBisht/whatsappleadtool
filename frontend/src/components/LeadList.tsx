'use client'
import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_LEADS } from '@/graphql/queries'
const LeadList = () => {
    const { data, loading, error } = useQuery(GET_LEADS)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    return (
        <div className='p-4 bg-white rounded shadow mt-4'>
            <h2 className='text-xl font-bold mb-2'>
                Leads
            </h2>
            {
                data.leads.map((lead: any) => (
                    <div key={lead.id}>
                        <p>{lead.name}</p>
                        <p>{lead.phone}</p>
                        <p>{lead.message}</p>
                        <p>{lead.leadId}</p>
                    </div>
                ))
            }
        </div>
    )
}
export default LeadList
