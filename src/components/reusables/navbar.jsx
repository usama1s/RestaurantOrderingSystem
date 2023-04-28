import React from 'react'
import { Link } from 'react-router-dom';
import { ROUTES} from '../../utils/routes'
const {admin,foodListings}=ROUTES;
export function Navbar() {
  return (
    <nav>
         <Link to={admin}>Admin</Link>
         <Link to={foodListings}>foodlisting</Link>
    </nav>
  )
  }