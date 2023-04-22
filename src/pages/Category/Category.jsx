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
const Category = () => {


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
    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl((url) => (url = downloadURL));
        });
      }
    );
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

  //get genres
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const { data } = await axios.get(`${baseURL}genres/get-all`);
      setCategories(data);
      setIsLoading(false);
    };
    fetchCategory();
  }, [count]);
  console.log(categories)

  // add new genres
  const [genreName, setGenreName] = useState("");
  const [description, setDescription] = useState("");
  console.log(genreName, description)
  const handleCreateNewGenre = async () => {

    await axios.post(`${baseURL}category/add-new`, {
      genreName,
      description,
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
    setGenreName("")
    setDescription("");
    setCount(count + 1);
  };

  //update genre
  const handleUpdateGenre = async () => {
    await axios.put(`${baseURL}category/update`, {
      genreName,
      description,
      genreID: modalData.genreID,
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

    setGenreName("")
    setDescription("");
    setCount(count + 1);
  }


  const [delId, setDelId] = useState(null);
  console.log(delId)
  const handleDeleteGenre = async () => {
    await axios.delete(`${baseURL}category/delete/${delId}`, {
      genreID: delId,
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
                    handleDeleteGenre();
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
                    handleUpdateGenre();
                    onClosed();
                    toast({
                      title: `Thể loại "${genreName}" is updated`,
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
                              onChange={(e) => setGenreName(e.target.value)}
                              value={genreName}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder={modalData.genreName}
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="description">
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
                              placeholder={modalData.description}

                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
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
                      Update Genres
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
            <ModalHeader>Add New Genres</ModalHeader>
            <ModalCloseButton />
            <ModalBody>


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

                    handleCreateNewGenre();
                    onCloseModal();
                    toast({
                      title: `Thể loại "${genreName}" is created`,
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
                              onChange={(e) => setGenreName(e.target.value)}
                              value={genreName}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Name"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="description">
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

                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              onChange={(e) => setDescription(e.target.value)}
                              value={description}
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
                      Add New Genre
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
                New Genre
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
              Manage Category
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
                    <Th>MaDanhMuc</Th>
                    <Th>TenDanhMuc</Th>
                    <Th>Description</Th>
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {categories.length > 0
                    ? categories.map((category) =>
                      category === null ? (
                        ""
                      ) : (
                        <Tr key={category.id}>
                          <Td w="300px">{category.genreID}</Td>
                          <Td minW="200px">
                            {category.genreName}
                          </Td>
                          <Td minW="300px">
                            {category.description}
                          </Td>

                          <Td w="60px">
                            <HStack spacing={8}>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                size="sm"
                                onClick={() => {
                                  onOpened();
                                  setModalData(category);
                                }}
                                rounded="full"
                                icon={<Icon as={AiOutlineEdit} />}
                              />
                              <IconButton
                                onClick={() => {
                                  onOpen();
                                  setDelId(category.genreID);
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

export default memo(Category);
