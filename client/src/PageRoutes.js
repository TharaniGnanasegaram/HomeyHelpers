import React from 'react'
import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ServiceProviderPortal from "./ServiceProviderRegister";
import ServiceProviderLogin from "./ServiceProviderLogin";
import ServiceProviderHome from "./ServiceProviderHome";
import CustomerRegister from "./CustomerRegister";
import CustomerLogin from "./CustomerLogin";
import CustomerHome from "./CustomerHome";
import ServiceProviderAddService from "./ServiceProviderAddService";
import SearchServiceProviders from './SearchServicesProvidersByService';
import AddTimeAvailable from './AddTimeAvailability';


function PageRoutes() {
    return(
       <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/serviceproviderregister' element={<ServiceProviderPortal />} />
            <Route path='/serviceproviderlogin' element={<ServiceProviderLogin />} />
            <Route path='/serviceproviderhome' element={<ServiceProviderHome />} />
            <Route path='/customerregister' element={<CustomerRegister />} />
            <Route path='/customerlogin' element={<CustomerLogin />} />
            <Route path='/customerhome' element={<CustomerHome />} />
            <Route path='/addservice' element={<ServiceProviderAddService />} />
            <Route path='/searchserviceprovider' element={<SearchServiceProviders />} />
            <Route path='/addtimeavailability/:serviceproviderserviceid/:servicename' element={<AddTimeAvailable />} />
       </Routes>
        
    )
}

export default PageRoutes;