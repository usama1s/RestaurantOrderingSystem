import React from 'react'
import {ROUTES} from '../../utils/routes'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({children,loading,error}) {
    if(loading) return <h1>Loading...</h1>
    if(error) return <h1>Error...s</h1>
  return (children)
}

