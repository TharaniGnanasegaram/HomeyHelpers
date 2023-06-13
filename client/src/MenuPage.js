import React from 'react'
import { Link, BrowserRouter } from "react-router-dom";
import PageRoutes from "./PageRoutes";


function Menus() {


    return (
        <BrowserRouter>
            <div>

                <div class="titleHeadingStyle">
                    <Link to="/" > <img id="logoimg" src="logo4.png" ></img> </Link>
                </div>

                <div>
                    {/* <h1 id="titleName">Homey Helpers</h1> */}
                </div>

                <nav class="nav">

                    <ul class="nav_ul">
                        <li> <Link to="/" class="nav_ul_link" >Home</Link> </li>
                        <li> <Link to="/serviceproviderportal" class="nav_ul_link" >Service Provider Portal</Link> </li>
                        <li> <Link to="/customerportal" class="nav_ul_link" >Customer Portal</Link> </li>

                    </ul>

                </nav>

                <div id="homecontent">
                    <hr id="linehr" />
                </div>

                <PageRoutes />

            </div>
        </BrowserRouter>

    )
}

export default Menus;