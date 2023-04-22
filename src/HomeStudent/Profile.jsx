import React, { useState, useEffect } from "react"
import Navbar from "./Navbar.jsx"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Card, FormControl, FormLabel, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure } from "@chakra-ui/react"


import { useParams } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../urlserver.js";

function Profile() {

    const [count, setCount] = useState(0)
    const [user, setUser] = useState({})

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))
        setUser(userInfo)
        setCount(count + 1)
    }, [])

    console.log(user)

    const [borrowing, setBorrowing] = useState([]);

    useEffect(() => {
        const fetchBorrowing = async () => {
            const { data } = await axios.post(`${baseURL}borrow/studentID`, {
                studentID: user.studentID,
            })
            console.log(data)
            setBorrowing(data);
        };
        fetchBorrowing();
    }, [count]);
    console.log(borrowing)

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()



    const [borrowDelete, setBorrowDelete] = useState();
    const handleOpen = (item) => {
        onOpen();
        setBorrowDelete(item)
    }
    console.log(borrowDelete)


    const handleDeleteBorrow = async () => {
        await axios.delete(`${baseURL}borrowing/delete/${borrowDelete.borrowID}`, {
            borrowID: borrowDelete.borrowID,
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
        setCount(count + 1);
        onClose();
    }

    return (
        <>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Cancel Register Borrow Book
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={handleDeleteBorrow} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <Box bg="#e1dcc5" w="100%" hp={4} color="white" height="100vh">
                <Navbar />
                <Box width="75%" margin="20px auto">
                    <Card height="80vh">
                        <Card height="80vh">
                            <Grid

                                templateRows="repeat(1, 1fr)"
                                templateColumns="repeat(5, 1fr)"
                                gap={2}
                                padding="20px 20px"
                            >
                                <Card maxW="sm" >
                                    <GridItem rowSpan={2} colSpan={1} padding="20px 20px" >
                                        <Image src={`../src/assets/students/${user.imageName}`} alt={user.name} />
                                        <Text fontSize="1xl" color="#333333" fontWeight="semibold" pl="6px" style={{ textAlign: "center", margin: "10px" }}>{user.name}</Text>
                                        <Text fontSize="1xl" color="#333333" pl="6px">Khoa: {user.department}</Text>
                                        <Text fontSize="1xl" color="#333333" pl="6px">Class: {user.class}</Text>
                                        <Text fontSize="1xl" color="#333333" pl="6px">Address: {user.address}</Text>

                                    </GridItem>

                                </Card>

                                <GridItem colSpan={4} rowSpan={10}  >
                                    <Tabs variant="unstyled" aria-orientation="vertical">
                                        <TabList aria-orientation="vertical">
                                            <Tab _selected={{ color: "white", bg: "blue.500" }}>Borrowing</Tab>
                                            <Tab _selected={{ color: "white", bg: "green.400" }}>Setting</Tab>
                                        </TabList>
                                        <TabPanels aria-orientation="horizontal">
                                            <TabPanel>
                                                <table style={{ border: "1px solid black", boxShadow: "4px 4px 4px #ccc" }}>
                                                    <thead style={{ border: "1px solid black" }}>
                                                        <tr style={{ border: "1px solid black" }}>
                                                            <th style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>STT</th>
                                                            <th style={{ border: "1px solid black", width: "200px", textAlign: "center" }}>Full name</th>
                                                            <th style={{ border: "1px solid black", width: "200px", textAlign: "center" }} >Book name</th>
                                                            <th style={{ border: "1px solid black", width: "100px", textAlign: "center" }}>Borrow Date</th>
                                                            <th style={{ border: "1px solid black", width: "100px", textAlign: "center" }}>Return Date</th>
                                                            <th style={{ border: "1px solid black", width: "80px", textAlign: "center" }}>Hủy</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody style={{ border: "1px solid black" }}>
                                                        {
                                                            borrowing.map((item, index) => (
                                                                <tr key={index} style={{ border: "1px solid black" }}>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>{index + 1}</td>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>{item.studentName}</td>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>{item.bookName}</td>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>{item.borrowDate}</td>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>{item.returnDate}</td>
                                                                    <td style={{ border: "1px solid black", width: "40px", textAlign: "center" }}>
                                                                        <Button colorScheme='red' size="sm" onClick={() => handleOpen(item)}>X </Button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }


                                                    </tbody>
                                                </table>
                                            </TabPanel>
                                            <TabPanel>
                                                <p>setting!</p>
                                            </TabPanel>
                                        </TabPanels>
                                    </Tabs>
                                </GridItem>

                            </Grid>
                        </Card>



                    </Card>
                </Box >

            </Box >

        </>
    )
}

export default Profile
