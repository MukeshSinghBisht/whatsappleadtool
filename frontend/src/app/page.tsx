'use client'
import LeadForm from '@/components/LeadForm'
import React from 'react'
import LeadList from '@/components/LeadList'
export default function Home(){
  return (
    <div>
      <h1>Whatsapp Lead Capture</h1>
      <LeadForm />
      <LeadList />
    </div>
   
  )
}