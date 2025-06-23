'use client'

import React, { useState } from 'react'
import { Lead } from '@/redux/slices/leadSlice'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useMutation } from '@apollo/client'
import { ADD_LEAD } from '@/graphql/mutations'
import { GET_LEADS } from '@/graphql/queries'
import { v4 as uuidv4 } from 'uuid'

type Props = {
  isModal: boolean
  onSuccess: () => void
}

const LeadForm = ({ isModal, onSuccess }: Props) => {
  const { loading, error } = useSelector((state: RootState) => state.lead)
  const [formData, setFormData] = useState<Lead>({
    id: '',
    name: '',
    phone: '',
    message: '',
    leadId: ''
  })

  const [addLead] = useMutation(ADD_LEAD, {
    refetchQueries: [GET_LEADS]
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
    onSuccess?.()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white p-6 rounded-2xl shadow-md space-y-5 w-full ${
        isModal ? '' : 'max-w-lg mx-auto mt-10'
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add Lead</h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
        <input
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          placeholder="Enter phone number"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
        <textarea
          name="message"
          onChange={handleChange}
          value={formData.message}
          placeholder="Enter message"
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {error && (
        <p className="text-center text-sm text-red-600">Error: {error}</p>
      )}
    </form>
  )
}

export default LeadForm
