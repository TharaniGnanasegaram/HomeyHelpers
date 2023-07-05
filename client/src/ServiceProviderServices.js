import React from 'react'
import { useEffect, useContext } from "react";
import UserContext from './UserContext';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';


function ServiceProviderServices({ StyledTableCell, serviceidparm }) {

    const [myservices, setMyservices] = React.useState([]);

    // const { userId } = useContext(UserContext);

    const userId = localStorage.getItem('userId');

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));


    let query = `
                query ServiceProviderServiceList($serviceid: String) {
                    ServiceProviderServiceList(serviceid: $serviceid) {
                    _id
                    id
                    serviceproviderid
                    serviceprovidername
                    serviceprovideremail
                    serviceprovidercontact
                    serviceid
                    hourlyrate
                    experience
                    }
                }
            `;


    function fetchingMyServicesData() {

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { serviceid: serviceidparm} })
        }).then(async (response) => {
            let tempMyServices = await response.json();
            console.log("data is " + tempMyServices)
            let tempServiceList = tempMyServices.data.ServiceProviderServiceList;
            setMyservices(tempServiceList)
        })
    }


    useEffect(function () {
        fetchingMyServicesData()
    }, [serviceidparm]);


    if (!myservices) {

    }
    else {
        return (
            myservices.map((myser) => (
                <StyledTableRow key={myser._id}>

                    <StyledTableCell align="left">{myser.serviceprovidername} </StyledTableCell>
                    <StyledTableCell align="left">{myser.hourlyrate}</StyledTableCell>
                    <StyledTableCell align="left">{myser.experience}</StyledTableCell>
                    <StyledTableCell align="left">{myser.serviceprovidercontact}</StyledTableCell>
                    <StyledTableCell align="left">{myser.serviceprovideremail}</StyledTableCell>
                    <StyledTableCell align="right"> <span class = "clicktext"> Check availability </span>  </StyledTableCell>

                </StyledTableRow>
            ))
        );
    }



}

export default ServiceProviderServices;