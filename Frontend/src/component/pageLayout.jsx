import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Header/header'
export default function PageLayout({ showNavbar }) {
    return (
        <>
        {
            showNavbar &&
            <Navbar />
        }
            
            <Outlet />
        </>
    )
}