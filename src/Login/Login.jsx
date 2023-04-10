
import React, { useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

import logo from "../assets/icons/logo.svg";
import {
  Box,
  Card,
  Button, Image, Select, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
function Login() {
    const [role, setRole] = useState(0);
    localStorage.setItem("role", role);

    
  const [isSuccess, setIsSuccess] = useState(false);

  const onClose = ()=> {
    setIsSuccess(false)
  }
    const handleRegister= () => {
        setTime
        setIsSuccess(true)
    }
  return (
    <>
    {
        isSuccess && 
        <Alert status="success">
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your application has been received. We will review your application
            and respond within the next 48 hours.
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={onClose}
        />
      </Alert>
}
    <Card display="flex" justify="center" textAlign width="50%" height="60%" margin="20px auto" pb="50px">
    <MDBContainer fluid>
    <MDBRow>

      <MDBCol sm="10">

        <div className='d-flex flex-row ps-5 pt-5'>
        
        
        </div>

        <div className='d-flex flex-column justify-content-center h-custom-2 w-70 pt-4 pl-10 '>
        <Image
                src={logo}
                w="30"
                h="30"
                objectFit="cover"
                alt=""
                margin="0 auto"
                mb="40px"
                pl="60px"
              />
          <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

          <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg"/>

          <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' >Login</MDBBtn>
          
          <p className='ms-5'>Don't have an account? <a href="#!" class="link-info">Register here</a></p>

        </div>

      </MDBCol>


    </MDBRow>

  </MDBContainer>
  </Card>
   </>
  )
}

export default Login