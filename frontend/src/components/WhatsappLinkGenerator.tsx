'use client'

import React from 'react'

const WhatsappLinkGenerator = () => {
  const [number, setNumber] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [link, setLink] = React.useState('')

  const generateLink = () => {
    if (!number || number.length < 10) {
      alert('Please enter a valid 10-digit number.')
      return
    }
    const encodeMessage = encodeURIComponent(message)
    const generatedLink = `https://wa.me/${number}?text=${encodeMessage}`
    setLink(generatedLink)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    alert('Link copied to clipboard')
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto mt-10 w-full">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        📲 WhatsApp Link Generator
      </h2>

      <div className="space-y-4">
        <input
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter 10-digit WhatsApp number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Enter a message to pre-fill"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          onClick={generateLink}
        >
          Generate Link
        </button>
      </div>

      {link && (
        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-gray-600">Your WhatsApp link:</p>

          <div className="bg-gray-100 border border-gray-200 p-3 rounded-lg flex items-center justify-between gap-2">
            <span className="text-sm text-gray-800 break-all">{link}</span>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-600 font-semibold hover:underline"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WhatsappLinkGenerator
