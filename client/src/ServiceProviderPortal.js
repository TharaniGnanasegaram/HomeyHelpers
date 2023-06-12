import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


function ServiceProviderPortal() {

    const [errors, setErrors] = React.useState({});

    const navigate = useNavigate();

    const cancelAdd = async (e) => {

        e.preventDefault();
        navigate(`/`);

    }

    const createServiceProvider = async (e) => {

        setErrors({});
        
        let isvalid = true;

        e.preventDefault();

        let formName = document.forms.createServiceProvider;

        const newServiceProvider = {
            username: formName.username.value,
            password: formName.password.value,
            firstname: formName.firstname.value,
            lastname: formName.lastname.value,
            email: formName.email.value,
            contactnumber: formName.contactnumber.value
        }

        let temp = {...errors};
        temp.username = "";
        temp.password = "";
        temp.repassword = "";
        temp.firstname = "";
        temp.lastname = "";
        temp.email = "";
        temp.contactnumber = "";


        if(newServiceProvider.username ===""){
            isvalid = false;
            temp.username = 'This field is required.';
        }

        if(newServiceProvider.password ===""){
            isvalid = false;
            temp.password = 'This field is required.';
        }

        if(formName.repassword.value ===""){
            isvalid = false;
            temp.repassword = 'This field is required.';
        }

        if(newServiceProvider.password !=="" && formName.repassword.value !=="" && newServiceProvider.password !== formName.repassword.value){
            isvalid = false;
            temp.repassword = 'Passwords do NOT match.';
        }

        if(newServiceProvider.firstname ===""){
            isvalid = false;
            temp.firstname = 'This field is required.';
        }

        if(newServiceProvider.lastname ===""){
            isvalid = false;
            temp.lastname = 'This field is required.';
        }

        if(newServiceProvider.email ===""){
            isvalid = false;
            temp.email = 'This field is required.';
        }

        if(newServiceProvider.contactnumber ===""){
            isvalid = false;
            temp.contactnumber = 'This field is required.';
        }

        if(newServiceProvider.contactnumber !=="" && newServiceProvider.contactnumber.length !== 10){
            isvalid = false;
            temp.contactnumber = 'Conatct number should be 10 digits length.';
        }
        
        // if (singleEmployee.firstname == "" || singleEmployee.lastname == "" || singleEmployee.age == "" || singleEmployee.dateofjoining == "" || singleEmployee.title == "" || singleEmployee.department == "" || singleEmployee.employeetype == "") {
        //     errors.push("Please fill all the required fields")
        // }

        if (isvalid) {
            await registerServiceProvider(newServiceProvider);
            e.target.reset();
        }

        else {

            setErrors({
                ...temp,
              });
            // errors.map((err) => (
            //     alert(err)
            // ))
        }
    }


    const registerServiceProvider = async (newServiceProvider) => {

        let query =
            `
          mutation Mutation($username: String!, $password: String!, $firstname: String!, $lastname: String!, $email: String!, $contactnumber: String!) {
            createServiceProvider(username: $username, password: $password, firstname: $firstname, lastname: $lastname, email: $email, contactnumber: $contactnumber) {
              
              contactnumber
              email
              firstname
              id
              lastname
              password
              username
            }
          }
          `

          try {
            const response = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query, variables: { username: newServiceProvider.username, password: newServiceProvider.password, firstname: newServiceProvider.firstname, lastname: newServiceProvider.lastname, email: newServiceProvider.email, contactnumber: newServiceProvider.contactnumber } })
    
            });
            if (!response.ok) {
            //   const text = await response.text();
            //   throw Error(text);
            }
            
            // const jsonResponse = await response.json();
            console.log("Hii " + Error(await response.json().errors))
            alert("Success")
            // do whatever you want with the JSON response
              
          } catch (error) {
            console.log(error);
          }

        // fetch('http://localhost:4000/graphql', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ query, variables: { username: newServiceProvider.username, password: newServiceProvider.password, firstname: newServiceProvider.firstname, lastname: newServiceProvider.lastname, email: newServiceProvider.email, contactnumber: newServiceProvider.contactnumber } })

        // }).then(async (response) => {
        //     console.log("Hiii " + response)
        //     if (response.ok) {
        //         alert("Employee added successfully!")
        //       }
        //       else{
        //           console.log("Hiii " + response.errors[0].message)
        //       }

        //     // navigate(`/`);
        // })
    }


    return (


        <div>
            <h3 id="serprohead">Service Provider Portal</h3>

            <div class="twocolumns">

                <div>
                    <img class="serproimg" src="servicepro2.jpg" ></img>
                </div>

                <Box component="form" id="createServiceProvider" name="createServiceProvider" onSubmit={createServiceProvider} sx={{ '& .MuiTextField-root': { m: 1, width: '35ch' }, }} noValidate autoComplete="off" >

                    <div class="signupformdiv">

                        <h4 id="formhead">Register</h4>

                        <TextField required id="username" type="text" label="User Name" name="username" helperText={errors.username}  /> <br />

                        <TextField required id="password" type="password" label="Password" name="password" helperText={errors.password} /> <br />

                        <TextField required id="repassword" type="password" label="Re-enter Password" name="repassword" helperText={errors.repassword} /> <br />

                        <TextField required id="firstname" type="text" label="First Name" name="firstname" helperText={errors.firstname}/> <br />

                        <TextField required id="lastname" type="text" label="Last Name" name="lastname" helperText={errors.lastname} /> <br />

                        <TextField required id="email" type="email" label="Email" name="email" helperText={errors.email} /> <br />

                        <TextField required id="contactnumber" type="tel" label="Contact Number" name="contactnumber" helperText={errors.contactnumber} /> <br />

                        <div>
                            <Button variant="contained" type="submit" class="registerbuttonstyle">Register</Button>
                        </div>

                    </div>
                </Box>

            </div>
        </div>

    )

}

export default ServiceProviderPortal;