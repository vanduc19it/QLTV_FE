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
  Select,
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
import moment from "moment";
import Select1 from "react-select";
const Students = () => {


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
    // const storageRef = ref(storage, `${file.name}`);
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
    setImageName(file.name)
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

  //handle fetch employee
  const [count, setCount] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get(`${baseURL}students/get-all`);
      setStudents(data);
      setIsLoading(false);
    };
    fetchStudents();
  }, [count]);
  console.log(students)

  const [delId, setDelId] = useState();
  const handleDeleteStudent = async () => {
    await axios.delete(`${baseURL}student/delete/${delId}`, {
      studentID: delId,
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


  // handle add new employee


  const [imageName, setImageName] = useState("a")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [classs, setClasss] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [uniID, setUniID] = useState(1);

  const handleAddNewStudent = async () => {

    await axios.post(`${baseURL}student/add-new`, {
      name,
      email,
      phone,
      class: classs,
      department,
      gender,
      birthday,
      address,
      password,
      uniID,
      imageName
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
    setPhone(0);
    setClasss("");
    setDepartment("");
    setGender("");
    setBirthday("");
    setAddress("");
    setUniID(1);
    setCount(count + 1);
  };


  console.log(modalData.studentID);
  useEffect(() => {
    if (modalData.studentID) {
      setName(modalData.name);
      setEmail(modalData.email);
      setPhone(modalData.phone);
      setClasss(modalData.class);
      setDepartment(modalData.department);
      setGender(modalData.gender);
      setBirthday(modalData.birthday);
      setAddress(modalData.address);
      setUniID(modalData.uniID);
      setImageName(modalData.imageName)
    }

  }, [modalData]);


  //handle update book
  const handleUpdateStudent = async () => {

    await axios.put(`${baseURL}student/update`, {
      name,
      email,
      phone,
      class: classs,
      department,
      gender,
      birthday,
      address,
      uniID,
      imageName,
      studentID: modalData.studentID,
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
    setPhone(0);
    setClasss("");
    setDepartment("");
    setGender("");
    setBirthday("");
    setAddress("");
    setUniID(1);
    setCount(count + 1);
  }


  const [uni, setUni] = useState(1);
  const handleSelectUni = async(e) => {
    setUni(e.value);
    
    
    setTimeout("",3000);

    if(uni== 0) {
      setCount(count+1)
    }

    const { data } = await axios.post(`${baseURL}students/uniID`, {
      uniID: uni,
  })
  
  console.log(data)
  setStudents(data);
    
  
}



  console.log(uni)

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
                    handleDeleteStudent();
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
                src={`../src/assets/students/${imageName}`}
              />
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
                    handleUpdateStudent();
                    onClosed();
                    toast({
                      title: `"${name}" is updated`,
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
                      <Field name="name">
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
                              value={name}
                              onChange={e => setName(e.target.value)}
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
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Email:
                            </FormLabel>
                            <Input
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              type="email"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Email"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="phone">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Phone:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              placeholder="Phone"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="class">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Class:
                            </FormLabel>
                            <Input
                              value={classs}
                              onChange={e => setClasss(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Class"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="department" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Department:
                            </FormLabel>

                            <Stack direction="row" {...field}>

                              <Select placeholder='Select deparment' onChange={(e) => { setDepartment(e.target.value) }}>
                                <option value="KHMT">KHMT</option>
                                <option value="KTMT">KTMT</option>
                                <option value="QTKD">QTKD</option>
                              </Select>
                            </Stack>

                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gender">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Gender:
                            </FormLabel>
                            <RadioGroup
                              onChange={e => setGender(e)}
                              name="gender"

                            >
                              <Stack direction="row" {...field}>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="male"
                                >
                                  Male
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="female"
                                >
                                  Female
                                </Radio>

                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="birthdate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Birthdate:
                            </FormLabel>
                            <Input
                              value={birthday}
                              onChange={e => setBirthday(e.target.value)}
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

                      <Field name="address">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Address:
                            </FormLabel>
                            <Textarea
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              placeholder="Address"

                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            />

                            <FormErrorMessage>
                              {form.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="university">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              University:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="university"
                            />
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
                  
                      display="block"
                      margin="30px auto 10px auto"
                    >
                      Update Student
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
              {imgUrl.length > 0 ? (
                <Image
                  w="150px"
                  h="150px"
                  m="0 auto"
                  objectFit="cover"
                  rounded="lg"
                  src={`../src/assets/students/${imageName}`}
                />
              ) : null}
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
                    handleAddNewStudent();
                    onCloseModal();
                    toast({
                      title: `"${name}" is created`,
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
                      <Field name="name">
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
                              value={name}
                              onChange={e => setName(e.target.value)}
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
                      <Field name="email">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Email:
                            </FormLabel>
                            <Input
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              type="email"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Email"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="phone">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Phone:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                              placeholder="Phone"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="class">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.name && form.touched.name}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Class:
                            </FormLabel>
                            <Input
                              value={classs}
                              onChange={e => setClasss(e.target.value)}
                              type="text"
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              placeholder="Class"
                            />
                            <FormErrorMessage>
                              {form.errors.name}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="department" >
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Department:
                            </FormLabel>

                            <Stack direction="row" {...field}>

                              <Select placeholder='Select deparment' onChange={(e) => { setDepartment(e.target.value) }}>
                                <option value="KHMT">KHMT</option>
                                <option value="KTMT">KHMT</option>
                                <option value="QTKD">KHMT</option>
                              </Select>
                            </Stack>

                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="gender">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.category && form.touched.category
                            }
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Gender:
                            </FormLabel>
                            <RadioGroup
                              onChange={e => setGender(e)}
                              name="gender"

                            >
                              <Stack direction="row" {...field}>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="male"
                                >
                                  Male
                                </Radio>
                                <Radio
                                  size={{ base: "sm", md: "md" }}
                                  value="female"
                                >
                                  Female
                                </Radio>

                              </Stack>
                            </RadioGroup>
                            <FormErrorMessage>
                              {form.errors.category}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                      <Field name="birthdate">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.date && form.touched.date}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Birthdate:
                            </FormLabel>
                            <Input
                              value={birthday}
                              onChange={e => setBirthday(e.target.value)}
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

                      <Field name="address">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.color && form.touched.color}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Address:
                            </FormLabel>
                            <Textarea
                              value={address}
                              onChange={e => setAddress(e.target.value)}
                              placeholder="Address"

                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            />

                            <FormErrorMessage>
                              {form.errors.color}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="university">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.os && form.touched.os}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              University:
                            </FormLabel>
                            <Input
                              {...field}
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="text"
                              placeholder="university"
                            />
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
                New Student
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
            

                              <Select1 
                      placeholder="Select University" defaultValue={1} 
                      options={[{ value: 0, label: "TẤT CẢ" },{ value: 1, label: "ĐH CNTT & TT VIỆT HÀN" }, { value: 2, label: "ĐH BÁCH KHOA" },{ value: 3, label: "ĐH SƯ PHẠM" }, { value: 4, label: "ĐH KINH TẾ" },{ value: 5, label: "ĐH SP KỸ THUẬT" }]} 
                      onChange={(e)=>handleSelectUni(e)}>
                        
                      
              </Select1>
            </ButtonGroup>
            <Text
              fontWeight="600"
              color="textThird"
              pointerEvents="none"
              fontSize={{ base: "sm", md: "md" }}
            >
              Manage Students
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
                    <Th>MaSV</Th>
                    <Th>Image</Th>
                    <Th>HoVaTen</Th>
                    <Th>Lop</Th>
                    <Th>Khoa</Th>
                    <Th>GioiTinh</Th>
                    <Th>NgaySinh</Th>
                    <Th>DiaChi</Th>
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {students.length > 0
                    ? students.map((student) =>
                      student === null ? (
                        ""
                      ) : (
                        <Tr key={student.id}>
                          <Td w="100px">{student.studentID}</Td>

                          <Td minW="150px">
                            <Image
                              w="100px"

                              rounded="lg"
                              objectFit="cover"
                              src={`../src/assets/students/${student.imageName}`}
                              alt={student.imageName}
                            />
                          </Td>
                          <Td minW="100px">
                            {student.name}
                          </Td>
                          <Td>{student.class}</Td>
                          <Td>{student.department}</Td>
                          <Td>{student.gender}</Td>
                          <Td>{moment(`${student.birthday}`).calendar()}</Td>

                          <Td>
                            {student.address}
                          </Td>


                          <Td w="30px">
                            <HStack spacing={3}>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                size="sm"
                                onClick={() => {
                                  onOpened();
                                  setModalData(student);
                                }}
                                rounded="full"
                                icon={<Icon as={AiOutlineEdit} />}
                              />
                              <IconButton
                                onClick={() => {
                                  onOpen();
                                  setDelId(student.studentID);
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

export default memo(Students);
