'use client'

import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const navigate = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64 bg-white shadow-lg border-r flex flex-col
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 py-3 border-b shadow-sm md:block md:border-none md:shadow-none">
          <h2 className="text-xl font-bold text-gray-800">LeadTool</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-700"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 px-4">
          <button
            onClick={() => navigate('/')}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100"
          >
            📋 Leads
          </button>
          <button
            onClick={() => navigate('/generate-link')}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100"
          >
            🧩 Generate Link
          </button>
          <button
            onClick={() => navigate('/reports')}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100"
          >
            📊 Reports
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="text-left px-3 py-2 rounded-md hover:bg-gray-100"
          >
            ⚙️ Settings
          </button>
        </nav>

        {/* Soft Shadow Separator */}
        <div className="h-2 shadow-md" />

        {/* Footer */}
        <div className="px-4 pt-4 pb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold">
              N
            </div>
            <span>Mukesh</span>
          </div>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(true)} className="text-gray-800 text-2xl">
          <FiMenu />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default Sidebar
