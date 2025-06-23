import React from 'react'
import { FaPhoneAlt, FaHashtag } from 'react-icons/fa'

type Props = {
  name: string
  phone: string
  message: string
  leadId: string
}

const LeadCard = ({ name, phone, message, leadId }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

      <div className="flex items-center text-gray-600 text-sm mt-1">
        <FaPhoneAlt className="mr-2 text-pink-500" />
        {phone}
      </div>

      <p className="mt-2 text-gray-700 text-sm line-clamp-3">{message}</p>

      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
        <FaHashtag />
        {leadId}
      </div>
    </div>
  )
}

export default LeadCard
