import {
  Box, Button, Card, CardBody, Avatar, Image, Input, InputGroup, InputRightElement, Menu, MenuList, MenuButton, MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, Text
} from "@chakra-ui/react";
import logo from "../assets/icons/logo.svg";
import { MdSearch } from "react-icons/md";

import { startTransition, useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react"
import axios from "axios";
import { baseURL } from "../urlserver.js";
function Navbar() {
  const navigate = useNavigate();
  const navigateLogin = async () => {

    await startTransition(() => {
      navigate("/login")

    });


  }
  const navigateRegister = async () => {

    await startTransition(() => {
      navigate("/register")

    });
  }
  const navigateHome = async () => {

    await startTransition(() => {
      navigate("/")

    });
  }

  const navigateProfile = async () => {

    await startTransition(() => {
      navigate("/profile")

    });
  }
  const [count, setCount] = useState(1)
  const [user, setUser] = useState({})
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    setUser(userInfo)
  }, [count])


  console.log(user)

  const handleLogout = () => {

    localStorage.removeItem("userInfo")
    setCount(count + 1);
    window.location.reload()

  }


  //get genres
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const { data } = await axios.get(`${baseURL}genres/get-all`);
      setGenres(data);

    };
    fetchGenres();
  }, []);
  console.log(genres)
  return (
    <>
      <Box bg="#e1dcc5" w="75%" p={4} color="white" display="flex" justifyContent="space-between" margin="0 auto" alignItems="center">

        <Image
          src={logo}
          w="30"
          h="30"
          objectFit="cover"
          alt=""
          onClick={navigateHome}
        />
        <Menu>
          {/* rightIcon={<ChevronDownIcon />} */}

          <Text fontSize="1xl" color="#333333" fontWeight="semibold">My Books</Text>
          <MenuButton as={Button} bg="#e1dcc5" color="#333333">
            Category
          </MenuButton>
          <MenuList color="black"
          >
            {
              genres.map((genre, key) => (
                <MenuItem key={key}>{genre.genreName}</MenuItem>
              ))
            }

          </MenuList>
        </Menu>
        <InputGroup size="md" w="300" >
          <Input
            pr="4.5rem"

            placeholder="Search"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" bg="#fff" >
              <MdSearch bg="#000" color="#000" />
            </Button>
          </InputRightElement>
        </InputGroup>

        {
          user ?
            (
              <Menu >
                <MenuButton >
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Avatar size="sm" name={user.name} src={`../src/assets/students/${user.imageName}`} />
                    <Text fontSize="1xl" color="#333333" fontWeight="semibold" pl="6px">Hi, {user.name}</Text>

                  </div>

                </MenuButton>
                <MenuList
                  color="black"
                  transition="all 0..5s"


                >
                  <MenuItem _hover={{ bg: "#e1dcc5" }} fontSize="1xl" color="#333333" fontWeight="semibold" onClick={navigateProfile}>Profile</MenuItem>
                  <MenuItem _hover={{ bg: "#e1dcc5" }} fontSize="1xl" color="#333333" fontWeight="semibold" onClick={handleLogout}>Log out</MenuItem>


                </MenuList>
              </Menu>

            )
            :
            (
              <>
                <Button h="1.75rem" size="sm" bg="transparent" color="#333333" width="30" onClick={navigateLogin}>
                  Login
                </Button>

                <Button h="1.75rem" size="sm" bg="#0376B8" onClick={navigateRegister}>
                  Sign up
                </Button>
              </>
            )
        }


      </Box >
    </>
  )
}

export default Navbar