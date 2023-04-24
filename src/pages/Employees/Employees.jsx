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
import moment from "moment"
import Select from "react-select";
const Employees = () => {


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
  const [value, setValue] = useState("phone");
  const toast = useToast();


  //handle fetch employee
  const [count, setCount] = useState(1);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      // let employee = JSON.parse(localStorage.getItem("employee"))
      // let uniID = employee.uniID ; 
      const { data } = await axios.get(`${baseURL}employees/get-all/`);
      setEmployees(data);
      setIsLoading(false);
    };
    fetchEmployees();
  }, [count]);
  console.log(employees)

  const [delId, setDelId] = useState();
  // handle delete employee
  const handleDeleteEmployee = async () => {
    await axios.delete(`${baseURL}employee/delete/${delId}`, {
      employeeID: delId,
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


  const [imageName, setImageName] = useState("")
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("1/1/2000");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("Đà Nẵng");
  const [phone, setPhone] = useState(0);
  const [salary, setSalary] = useState(0);
  const [uniID, setUniID] = useState(1);

  const handleAddNewEmployee = async () => {

    await axios.post(`${baseURL}employee/add-new`, {
      name,
      email,
      birthday,
      gender,
      address,
      phone,
      salary,
      uniID,
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
    setName("");
    setEmail("");
    setAddress("");
    setBirthday("");
    setGender("");
    setPhone(0);
    setSalary(0);
    setUniID(1);
    setCount(count + 1);
  };


  
  useEffect(() => {
    if (modalData.employeeID) {
      setName(modalData.name);
      setEmail(modalData.email);
      setAddress(modalData.address);
      setBirthday(modalData.birthday);
      setGender(modalData.gender);
      setPhone(modalData.phone);
      setSalary(modalData.salary);
      setUniID(modalData.uniID);
    }

  }, [modalData]);


  //handle update book
  const handleUpdateEmployee = async () => {
    console.log(name,
      email,
      birthday,
      gender,
      address,
      phone,
      salary,
      uniID,
      imageName,
      modalData.employeeID,)
    await axios.put(`${baseURL}employee/update`, {
      name,
      email,
      birthday,
      gender,
      address,
      phone,
      salary,
      uniID,
      imageName,
      employeeID: modalData.employeeID,
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
    setAddress("");
    setBirthday("");
    setGender("");
    setPhone(0);
    setSalary(0);
    setUniID(1);
    setCount(count + 1);
  }


  const [uni, setUni] = useState(1);
  const handleSelectUni = async(e) => {
    setUni(e.value);
    setUni(e.value);
    
    setTimeout("",3000);

    if(uni== 0) {
      setCount(count+1)
    }

    const { data } = await axios.post(`${baseURL}employees/uniID`, {
      uniID: uni,
  })
  
  console.log(data)
  setEmployees(data);
    
  
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
                    handleDeleteEmployee();
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
                src={`../src/assets/employees/${modalData.imageName}`}
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
                    handleUpdateEmployee();
                    onClosed();
                    toast({
                      title: `"${modalData.name}" is updated`,
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

                      <Field name="salary">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Salary:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={salary}
                              onChange={e => setSalary(e.target.value)}
                              placeholder="Salary"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
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
            <ModalHeader>Add New Employee</ModalHeader>
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
                    handleAddNewEmployee();
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
                      minChildWidth="250px"
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

                      <Field name="salary">
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={form.errors.price && form.touched.price}
                          >
                            <FormLabel
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                            >
                              Salary:
                            </FormLabel>
                            <Input
                              fontSize={{ base: "sm", md: "md", lg: "lg" }}
                              type="number"
                              value={salary}
                              onChange={e => setSalary(e.target.value)}
                              placeholder="Salary"
                            />
                            <FormErrorMessage>
                              {form.errors.price}
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
                      Add New Employee
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
                New Employee
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
              <Select 
                      placeholder="Select University" defaultValue={1} 
                      options={[{ value: 0, label: "TẤT CẢ" },{ value: 1, label: "ĐH CNTT & TT VIỆT HÀN" }, { value: 2, label: "ĐH BÁCH KHOA" },{ value: 3, label: "ĐH SƯ PHẠM" }, { value: 4, label: "ĐH KINH TẾ" },{ value: 5, label: "ĐH SP KỸ THUẬT" }]} 
                      onChange={(e)=>handleSelectUni(e)}>
                        
                      
              </Select>
            </ButtonGroup>
            <Text
              fontWeight="600"
              color="textThird"
              pointerEvents="none"
              fontSize={{ base: "sm", md: "md" }}
            >
              Manage Employees
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
                    <Th>MaNV</Th>
                    <Th>Anh</Th>
                    <Th>HoVaTen</Th>
                    <Th>NgaySinh</Th>
                    <Th>GioiTinh</Th>
                    <Th>DiaChi</Th>
                    <Th>Luong</Th>
                    <Th>Email</Th>
                    <Th>SoDienThoai</Th>
                    <Th textAlign="center">Edit</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {employees.length > 0
                    ? employees.map((employee) =>
                      employee === null ? (
                        ""
                      ) : (
                        <Tr key={employee.id}>
                          <Td w="100px">{employee.employeeID}</Td>
                          <Td minW="150px">
                            <Image
                              w="100px"
                              rounded="lg"
                              objectFit="cover"
                              src={`../src/assets/employees/${employee.imageName}`}
                              alt={employee.imageName}
                            />
                          </Td>
                          <Td>{employee.name}</Td>
                          <Td>{moment(`${employee.birthday}`).format("L")}</Td>
                          <Td>{employee.gender}</Td>
                          <Td>
                            {employee.address}
                          </Td>
                          <Td>
                            {employee.salary}
                          </Td>
                          <Td>
                            {employee.email}
                          </Td>
                          <Td>
                            {employee.phone}
                          </Td>
                          <Td w="30px">
                            <HStack spacing={3}>
                              <IconButton
                                colorScheme="teal"
                                aria-label="Edit"
                                size="sm"
                                onClick={() => {
                                  onOpened();
                                  setModalData(employee);
                                }}
                                rounded="full"
                                icon={<Icon as={AiOutlineEdit} />}
                              />
                              <IconButton
                                onClick={() => {
                                  onOpen();
                                  setDelId(employee.employeeID);
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

export default memo(Employees);
