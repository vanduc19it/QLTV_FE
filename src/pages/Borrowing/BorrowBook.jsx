import {
  Box,
  Container,
  Stack,
  ButtonGroup,
  Button,
  Icon,
  Text,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  IconButton,
  Badge,
  Image,
  Spinner,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup,
  SimpleGrid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  CircularProgress,
  CircularProgressLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import { Field, Form, Formik } from "formik";
import { BiError } from "react-icons/bi";
import { useState, useEffect, useRef } from "react";
import Pagination from "../../components/Pagination/Pagination.jsx";
import {
  fetchProducts,
  deleteProducts,
  patchProducts,
  addProducts
} from "../../redux/productSlice/productSlice.jsx";
import { jsonDownload } from "../../redux/jsonSlice/jsonSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase/Firebase.jsx";
import { memo } from "react";
import axios from "axios";
import { baseURL } from "../../urlserver.js";
import moment from "moment";
const BorrowBook = () => {


  const dispatch = useDispatch();
  const filteredData = useSelector((state) => state.products.products);
  const productList = filteredData.filter((filtered) => filtered !== null);
  // const isLoading = useSelector((state) => state.products.isLoading);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpened,
    onOpen: onOpened,
    onClose: onClosed,
  } = useDisclosure();
  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();
  const cancelRef = useRef();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);





  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = [...productList]
    .reverse()
    .slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: "0px"
    })
  }, [currentPage])
  const [json, setJson] = useState(false);

  useEffect(() => {
    json == true && dispatch(jsonDownload());
    setJson(false);
  }, [json]);

  const [modalData, setModalData] = useState([]);

  const [imgUrl, setImgUrl] = useState("");
  const [progresspercent, setProgresspercent] = useState(0);
  const imgUpload = (ee) => {
    const file = ee.target.files[0];
    if (!file) return;

  };
  function validate(value) {
    let error;
    if (!value || value.toString().trim().length == 0) {
      error = "Please, provide any data!";
    }
    return error;
  }
  const [value, setValue] = useState("phone");
  const toast = useToast();



  const [count, setCount] = useState(1);

  const [borrowing, setBorrowing] = useState([]);

  useEffect(() => {
    const fetchBorrowing = async () => {
      const { data } = await axios.get(`${baseURL}borrowing/get-all`);
      setBorrowing(data);
      setIsLoading(false);
    };
    fetchBorrowing();
  }, [count]);
  console.log(borrowing)


  // const [book, setBook] = useState([])

  // const [count1,setCount1] = useState(1)
  // useEffect(() => {
  //   async function fetchBooks() {

  //     for(let i = 0; i<borrowing.length; i++) {
  //       async () => {
  //         const {data} = await axios.post(`${baseURL}book/byID`, {
  //           bookID:borrowing[i].bookID,
  //         });
  //         setBook(data);
          
          
  //       }
  //       if(i == borrowing.length-1 ) {
  //         setCount1(count1)
 
  //       }else {
  //         setCount1(count1+1)
     
  //       }
       
  //     }
     
     
      
  //   }
  //   fetchBooks();
    
  // }, [count1]);
 
  
 



  // console.log(book)

  const [delId, setDelId] = useState();
  // handle delete borrowing
  const handleDeleteBorrowing = async () => {
    await axios.delete(`${baseURL}borrowing/delete/${delId}`, {
      borrowID: delId,
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
  };

  // handle add new borrowing
  const [studentName, setStudentName] = useState("")
  const [bookName, setBookName] = useState("");
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAddNewBorrowing = async () => {

    await axios.post(`${baseURL}borrowing/add-new`, {
      studentID: 1,
      studentName,
      bookName,
      borrowDate,
      returnDate,
      quantity,
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
    setStudentName("")
    setBookName("")
    setBorrowDate("")
    setReturnDate("")
    setQuantity(0)
    setCount(count + 1);
  };


  console.log(modalData.borrowID);
  useEffect(() => {
    if (modalData.borrowID) {
      setStudentName(modalData.studentName)
      setBookName(modalData.bookName)
      setBorrowDate(modalData.borrowDate)
      setReturnDate(modalData.returnDate)
      setQuantity(modalData.quantity)
    }

  }, [modalData]);


  //handle update borrow
  const handleUpdateBorrowing = async () => {

    await axios.put(`${baseURL}borrowing/update`, {
      studentName,
      bookName,
      borrowDate,
      returnDate,
      quantity,
      borrowID: modalData.borrowID,
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
    setStudentName("");
    setBookName("")
    setBorrowDate("")
    setReturnDate("")
    setQuantity(0)
    setCount(count + 1);
  }



  return (
    <Box minH="90vh" my={5}>
      <Container maxW="full">
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="md" fontWeight="500">
                Confirm
              </AlertDialogHeader>

              <AlertDialogBody display="flex" alignItems="center">
                <Icon fontSize="3rem" me="8px" as={BiError} /> Are you sure you
                want to delete?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button size="sm" ref={cancelRef} onClick={onClose}>
                  No
                </Button>
                <Button
                  size="sm"
                  colorScheme="yellow"
                  onClick={() => {
                    onClose();
                    handleDeleteBorrowing();
                  }}
                  ml={3}
                >
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Modal isOpen={isOpened} size="xl" onClose={onClosed}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{modalData.name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                w="150px"
                h="150px"
                m="0 auto"
                objectFit="cover"
                rounded="lg"
                src={modalData.image}
              />
              <Formik
                initialValues={{
                  id: `${modalData.id}`,
                  name: `${modalData.name}`,
                  price: `${modalData.config?.price}`,
                  date: `${modalData.config?.date}`,
                  os: `${modalData.config?.os}`,
                  cpu: `${modalData.config?.cpu}`,
                  gpu: `${modalData.config?.gpu}`,
                  color: `${modalData.config?.color}`,
                  storage: `${modalData.config?.storage}`,
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    handleUpdateBorrowing();
                    onClosed();
                    toast({
                      title: `"${modalData.studentName}" is updated`,
                      status: "success",
                      duration: 7000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <SimpleGrid
                      minChildWidth="160px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >
                      <Field name="studentName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              studentName:
                            </FormLabel>
                            <Input
                              value={studentName}
                              onChange={e => setStudentName(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="student Name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="bookName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              BookName:
                            </FormLabel>
                            <Input
                              value={bookName}
                              onChange={e => setBookName(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="book name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="borrowDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Borrowdate:
                            </FormLabel>
                            <Input
                              value={borrowDate}
                              onChange={e => setBorrowDate(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="date"
                              placeholder="Birthdate"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="returnDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Returndate:
                            </FormLabel>
                            <Input
                              value={returnDate}
                              onChange={e => setReturnDate(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="date"
                              placeholder="Birthdate"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="quantity" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Quantity:
                            </FormLabel>
                            <NumberInput defaultValue={modalData.quantity} min={1} max={50} step={1} onChange={e => setQuantity(e)}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.os}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                      w="130px"
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Submit
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenModal} size="xl" onClose={onCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add New Item</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <HStack spacing={3} paddingY={3}>
                <Button as="label" cursor="pointer" htmlFor="uploadIMG">
                  Choose Image
                </Button>


                <Input
                  onChange={imgUpload}
                  id="uploadIMG"
                  type="file"
                  pointerEvents="none"
                  position="absolute"
                  visibility="hidden"
                  zIndex="-333"
                  opacity="0"
                  accept="image/*"
                />
              </HStack>
              <Formik
                enableReinitialize={true}
                initialValues={{
                  image: `${imgUrl}`,
                  id: `${productList.length}`,
                  name: "",
                  category: `${value}`,
                  price: "",
                  date: "",
                  os: "",
                  cpu: "",
                  gpu: "",
                  color: "",
                  storage: "",
                }}
                onSubmit={(values, actions) => {
                  setTimeout(() => {
                    handleAddNewBorrowing();
                    onCloseModal();
                    toast({
                      title: `"${studentName}" is created`,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                      position: "bottom-right",
                    });
                  }, 1000);
                }}
              >
                {(props) => (
                  <Form>
                    <SimpleGrid
                      minChildWidth="200px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >
                      <Field name="studentName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              studentName:
                            </FormLabel>
                            <Input
                              value={studentName}
                              onChange={e => setStudentName(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="student Name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="bookName">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              BookName:
                            </FormLabel>
                            <Input
                              value={bookName}
                              onChange={e => setBookName(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="book name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="borrowDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Borrowdate:
                            </FormLabel>
                            <Input
                              value={borrowDate}
                              onChange={e => setBorrowDate(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="date"
                              placeholder="Birthdate"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="returnDate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Returndate:
                            </FormLabel>
                            <Input
                              value={returnDate}
                              onChange={e => setReturnDate(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="date"
                              placeholder="Birthdate"
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="quantity" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Quantity:
                            </FormLabel>
                            <NumberInput defaultValue={modalData.quantity} min={1} max={50} step={1} onChange={e => setQuantity(e)}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                            <FormErrorMessage>
                              {form.errors.os}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </SimpleGrid>
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={props.isSubmitting}
                      type="submit"
                      fontSize={{ base: "sm", md: "md", lg: "lg" }}
                      w="130px"
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Add new Borrow
                    </Button>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box bg="cardBg" p={2} borderRadius="8px">
          <Stack
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align="center"
            borderRadius="8px"
            border="1px solid"
            borderColor="borderColor"
            p={3}
            spacing={3}
          >
            <ButtonGroup variant="solid" size="sm" spacing="3">
              <Button
                onClick={onOpenModal}
                p={2}
                boxShadow="lg"
                leftIcon={<Icon fontSize="lg" as={AiOutlinePlus} />}
                colorScheme="green"
              >
                New Item
              </Button>
              <Button
                p={2}
                onClick={() => setJson((prev) => (prev = true))}
                boxShadow="lg"
                leftIcon={<Icon fontSize="lg" as={AiOutlineDownload} />}
                colorScheme="pink"
              >
                Export DB
              </Button>
            </ButtonGroup>
            <Text
              fontWeight="600"
              color="textThird"
              pointerEvents="none"
              fontSize={{ base: "sm", md: "md" }}
            >
              Manage Borrow Books
            </Text>
          </Stack>
          {isLoading ? (
            <Spinner
              w="80px"
              h="80px"
              margin="30px auto"
              thickness="10px"
              color="textFirst"
              display="block"
            />
          ) : (
            <TableContainer my={3}  >
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>BorrowID</Th>
                    <Th>StudentName</Th>
                    <Th>BookName</Th>
                    <Th>BorrowDate</Th>
                    <Th>ReturnDate</Th>
                    {/* <Th>Quantity</Th> */}
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {borrowing.length > 0
                    ? borrowing.map((borrow,index) =>
                      borrow === null ? (
                        ""
                      ) : (
                        <Tr key={borrow.id}>
                          <Td w="100px">{borrow.borrowID}</Td>
                          {/* <Td minW="150px">
                            {
                            book[index] != undefined ? 
                            <Image
                              w="100px"

                              rounded="lg"
                              objectFit="cover"
                              src={`../src/assets/books/${book[index].imageName}`}
                              alt=""
                            />
                            :
                            <Image
                            w="100px"

                            rounded="lg"
                            objectFit="cover"
                            src="{`../src/assets/books/${book[index].imageName}`}"
                            alt=""
                          />
                          }
                            
                          </Td> */}
                          <Td minW="100px">
                            {borrow.studentName}
                          </Td>
                          <Td>{borrow.bookName}</Td>
                          <Td>{moment(`${borrow.borrowDate}`).format('L')}</Td>
                          <Td>{moment(`${borrow.returnDate}`).format('L')}</Td>
                       




                          <Td w="30px">
                            <HStack spacing={3}>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                size="sm"
                                onClick={() => {
                                  onOpened();
                                  setModalData(borrow);
                                }}
                                rounded="full"
                                icon={<Icon as={AiOutlineEdit} />}
                              />
                              <IconButton
                                onClick={() => {
                                  onOpen();
                                  setDelId(borrow.borrowID);
                                }}
                                colorScheme="yellow"
                                aria-label="Delete"
                                size="sm"
                                rounded="full"
                                icon={<Icon as={AiOutlineDelete} />}
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      )
                    )
                    : undefined}
                </Tbody>
              </Table>
            </TableContainer>
          )}
          <Pagination
            postPerPage={postsPerPage}
            totalPosts={productList}
            paginate={paginate}
          />
        </Box>
      </Container>

    </Box>
  );
};

export default memo(BorrowBook);
