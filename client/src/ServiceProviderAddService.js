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
import ServiceProviderMyServices from  './ServiceProviderMyServices';
import ServiceEditPopupForm from './EditServicePopupForm';


function ServiceProviderAddService() {

    const { userId } = useContext(UserContext);

    const [errors, setErrors] = React.useState({});

    const [popupvalues, setPopupvalues] = React.useState({});

    const [values, setValues] = React.useState({});

    const navigate = useNavigate();

    const [showPopup, setShowPopup] = React.useState(false);

    const openPopup = (idparm, serviceidparm, hourlyrateparm, experienceparm, isOpenParm = false) => {

        let tempPopupValues = {};
        tempPopupValues.idparm = idparm;
        tempPopupValues.serviceidvar = serviceidparm;
        tempPopupValues.hourlyratevar = hourlyrateparm;
        tempPopupValues.experiencevar = experienceparm;

        setPopupvalues({
            ...tempPopupValues,
        });

        setShowPopup(isOpenParm);
        
    };

    const closePopup = () => {
        setShowPopup(false);
    };


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const addMyService = async (e) => {

        setErrors({});

        let isvalid = true;

        e.preventDefault();

        let formName = document.forms.addserviceform;

        const newServiceProviderService = {
            serviceproviderid: userId,
            serviceid: formName.services.value,
            hourlyrate: parseFloat(formName.hourlyrate.value),
            experience: formName.experience.value
        }

        let tempValues = {};
        tempValues.serviceid = newServiceProviderService.serviceid;
        tempValues.hourlyrate = newServiceProviderService.hourlyrate;
        tempValues.experience = newServiceProviderService.experience;

        setValues({
            ...tempValues,
        });


        let temp = { ...errors };
        temp.serviceid = "";
        temp.hourlyrate = "";
        temp.experience = "";


        if (newServiceProviderService.serviceid === "") {
            isvalid = false;
            temp.serviceid = 'This field is required.';
        }

        if (newServiceProviderService.hourlyrate === "") {
            isvalid = false;
            temp.hourlyrate = 'This field is required.';
        }

        if (newServiceProviderService.experience === "") {
            isvalid = false;
            temp.experience = 'This field is required.';
        }


        if (isvalid) {
            await addServicefunc(e, newServiceProviderService);

        }

        else {

            setErrors({
                ...temp,
            });
        }
    }



    const addServicefunc = async (e, newServiceProviderService) => {

        let query =
            `
            mutation CreateServiceProviderService($serviceproviderid: String!, $serviceid: String!, $hourlyrate: Float!, $experience: String!) {
                createServiceProviderService(serviceproviderid: $serviceproviderid, serviceid: $serviceid, hourlyrate: $hourlyrate, experience: $experience) {
                  _id
                  id
                  serviceproviderid
                  serviceid
                  hourlyrate
                  experience
                }
              }
          `

        const response = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: { serviceproviderid: newServiceProviderService.serviceproviderid, serviceid: newServiceProviderService.serviceid, hourlyrate: newServiceProviderService.hourlyrate, experience: newServiceProviderService.experience } })

        });

        response.text().then(response => {
            const parsedResponse = JSON.parse(response);

            if (parsedResponse.errors) {
                const errorMessage = parsedResponse.errors[0].message;
                alert(errorMessage);
            }
            else if (parsedResponse.data.createServiceProviderService == null) {
                alert("Adding Service failed!");
            }
            else {
                alert("Service added successfully!");
                e.target.reset();
                navigate(`/addservice`);
                fetchingData();
                window.location.reload(false)
            }

        });

    }

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


    return (


        <div>
            <h2 id="serprohead">My Service Portal</h2>

            <Box component="form" id="addserviceform" name="addserviceform" onSubmit={addMyService} sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >

                <div class="addserviceformdiv">

                    <h4 id="formhead">Add New Service</h4>

                    <TextField required id="services" name="services" select label="Service" defaultValue="" helperText={errors.hourlyrate} >
                        {
                            allServices.map(function (item) {
                                return <MenuItem value={item._id}>{item.servicename}</MenuItem>
                            })
                        }

                    </TextField>

                    <TextField required id="hourlyrate" type="text" label="Hourly Rate" name="hourlyrate" helperText={errors.hourlyrate} defaultValue={values.hourlyrate} /> <br />

                    <TextField required id="experience" type="text" label="Experience" name="Experience" multiline rows={4} maxRows={6} helperText={errors.experience} defaultValue={values.experience} /> <br />

                    <div>
                        <Button variant="contained" type="submit" class="registerbuttonstyle">Add Service To Me!</Button>
                    </div>

                </div>
            </Box>

            <h4 id="formhead">My Services</h4>

            <div id = "servicestable">

                <Paper>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="left">SERVICE NAME</StyledTableCell>
                                    <StyledTableCell align="left">HOURLY RATE</StyledTableCell>
                                    <StyledTableCell align="left">EXPERIENCE</StyledTableCell>
                                    <StyledTableCell align="right"> </StyledTableCell> 
                                    <StyledTableCell align="right"> </StyledTableCell> 
                                    <StyledTableCell align="right"> </StyledTableCell> 
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <ServiceProviderMyServices StyledTableCell = {StyledTableCell} openPopupForm = {openPopup} /> 
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Paper>

            </div>
            {showPopup && <ServiceEditPopupForm  closePopup = {closePopup} serviceproviderserviceid = {popupvalues.idparm} serviceidvar = {popupvalues.serviceidvar} hourlyratevar = {popupvalues.hourlyratevar} experiencevar = {popupvalues.experiencevar} />}

        </div>

    )

}

export default ServiceProviderAddService;