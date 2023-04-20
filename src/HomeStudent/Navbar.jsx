import {
  Box, Button, Card, CardBody, Image, Input, InputGroup, InputRightElement, Menu, MenuList, MenuButton, MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, Text
} from '@chakra-ui/react';
import logo from "../assets/icons/logo.svg";
import { MdSearch } from "react-icons/md";

import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react'

function Navbar() {
  const navigate = useNavigate();
  const navigateLogin = async () => {

    await startTransition(() => {
      navigate('/login')

    });


  }
  const navigateRegister = async () => {

    await startTransition(() => {
      navigate('/register')

    });
  }
  const navigateHome = async () => {

    await startTransition(() => {
      navigate('/home')

    });
  }
  return (
    <>
      <Box bg='#e1dcc5' w='75%' p={4} color='white' display="flex" justifyContent="space-between" margin="0 auto" alignItems="center">

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

          <Text fontSize='1xl' color="#333333" fontWeight="semibold">My Books</Text>
          <MenuButton as={Button} bg="#e1dcc5" color="#333333">
            Category
          </MenuButton>
          <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem>Create a Copy</MenuItem>
            <MenuItem>Mark as Draft</MenuItem>
            <MenuItem>Delete</MenuItem>
            <MenuItem>Attend a Workshop</MenuItem>
          </MenuList>
        </Menu>
        <InputGroup size='md' w="300" >
          <Input
            pr='4.5rem'

            placeholder='Search'
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' bg="#fff" >
              <MdSearch bg="#000" color="#000" />
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button h='1.75rem' size='sm' bg="transparent" color="#333333" width="30" onClick={navigateLogin}>
          Login
        </Button>

        <Button h='1.75rem' size='sm' bg="#0376B8" onClick={navigateRegister}>
          Sign up
        </Button>

      </Box>
    </>
  )
}

export default Navbar