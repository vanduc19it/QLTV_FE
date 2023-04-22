
import React, { useState, useEffect } from 'react'
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
import axios from "axios";
import { baseURL } from "../urlserver.js";
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
function Login() {
  const [role, setRole] = useState(0);
  localStorage.setItem("role", role);


  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const onClose = () => {
    setIsSuccess(false)
    setIsFail(false)
  }


  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const [student, setStudents] = useState({});

  const handleLogin = async () => {


    await axios.post(`${baseURL}login`, {
      email,
      password,
    },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        }
      })
      .then((response) => {


        if (response.data.length > 0) {
          setIsSuccess(true);
          setIsFail(false);
          setStudents(response.data);

          navigate('/')
          localStorage.setItem("userInfo", JSON.stringify(response.data[0]));

        } else {
          setIsFail(true);
          setIsSuccess(false);
        }


      });

    console.log(student, student.length)



  };
  console.log(student)







  return (
    <>
      {
        isSuccess &&
        <Alert status="success">
          <AlertIcon />
          <Box>
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              Đăng nhập thành công!.
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
      {
        isFail &&
        <Alert status="error">
          <AlertIcon />
          <Box>
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Đăng nhập thất bại! vui lòng kiểm tra lại
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

              <div className="d-flex flex-row ps-5 pt-5">


              </div>

              <div className="d-flex flex-column justify-content-center h-custom-2 w-70 pt-4 pl-10 ">
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
                <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: "1px" }}>Log in</h3>

                <MDBInput wrapperClass="mb-4 mx-5 w-100" label="Email address" id="formControlLg" type="email" size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                <MDBInput wrapperClass="mb-4 mx-5 w-100" label="Password" id="formControlLg" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

                <MDBBtn className="mb-4 px-5 mx-5 w-100" color="info" size="lg" onClick={handleLogin}>Login</MDBBtn>

                <p className="ms-5">Don't have an account? <a href="/register" class="link-info">Register here</a></p>

              </div>

            </MDBCol>


          </MDBRow>

        </MDBContainer>
      </Card>
    </>
  )
}

export default Login