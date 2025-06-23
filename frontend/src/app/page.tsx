'use client'

import React from 'react'
import Sidebar from '@/components/Sidebar'
import LeadList from '@/components/LeadList'
import LeadModal from '@/components/LeadModal'
import { useQuery } from '@apollo/client'
import { GET_LEADS } from '@/graphql/queries'
import { FiMenu } from 'react-icons/fi'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const { loading, error } = useQuery(GET_LEADS)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar} className="text-gray-800 text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative md:block
        `}
      >
        <Sidebar />
      </aside>

      {/* Backdrop on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 pt-16 md:pt-4 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">📋 Leads</h1>
            <button
              onClick={openModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Add Lead
            </button>
          </div>

          {loading ? (
            <p>Loading leads...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error.message}</p>
          ) : (
            <LeadList />
          )}
        </div>
      </main>

      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
