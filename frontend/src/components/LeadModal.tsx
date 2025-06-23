'use client'
import React from 'react'
import LeadForm from './LeadForm'
const LeadModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    if(!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-[90%] max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Lead</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-600 text-lg">✖</button>
        </div>
        <LeadForm isModal onSuccess={onClose} />
      </div>
    </div>
    )
}
export default LeadModal