'use client'

import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_LEADS } from '@/graphql/queries'
import LeadCard from './LeadCard'
import { Lead } from '@/redux/slices/leadSlice'

const LeadList = () => {
  const { data, loading, error } = useQuery(GET_LEADS)

  if (loading) return <p className="text-center py-4">Loading...</p>
  if (error) return <p className="text-center text-red-500 py-4">Error: {error.message}</p>

  if (!data?.leads?.length) {
    return <p className="text-center text-gray-500 py-4">No leads found.</p>
  }

  return (
    <div className="overflow-y-auto max-h-[70vh] pr-1">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.leads.map((lead: Lead) => (
          <LeadCard key={lead.id} {...lead} />
        ))}
      </div>
    </div>
  )
}

export default LeadList
