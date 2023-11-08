import React from 'react'
import Header from './Conponents/Header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    
    
    <Header />
    <Outlet />


    
    
    
    </>
  )
}

export default Layout