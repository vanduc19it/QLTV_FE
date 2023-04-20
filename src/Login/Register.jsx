import React, { useState } from "react";
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
  from "mdb-react-ui-kit";
import {
  Box,
  Button, Image, Select, Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Text,
} from "@chakra-ui/react";

import axios from "axios";
import { baseURL } from "../urlserver.js";
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import logo from "../assets/icons/logo.svg";
function Register() {

  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);

  const onClose = () => {
    setIsSuccess(false)
  }


  const [name, setName] = useState("");
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("");
  const [uniID, setUniID] = useState(1);

  console.log(name, email)


  const handleRegister = async () => {

    if (name !== "" && email !== "" && password !== "") {
      await axios.post(`${baseURL}student/add-new`, {
        name,
        email,
        password,
        uniID,

      },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
          }
        })
        .then((response) => {
          console.log(response);
        });
      setName("");
      setEmail("");
      setPassword("");
      setUniID(1);


      setIsSuccess(true)

      // setTimeout(
      //   navigate('/login')

      //   , 50000);

    } else {
      alert("Vui lòng nhập đầy đủ thông tin")
    }

  };
  return (
    <>  {
      isSuccess &&
      <Alert status="success">
        <AlertIcon />
        <Box>
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Đăng ký thành công!
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



          <MDBCard className="mx-5 mb-5 p-5 shadow-5" style={{ marginTop: "100px", background: "hsla(0, 0%, 100%, 0.8)", backdropFilter: "blur(30px)" }}>
            <MDBCardBody className="p-5 text-center" >

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
                <MDBCol col="6">
                  <MDBInput wrapperClass="mb-4" placeholder="First name" id="form1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </MDBCol>

                <MDBCol col="6">
                  <Select placeholder="Select option" onChange={(e) => { setUniID(e.target.value) }}>
                    <option value="1">Trường Đại Học CNTT & TT Việt Hàn</option>
                    <option value="2">Trường Đại Học Bách Khoa</option>
                    <option value="3">Trường Đại Học Kinh Tế</option>
                    <option value="4">Trường Đại Học SPKT</option>
                    <option value="5">Trường Đại Học Sư Phạm</option>

                  </Select>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass="mb-4" placeholder="Email" id="form1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass="mb-4" placeholder="Password" id="form1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


              <Button colorScheme="yellow" w="450px" onClick={handleRegister}>Sign up</Button>

              <p className='mt-5'>Already have an account? <a href="/login" class="link-info">Login here</a></p>


            </MDBCardBody>
          </MDBCard>

        </MDBContainer>

      </Box>
    </>
  );
}

export default Register;