import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ServiceProviderPortal from "./ServiceProviderPortal"


function PageRoutes() {
    return(
       <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/serviceproviderportal' element={<ServiceProviderPortal />} />
       </Routes>
        
    )
}

export default PageRoutes;