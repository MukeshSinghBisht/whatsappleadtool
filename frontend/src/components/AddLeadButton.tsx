'use client'

import React from 'react'
import { FiPlus } from 'react-icons/fi'

const AddLeadButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg transition-all md:text-base text-sm"
    >
      <FiPlus className="text-xl" />
      <span className="hidden sm:inline">Add Lead</span>
    </button>
  )
}

export default AddLeadButton
