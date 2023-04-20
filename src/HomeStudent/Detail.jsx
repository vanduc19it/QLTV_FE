import React from 'react'
import Navbar from './Navbar.jsx'
import { Box, Button, Card, FormControl, FormLabel, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import AliceCarousel from 'react-alice-carousel'
import logo1 from "../assets/books/1.jpg";
import logo2 from "../assets/books/2.jpg";
import logo3 from "../assets/books/3.jpg";
import logo4 from "../assets/books/4.jpg";
import logo5 from "../assets/books/5.jpg";
import { useParams } from 'react-router-dom';


function Detail() {

  const items = [
    <div key={1} className="item" data-value="1" >
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>

    </div>,
    <div key={1} className="item" data-value="1">
      <Image
        src={logo2}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px" >Borrow</Button>

    </div>,
    <div key={1} className="item" data-value="1">
      <Image
        src={logo3}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>
    </div>,
    <div key={1} className="item" data-value="1">
      <Image
        src={logo4}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px" >Borrow</Button>
    </div>,
    <div key={1} className="item" data-value="1" display="flex">
      <Image
        src={logo5}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>
    </div>,
    <div key={1} className="item" data-value="1">
      <Image
        src={logo1}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme="blue" mt="4" w="180px" >Borrow</Button>
    </div>,
    <div key={1} className="item" data-value="1">
      <Image
        src={logo2}
        height="260px"
        objectFit="cover"
        alt=""
      />
      <Button colorScheme='blue' mt="4" w="180px">Borrow</Button>
    </div>,

  ]
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };


  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  const { bookID } = useParams();
  console.log(bookID)

  return (
    <>
      <Box bg='#e1dcc5' w='100%' hp={4} color='white'>
        <Navbar />
        <Box width="75%" margin="20px auto">
          <Card >
            <Card>
              <Grid

                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={2}
                padding="20px 20px"
              >
                <Card maxW='sm' style={{ height: "100%" }}>
                  <GridItem rowSpan={2} colSpan={1} padding="20px 20px" >
                    <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                    <Button colorScheme='telegram' w="100%" onClick={onOpen} style={{ marginTop: "20px" }}>Borrow</Button>
                  </GridItem>

                </Card>

                <GridItem colSpan={4} rowSpan={10}  >
                  <Text fontSize='3xl'>A Court of Mist and Fury</Text>
                  <Text fontSize='1xl'>by Sarah J. Maas</Text>
                  <Text fontSize='1xl'>★★★ ★ 3.87 · 127 Ratings  2268 Want to read 143 Currently reading 126 Have read</Text>
                  <Text fontSize='2xl'>Overview</Text>
                  <Text fontSize='1xl'>Feyre has undergone more trials than one human woman can carry in her heart.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.Feyre has undergone more trials than one human woman can carry in her heart. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people. Though she's now been granted the powers and lifespan of the High Fae, she is haunted by her time Under the Mountain and the terrible deeds she performed to save the lives of Tamlin and his people.</Text>
                </GridItem>

              </Grid>
            </Card>
            <hr />
            <Card>
              <Grid
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={2} padding="20px 20px"
              >


                <GridItem colSpan={10} rowSpan={10} mt="20px">
                  <Text fontSize='3xl'>You might also like</Text>
                  <AliceCarousel
                    animationType="fadeout"
                    animationDuration={800}
                    disableButtonsControls
                    infinite
                    items={items}
                    mouseTracking
                    responsive={responsive}
                  />
                  <Text fontSize='3xl'>You might also like</Text>
                  <AliceCarousel
                    animationType="fadeout"
                    animationDuration={800}
                    disableButtonsControls
                    infinite
                    items={items}
                    mouseTracking
                    responsive={responsive}
                  />
                </GridItem>
              </Grid>
            </Card>


          </Card>
        </Box >

      </Box >
      {/* borrow modal */}
      <Modal Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Last name</FormLabel>
              <Input placeholder='Last name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  )
}

export default Detail
