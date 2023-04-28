import React from 'react'
import {ROUTES} from '../../utils/routes'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({children,loading,error}) {
    if(loading) return <h1 className='font-bold text-3xl text-center h-full flex items-center justify-center'>Loading...</h1>
    if(error) return <h1>Error...</h1>
  return (children)
}

