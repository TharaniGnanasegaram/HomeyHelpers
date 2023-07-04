import React from 'react'
import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import UserContext from './UserContext';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ServiceProviderMyServices from './ServiceProviderMyServices';
import ServiceEditPopupForm from './EditServicePopupForm';
import ServiceProviderServices from './ServiceProviderServices';


function SearchServiceProviders() {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    const [selectedService, setSelectedService] = React.useState('');

    const handleServiceChange = (event) => {
      setSelectedService(event.target.value);
    };


    const [allServices, setAllServices] = React.useState([]);

    let query = `
                    query Query {
                        getAllServices {
                        _id
                        id
                        servicename
                        }
                    }
                `;

    function fetchingData() {

        fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        }).then(async (response) => {
            let varServices = await response.json();
            let tempList = varServices.data.getAllServices;
            setAllServices(tempList);
        })
    }


    useEffect(function () {
        fetchingData()
    }, []);


    const clearfilter = async (e) => {

       setSelectedService('')
    }

    console.log("servi " + selectedService)

    return (


        <div>
            <h2 id="serprohead">Search Service Providers</h2>

            <Box component="form" id="addserviceform" name="addserviceform" sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >

                <div class="addserviceformdiv">

                    <TextField
                        required
                        id="services"
                        name="services"
                        select
                        label="Select Service"
                        value={selectedService}
                        onChange={handleServiceChange}
                    >
                        {allServices.map(function (item) {
                            return (
                                <MenuItem key={item._id} value={item._id}>
                                    {item.servicename}
                                </MenuItem>
                            );
                        })}
                    </TextField>

                    <br/>

                    <span class = "cleartext" onClick={clearfilter}>Clear</span>
{/* 
                    <div>
                        <Button variant="contained" type="submit" class="registerbuttonstyle">Search Service Providers</Button>
                    </div> */}

                </div>
            </Box>

            <h4 id="formhead">Service Providers</h4>

            <div id="servicestable">

                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">SERVICE PROVIDER NAME</StyledTableCell>
                                    <StyledTableCell align="center">HOURLY RATE</StyledTableCell>
                                    <StyledTableCell align="center">EXPERIENCE</StyledTableCell>
                                    <StyledTableCell align="center">CONTACT NUMBER</StyledTableCell>
                                    <StyledTableCell align="center">EMAIL</StyledTableCell>
                                    <StyledTableCell align="right">AVAILABILITY</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ServiceProviderServices StyledTableCell={StyledTableCell} serviceidparm={selectedService} />
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>

            </div>

        </div>

    )

}

export default SearchServiceProviders;