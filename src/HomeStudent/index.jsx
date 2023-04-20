import {
  Box, Button, Card, CardBody, Image, Input, InputGroup, InputRightElement, Menu, MenuList, MenuButton, MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider, Text
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import logo from "../assets/icons/logo.svg";
import logo1 from "../assets/books/1.jpg";
import logo2 from "../assets/books/2.jpg";
import logo3 from "../assets/books/3.jpg";
import logo4 from "../assets/books/4.jpg";
import logo5 from "../assets/books/5.jpg";
import Slider from "react-slick";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import { MdSearch } from "react-icons/md";

import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

import axios from "axios";
import { baseURL } from "../urlserver.js";
function index() {

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
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


  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  // const items = a.map(item => [
  // <div className="item" data-value={item}>{item}</div>]


  // )
  const labels = [
    <div key={1} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Text colorScheme='blue' mt="4" w="180px">Read Free Library Books Online</Text>

    </div>,
    <div key={2} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>

    </div>,
    <div key={3} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>

    </div>,
    <div key={4} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>

    </div>,
    <div key={5} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>

    </div>,
  ]

  const items = [

    books.map((book, id) =>
    (

      <div key={id} className="item-book" data-value="1" style={{}} >
        <Image
          src={`../src/assets/books/${book.imageName}`}
          height="260px"
          objectFit="cover"
          alt=""

        />
        <Button colorScheme='blue' mt="4" w="180px" onClick={() => handleDetail(book.bookID)}>Borrow</Button>

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



  return (
    <Box bg='#e1dcc5' w='100%' p={4} color='white' >

      <Navbar />

      <Box bg='#e1dcc5' w='75%' p={4} color='white' margin="0 auto">
        <Card>
          <Card>
            <CardBody>
              <Text fontSize="18px" color="#0376b8">Welcome to Open Library</Text>
              <AliceCarousel
                animationType="fadeout"
                animationDuration={800}
                disableButtonsControls
                infinite
                items={labels}
                mouseTracking
                responsive={responsive}

              />
            </CardBody>
            <CardBody>
              <Text fontSize="18px" color="#0376b8">Trending Books</Text>
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
              <Text fontSize="18px" color="#0376b8">Classic Books</Text>
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
              <Text fontSize="18px" color="#0376b8">Books We Love</Text>
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
  )
}

export default index;
