import {
  Box,
  Container,
  Flex,
  Icon,
  HStack,
  IconButton,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useColorMode,
  useColorModeValue,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Badge,
  Stack,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Card,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, memo } from "react";
import { BsSun, BsMoonFill, BsBasket } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  AiOutlineDelete,
} from "react-icons/ai";
import avatar from "../../assets/img/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard } from "../../redux/cardSlice/cardSlice.jsx";
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';

function Header({ setNav }) {

  const { toggleColorMode } = useColorMode();
  const systemMode = useColorModeValue(BsSun, BsMoonFill);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const basket = useSelector((state) => state.cart.cardItems);
  const totalAmount = useSelector((state) => state.cart.cardTotalAmount);
  const dispatch = useDispatch();
  const [delID, setDelID] = useState([]);


  useEffect(
    () => {
      dispatch(deleteCard(delID));
    },
    [delID, dispatch]
  );


  const navigate = useNavigate();

  const [admin, setAdmin] = useState({})
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"))
    setAdmin(admin)
  }, [])




  console.log(admin)


  const navigateHome = () => {
    localStorage.setItem("role", JSON.stringify(0));
    navigate('/')
    window.location.reload()
  }

  const handleLogout = () => {

    navigate('/admin/login')
    window.location.reload()
  }
  return (
    <HStack pt="20px" bg="transparent" as="header">
      <Container maxW="full">
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="textFirst">Thông Báo</DrawerHeader>
            <DrawerBody px={2}>
              {basket.length > 0 ? (
                basket.map((basket) => (
                  <Card
                    bg="cardBg"
                    boxShadow="none"
                    color="textFirst"
                    maxW="full"
                    direction="row"
                    align="flex-start"
                    key={basket.id}
                    mb={4}
                  >
                    <CardBody>
                      <Image
                        w="140px"
                        h="90px"
                        objectFit="cover"
                        src={basket.image}
                        alt={basket.name}
                        borderRadius="lg"
                      />
                    </CardBody>
                    <CardFooter w="calc(100% - 140px)" px="5px">
                      <Stack spacing={2} textAlign="left">
                        <Heading size="xs">{basket.name}</Heading>
                        <Text fontWeight="600" fontSize="md">
                          ${basket.config.price * basket.quantity}
                        </Text>
                        <IconButton
                          bg="miniCard"
                          aria-label="Delete from Basket"
                          onClick={() => setDelID((prev) => (prev = basket))}
                          icon={
                            <Icon
                              w="15px"
                              h="15px"
                              color="textThird"
                              as={AiOutlineDelete}
                            />
                          }
                        />
                      </Stack>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Heading
                  textAlign="center"
                  fontSize={{ base: "xl", sm: "3xl" }}
                >
                  Empty!{" "}

                </Heading>
              )}
            </DrawerBody>
            <DrawerFooter
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >

            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Flex align="center" justify="space-between">
          <IconButton
            bg="miniCard"
            fontSize="lg"
            display={{ base: "block", lg: "none" }}
            icon={
              <Icon
                w="20px"
                h="20px"
                color="textThird"
                onClick={setNav}
                as={HiMenuAlt1}
              />
            }
          />
          <Text fontWeight="500">Quản Lý Thư Viện</Text>

          <HStack spacing="7px">
            <Box position="relative">
              <IconButton
                ref={btnRef}
                onClick={onOpen}
                bg="miniCard"
                aria-label="Basket"
                w={{ base: "32px", sm: "34px", md: "36px" }}
                h={{ base: "32px", sm: "34px", md: "36px" }}
                icon={
                  <Icon
                    w={{ base: "16px", sm: "18px", md: "20px" }}
                    h={{ base: "16px", sm: "18px", md: "20px" }}
                    color="textThird"
                    as={IoNotificationsOutline}
                  />
                }
              />
              <Badge
                colorScheme="blue"
                position="absolute"
                pointerEvents="none"
                left="-8px"
                top="-6px"
                fontSize="12px"
              >
                {basket.length}
              </Badge>
            </Box>
            <IconButton
              bg="miniCard"
              onClick={toggleColorMode}
              w={{ base: "32px", sm: "34px", md: "36px" }}
              h={{ base: "32px", sm: "34px", md: "36px" }}
              aria-label="Dark & Light Mode"
              icon={
                <Icon
                  w={{ base: "16px", sm: "18px", md: "20px" }}
                  h={{ base: "16px", sm: "18px", md: "20px" }}
                  color="textThird"
                  as={systemMode}
                />
              }
            />
            <Box>
              <Menu gutter="12">
                <MenuButton
                  bg="miniCard"
                  w={{ base: "32px", sm: "34px", md: "36px" }}
                  h={{ base: "32px", sm: "34px", md: "36px" }}
                  borderColor="transparent"
                  _hover={{
                    bg: "miniCard",
                  }}
                  as={IconButton}
                  aria-label="Options"
                  icon={<Avatar size="sm" name="Nijat Hamid" src={avatar} />}
                  variant="outline"
                />

                <MenuList
                  color="black"
                  transition='all 0..5s'


                >
                  <MenuItem _hover={{ bg: '#e1dcc5' }} fontSize="1xl" color="#333333" fontWeight="semibold" onClick={navigateHome}>Trang chủ</MenuItem>
                  <MenuItem _hover={{ bg: '#e1dcc5' }} fontSize="1xl" color="#333333" fontWeight="semibold" onClick={handleLogout}>Log out</MenuItem>


                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Flex>
      </Container>
    </HStack>
  );
}

export default memo(Header);
