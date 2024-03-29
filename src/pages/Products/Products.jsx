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
  Select,
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
import { useNavigate, useNavigation } from "react-router-dom";
const Products = () => {
  const dispatch = useDispatch();
  const filteredData = useSelector((state) => state.products.products);
  const productList = filteredData.filter((filtered) => filtered !== null);
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
  const imgUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // const storageRef = ref(storage, `${file.name}`);

    // console.log(file.name)
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // uploadTask.on(
    //   "state_changed",
    //   (snapshot) => {
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setProgresspercent(progress);
    //   },
    //   (error) => {
    //     alert(error);
    //   },
    //   () => {
    //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //       setImgUrl((url) => (url = downloadURL));
    //     });
    //   }
    // );
    console.log(file.name)
    setImageName(file.name)
  };
  function validate(value) {
    let error;
    if (!value || value.toString().trim().length == 0) {
      error = "Please, provide any data!";
    }
    return error;
  }
  const [value, setValue] = useState("");
  const toast = useToast();


  const [books, setBooks] = useState([]);

  const [imageName, setImageName] = useState("")
  const [bookName, setBookName] = useState("");
  const [genreName, setGenreName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [language, setLanguage] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const [count, setCount] = useState(1);
  useEffect(() => {
    const fetchBooks = async () => {
      const { data } = await axios.get(`${baseURL}books/get-all`);
      setBooks(data);
      setIsLoading(false);
    };
    fetchBooks();
  }, [count]);
  console.log(books)

  const [delId, setDelId] = useState();
  const handleDeleteBook = async () => {
    await axios.delete(`${baseURL}book/delete/${delId}`, {
      bookID: delId,
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

  //get genres
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(`${baseURL}genres/get-all`);
      setCategories(data);
      setIsLoading(false);
    };
    fetchCategory();
  }, []);
  console.log(categories)

  //handle add new book

  console.log(bookName, genreName, authorName, language, quantity, price, description)
  const handleCreateNewBook = async () => {

    await axios.post(`${baseURL}book/add-new`, {
      bookName,
      genreName,
      authorName,
      quantity,
      price,
      language,
      description,
      imageName,
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
    setBookName("");
    setAuthorName("");
    setGenreName("");
    setQuantity("");
    setPrice("");
    setLanguage("");
    setDescription("");
    setCount(count + 1);
  };

  console.log(modalData.bookID);
  useEffect(() => {
    if (modalData.bookID) {
      setBookName(modalData.bookName);
      setAuthorName(modalData.authorName);
      setGenreName(modalData.genreName);
      setQuantity(modalData.quantity);
      setPrice(modalData.price);
      setLanguage(modalData.language);
      setDescription(modalData.description);
    }

  }, [modalData]);


  //handle update book
  const handleUpdateBook = async () => {

    await axios.put(`${baseURL}book/update`, {
      bookName,
      genreName,
      authorName,
      quantity,
      price,
      language,
      description,
      imageName,
      bookID: modalData.bookID,
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
    setBookName("");
    setAuthorName("");
    setGenreName("");
    setQuantity("");
    setPrice("");
    setLanguage("");
    setDescription("");


    // window.location.reload(true)
    // // eslint-disable-next-line react-hooks/rules-of-hooks
    // const navigate = useNavigate();

    //   navigate('/products')

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
                    handleDeleteBook();
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
                src={`../src/assets/books/${modalData.imageName}`}
              />
              <HStack spacing={3} paddingY={3}>
                <Button as="label" cursor="pointer" htmlFor="uploadIMG">
                  Choose Image
                </Button>

                <Text>{imageName}</Text>
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
                    handleUpdateBook();
                    onClosed();
                    toast({
                      title: `"${modalData.bookName}" is updated`,
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
                      minChildWidth="250px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >
                      <Field name="name" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Name:
                            </FormLabel>
                            <Input

                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Name"
                              value={bookName}
                              onChange={(e) => setBookName(e.target.value)}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="category" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Genres:
                            </FormLabel>

                            <Stack direction="row" {...field}>

                              <Select placeholder='Select genre' onChange={(e) => { setGenreName(e.target.value) }}>
                                {
                                  categories.map(item => (<option value={item.genreName} key={item.id}>{item.genreName}</option>))
                                }

                              </Select>
                            </Stack>

                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="author" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Author:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder=""
                              value={authorName}
                              onChange={(e) => setAuthorName(e.target.value)}
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="language" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Language:
                            </FormLabel>
                            <RadioGroup
                              onChange={e => setLanguage(e)}
                              name="language"

                            >
                              <Stack direction="row" {...field}>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="VietNamese"
                                >
                                  VietNamese
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="English"
                                >
                                  English

                                </Radio>
                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.category}
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
                      <Field name="price" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Price:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="Price"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="description" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Description:
                            </FormLabel>
                            <Textarea
                              // value={value}
                              // onChange={handleInputChange}
                              placeholder="Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            />

                            <FormErrorMessage>
                              {form.errors.color}
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
            <ModalHeader>Add New Book</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack spacing={3} paddingY={3}>
                <Button as="label" cursor="pointer" htmlFor="uploadIMG">
                  Choose Image
                </Button>

                <Text>{imageName}</Text>
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
                    handleCreateNewBook();
                    onCloseModal();
                    toast({
                      title: `Sách "${bookName}" is created`,
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
                      minChildWidth="250px"
                      spacingY={3}
                      spacingX={10}
                      mt={3}
                    >

                      <Field name="name" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Name:
                            </FormLabel>
                            <Input

                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Name"
                              value={bookName}
                              onChange={(e) => setBookName(e.target.value)}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="category" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Genres:
                            </FormLabel>

                            <Stack direction="row" {...field}>

                              <Select placeholder='Select genre' onChange={(e) => { setGenreName(e.target.value) }}>
                                {
                                  categories.map(item => (<option value={item.genreName} key={item.id}>{item.genreName}</option>))
                                }

                              </Select>
                            </Stack>

                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="author" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Author:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="Author"
                              value={authorName}
                              onChange={(e) => setAuthorName(e.target.value)}
                            />
                            <FormErrorMessage>
                              {form.errors.date}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="language" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Language:
                            </FormLabel>
                            <RadioGroup
                              onChange={e => setLanguage(e)}
                              name="language"

                            >
                              <Stack direction="row" {...field}>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="VietNamese"
                                >
                                  VietNamese
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="English"
                                >
                                  English

                                </Radio>
                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.category}
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
                            <NumberInput defaultValue={1} min={1} max={50} step={1} onChange={e => setQuantity(e)}>
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
                      <Field name="price" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Price:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="Price"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="description" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Description:
                            </FormLabel>
                            <Textarea
                              // value={value}
                              // onChange={handleInputChange}
                              placeholder="Description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            />

                            <FormErrorMessage>
                              {form.errors.color}
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
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Add new book
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
                New Book
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
              Manage Books
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
                    <Th>Name</Th>
                    <Th>Image</Th>
                    <Th>Genre</Th>
                    <Th>Author</Th>
                    <Th>Language</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {books.length > 0
                    ? books.map((book) =>
                      book == null ? (
                        ""
                      ) : (
                        <Tr key={book.id}>
                          <Td w="400px">{book.bookName}</Td>
                          <Td minW="150px">
                            <Image
                              w="100px"
                              height="70px"
                              rounded="lg"
                              objectFit="cover"
                              src={`../src/assets/books/${book.imageName}`}
                              alt={book.imageName}
                            />
                          </Td>
                          <Td>{book.genreName}</Td>
                          <Td>{book.authorName}</Td>
                          <Td>{book.language}</Td>
                          <Td>{book.quantity}</Td>
                          <Td>{book.price}</Td>
                          <Td w="30px">
                            <HStack spacing={3}>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                size="sm"
                                onClick={() => {
                                  onOpened();
                                  setModalData(book);
                                }}
                                rounded="full"
                                icon={<Icon as={AiOutlineEdit} />}
                              />
                              <IconButton
                                onClick={() => {
                                  onOpen();
                                  setDelId(book.bookID);
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

export default memo(Products);
