import {
  Box, Button, Card, CardBody, Image, Input, InputGroup, InputRightElement, Menu, MenuList, MenuButton, MenuItem,
  MenuItemOption,
  MenuGroup,
  useDisclosure,
  MenuOptionGroup,
  MenuDivider, Text, ModalOverlay, ModalContent, Modal, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, ModalFooter, Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react"
import logo from "../assets/icons/logo.svg";
import logo1 from "../assets/books/1.jpg";
import logo2 from "../assets/books/2.jpg";
import logo3 from "../assets/books/3.jpg";
import logo4 from "../assets/books/4.jpg";
import logo5 from "../assets/books/5.jpg";
import Slider from "react-slick";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { MdSearch } from "react-icons/md";

import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import axios from "axios";
import { baseURL } from "../urlserver.js";
function index() {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const responsive1 = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 10 },
  };

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



  const [user, setUser] = useState({})

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo !== null) {
      setUser(userInfo)

    }

  }, [])

  console.log(user, JSON.stringify(user))


  const [book, setBook] = useState({})

  const handleOpen = async (bookID) => {

    console.log(bookID)

    //handle get book byid
    await axios.post(`${baseURL}book/byID`, {
      bookID,
    },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: 'application/json',
        }
      })
      .then((response) => {
        setBook(response.data)

      });



    if (JSON.stringify(user) != '{}') {
      onOpen();
    } else {
      alert("Vui lòng đăng nhập để mượn sách!")
    }




  }

  console.log(book)

  const labels = [
    <div key={1} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", display: "flex", justifyContent: "space-around", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./read.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Read Free Library Books Online</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Millions of books available through Controlled Digital Lending</Text>
      </div>


    </div>,
    <div key={2} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", display: "flex", justifyContent: "space-around", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./track.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Keep Track of your Favorite Books</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Organize your Books using Lists & the Reading Log</Text>
      </div>


    </div>,
    <div key={3} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", display: "flex", justifyContent: "space-around", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./explorer.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Try the virtual Library Explorer</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Digital shelves organized like a physical library</Text>
      </div>


    </div>,
    <div key={4} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", display: "flex", justifyContent: "space-around", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./fulltext.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Try Fulltext Search</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Find matching results within the text of millions of books</Text>
      </div>


    </div>,
    <div key={5} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", display: "flex", justifyContent: "space-around", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./librarian.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Be an Open Librarian</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Dozens of ways you can help improve the library</Text>
      </div>

    </div>,
    <div key={6} className="item" data-value="1" style={{ backgroundColor: "#fcfbf7", borderRadius: "4px", justifyContent: "space-around", display: "flex", width: "320px", height: "150px", border: "1px solid #ddd" }}>
      <Image
        src="./feedback.png"
        width="80px"
        objectFit="contain"
        alt=""
      />
      <div >
        <Text colorScheme="blue" mt="4" w="180px">Send us feedback</Text>
        <Text colorScheme="blue" mt="4" w="200px" style={{ color: "#bbb", fontSize: "14px" }}>Your feedback will help us improve these cards</Text>
      </div>

    </div>,
  ]

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
        <Button colorScheme="blue" mb="3" w="160px" ml="2" onClick={() => handleOpen(book.bookID)}>Borrow</Button>

      </div>
    )),

  ]

  console.log(items[0])
  const navigate = useNavigate();

  const handleDetail = async (id) => {
    await startTransition(() => {
      navigate(`/detail/${id}`)

    });
  }


  const onClose1 = () => {
    setIsSuccess(false)
  }

  //handle regis borrow bôok
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [isSuccess, setIsSuccess] = useState(false);

  const handleBorrowBook = async () => {
    await axios.post(`${baseURL}borrowing/add-new`, {
      studentID: user.studentID,
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
      <Box bg="#e1dcc5" w="100%" p={4} color="white" >

        <Navbar />

        <Box bg="#e1dcc5" w="75%" p={4} color="white" margin="0 auto">
          <Card>
            <Card>
              <CardBody>
                <Text fontSize="18px" color="#0376b8" mb="15px">Welcome to Open Library</Text>

                <AliceCarousel
                  animationType="fadeout"
                  animationDuration={800}
                  disableButtonsControls
                  infinite
                  items={labels}
                  mouseTracking
                  responsive={responsive1}


                />


              </CardBody>
              <CardBody>
                <Text fontSize="18px" color="#0376b8" mb="5px">Trending Books</Text>

                <AliceCarousel
                  animationType="fadeout"
                  animationDuration={800}
                  disableButtonsControls
                  infinite
                  items={items[0]}
                  mouseTracking
                  responsive={responsive}

                />

              </CardBody>
              <CardBody>
                <Text fontSize="18px" color="#0376b8" mb="20px">Classic Books</Text>
                <AliceCarousel
                  animationType="fadeout"
                  animationDuration={800}
                  disableButtonsControls
                  infinite
                  items={items[0]}
                  mouseTracking
                  responsive={responsive}
                />
              </CardBody>
              <CardBody>
                <Text fontSize="18px" color="#0376b8" mb="20px">Books We Love</Text>
                <AliceCarousel
                  animationType="fadeout"
                  animationDuration={800}
                  disableButtonsControls
                  infinite
                  items={items[0]}
                  mouseTracking
                  responsive={responsive}
                />
              </CardBody>
            </Card>

          </Card>


        </Box>
      </Box>

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

export default index;
