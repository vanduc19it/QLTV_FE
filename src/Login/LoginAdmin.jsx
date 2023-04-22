
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
    ButtonGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { baseURL } from "../urlserver.js";
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
function LoginAdmin() {
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


    const [admin, setAdmin] = useState({});

    const handleLogin = async () => {


        await axios.post(`${baseURL}admin/login`, {
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
                    setAdmin(response.data);

                    localStorage.setItem("role", JSON.stringify(response.data[0].role));
                    localStorage.setItem("admin", JSON.stringify(response.data[0]));

                } else {
                    setIsFail(true);
                    setIsSuccess(false);
                }
                navigate('/admin')
                window.location.reload()

            });




    };
    console.log(admin)
    const [count, setCount] = useState(1)
    const [user, setUser] = useState({})
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
    }, [count])


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
            <Card display="flex" justify="center" textAlign width="30%" height="60%" margin="100px auto" pb="50px" pt="40px">
                <MDBContainer fluid>
                    <MDBRow>

                        <MDBCol sm="10">



                            <div className="d-flex flex-column justify-content-center h-custom-2 w-40 pt-4 " style={{ marginLeft: "-20px" }}>
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


                                <MDBInput placeholder='Input email' wrapperClass="mb-4 mx-5 w-100" id="formControlLg" type="email" size="md" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <MDBInput placeholder='Input password' wrapperClass="mb-4 mx-5 w-100" id="formControlLg" type="password" size="md" value={password} onChange={(e) => setPassword(e.target.value)} />

                                <Button className="mb-4 px-5 mx-5 w-100" colorScheme='yellow' size="md" onClick={handleLogin}>Login</Button>


                            </div>

                        </MDBCol>


                    </MDBRow>

                </MDBContainer>
            </Card>
        </>
    )
}

export default LoginAdmin