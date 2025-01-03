"use client"

import React from 'react'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

function Dashboard() {
    const {isLoaded,user} = useUser()

    if(!isLoaded || !user){
        redirect("/sign-in")
    }

  return (
    <div>
        <h1>DASHBOARD</h1>
      <h1>Username:{user.username}</h1>
      <h1>First Name:{user.firstName}</h1>
      <h1>Last Name:{user.lastName}</h1>
      <h1>Email:{user.emailAddresses[0].emailAddress}</h1>
    </div>
  )
}

export default Dashboard