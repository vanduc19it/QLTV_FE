import React from 'react'
import Navbar from './Navbar.jsx'
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Card, CloseButton, FormControl, FormLabel, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import AliceCarousel from 'react-alice-carousel'
import logo1 from "../assets/books/1.jpg";
import logo2 from "../assets/books/2.jpg";
import logo3 from "../assets/books/3.jpg";
import logo4 from "../assets/books/4.jpg";
import logo5 from "../assets/books/5.jpg";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react"
import { baseURL } from "../urlserver.js";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
function Detail() {



  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get(`${baseURL}books/get-all`);
      setBooks(data);
      setIsLoading(false);
    };
    fetchBooks();
  }, []);
  console.log(books)

  const navigate = useNavigate();

  const handleDetail = async (id) => {
    await startTransition(() => {
      navigate(`/detail/${id}`)
      window.location.reload()

    });
  }


  const items = [

    books.map((book, id) =>
    (

      <div key={id} className="item-book" data-value="1" style={{ border: "1px solid #ddd", width: "180px", borderRadius: "4px" }} >
        <Image
          src={`../src/assets/books/${book.imageName}`}
          height="260px"
          objectFit="cover"
          alt=""
          style={{ padding: "10px 10px", cursor: "pointer" }}
          onClick={() => handleDetail(book.bookID)}
        />


      </div>
    )),

  ]

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };


  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const { bookID } = useParams();
  console.log(bookID)

  const [book, setBook] = useState({})

  useEffect(() => {

    const fetchBook = async () => {
      const { data } = await axios.post(`${baseURL}book/byID`, {
        bookID,
      })
      setBook(data);
    };
    fetchBook();
    //handle get book byid

  }, [])

  console.log(book)


  const [user, setUser] = useState({})

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo !== null) {
      setUser(userInfo)

    }

  }, [])

  console.log(user, JSON.stringify(user))

  //handle regis borrow bôok
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const handleBorrowBook = async () => {
    await axios.post(`${baseURL}borrowing/add-new`, {
      studentName: user.name,
      bookName: book.bookName,
      borrowDate,
      returnDate,
      quantity: 1,
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

    setBorrowDate("")
    setReturnDate("")
    onClose();
    setIsSuccess(true);


  }
  const onClose1 = () => {
    setIsSuccess(false)
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
              Đăng ký mượn sách thành công!.
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            right={-1}
            top={-1}
            onClick={onClose1}
          />
        </Alert>
      }
      <Box bg='#e1dcc5' w='100%' hp={4} color='white'>
        <Navbar />
        <Box width="75%" margin="20px auto">
          <Card >
            <Card>
              <Grid

                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
                padding="20px 20px"
              >
                <Card maxW='sm' style={{ height: "100%" }}>
                  <GridItem rowSpan={2} colSpan={1} padding="20px 20px" >
                    <Image src={`../src/assets/books/${book.imageName}`} alt={book.bookName} />

                    <Button colorScheme='telegram' w="100%" onClick={onOpen} style={{ marginTop: "20px" }}>Borrow</Button>
                    <Image src={`/rating.png`} alt="rating" />
                  </GridItem>

                </Card>

                <GridItem colSpan={4} rowSpan={2}  >
                  <Text fontSize='3xl'>{book.bookName}</Text>
                  <Text fontSize='1xl'>by {book.authorName}</Text>
                  <Text fontSize='1xl'>Genre: {book.genreName}</Text>
                  <Text fontSize='1xl'>Language: {book.language}</Text>
                  <Text fontSize='1xl'>⭐⭐⭐⭐⭐ 5.0 · 127 Ratings | 2268 Want to read | 143 Currently reading | 126 Have read</Text>

                  <Text fontSize='2xl'>Overview</Text>
                  <hr />
                  <Text fontSize='1xl' style={{ textAlign: "justify", fontSize: "14px" }}>{book.description}</Text>
                </GridItem>

              </Grid>
            </Card>
            <hr />
            <Card>
              <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={2} padding="20px 20px"
              >


                <GridItem colSpan={10} rowSpan={10} mt="20px">
                  <Text fontSize='2xl' style={{ marginBottom: "4px" }}>You might also like</Text>
                  <AliceCarousel
                    animationType="fadeout"
                    animationDuration={800}
                    disableButtonsControls
                    infinite
                    items={items[0]}
                    mouseTracking
                    responsive={responsive}
                  />
                  <Text fontSize='2xl' style={{ marginBottom: "4px" }}>You might also like</Text>
                  <AliceCarousel
                    animationType="fadeout"
                    animationDuration={800}
                    disableButtonsControls
                    infinite
                    items={items[0]}
                    mouseTracking
                    responsive={responsive}
                  />
                </GridItem>
              </Grid>
            </Card>


          </Card>
        </Box >

      </Box >
      {/* borrow modal */}
      {
        JSON.stringify(user) != '{}' && JSON.stringify(book) != '{ }' ? (
          <Modal Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Borrow Book</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Full name: {user.name}</FormLabel>

                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Class: {user.class} </FormLabel>

                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Email: {user.email} </FormLabel>

                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>University: VKU</FormLabel>

                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Borrow date:</FormLabel>
                  <Input
                    value={borrowDate}
                    onChange={e => setBorrowDate(e.target.value)}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    type="date"
                    placeholder="Birthdate"
                  />
                  <FormLabel>Return date:</FormLabel>
                  <Input
                    value={returnDate}
                    onChange={e => setReturnDate(e.target.value)}
                    fontSize={{ base: "sm", md: "md", lg: "lg" }}
                    type="date"
                    placeholder="Birthdate"
                  />

                </FormControl>
                <FormControl mt={4}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Image
                      src={`../src/assets/books/${book.imageName}`}

                      width="90px"
                      objectFit="contain"
                      alt=""

                    />
                    <div style={{ marginLeft: "40px" }}>
                      <FormLabel>BookName: {book.bookName}</FormLabel>
                      <FormLabel>Author: {book.authorName}</FormLabel>
                      <FormLabel>Genre: {book.genreName}</FormLabel>
                      <FormLabel>Language: {book.language}</FormLabel>
                    </div>

                  </div>


                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleBorrowBook}>
                  Register borrow book
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal >
        ) : (<p>chưa đăng nhập</p>)
      }
    </>
  )
}

export default Detail
