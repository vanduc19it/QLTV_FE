import React, {useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';
import {
    Box,
    Button, Image, Select, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
  } from "@chakra-ui/react";

  import logo from "../assets/icons/logo.svg";
function Register() {

  const [isSuccess, setIsSuccess] = useState(false);

  const onClose = ()=> {
    setIsSuccess(false)
  }
    const handleRegister= () => {
        
        setIsSuccess(true)
    }
  return (
    <>  {
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
    <Box display="flex" justify="center" width="50%" height="50%" margin="0 auto">

    
    <MDBContainer fluid >

      

      <MDBCard className="mx-5 mb-5 p-5 shadow-5" style={{marginTop: '100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
        <MDBCardBody className='p-5 text-center' >
        
        <Image
                src={logo}
                w="30"
                h="30"
                objectFit="cover"
                alt=""
                margin="0 auto"
                mb="40px"
              />
       

          <MDBRow>
            <MDBCol col='6'>
              <MDBInput wrapperClass='mb-4' placeholder='First name' id='form1' type='text'/>
            </MDBCol>

            <MDBCol col='6'>
                        <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
            </Select>
            </MDBCol>
          </MDBRow>

          <MDBInput wrapperClass='mb-4' placeholder='Email' id='form1' type='email'/>
          <MDBInput wrapperClass='mb-4' placeholder='Password' id='form1' type='password'/>


          <Button colorScheme='yellow' w="450px" onClick={handleRegister}>Sign up</Button>

       

        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  
    </Box>
    </>
  );
}

export default Register;