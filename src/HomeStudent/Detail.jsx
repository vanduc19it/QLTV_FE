import React from 'react'
import Navbar from './Navbar.jsx'
import { Box, Button, Card, FormControl, FormLabel, Grid, GridItem, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import AliceCarousel from 'react-alice-carousel'
import logo1 from "../assets/books/1.jpg";
import logo2 from "../assets/books/2.jpg";
import logo3 from "../assets/books/3.jpg";
import logo4 from "../assets/books/4.jpg";
import logo5 from "../assets/books/5.jpg";

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
                  <Button colorScheme='blue'mt="4" w="180px" >Borrow</Button>

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
<div  key={1} className="item" data-value="1">
  <Image
                  src={logo4}
                  height="260px"
                  objectFit="cover"
                  alt=""
                />
<Button colorScheme='blue'mt="4" w="180px" >Borrow</Button>
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


  return (
   <>
   <Box bg='#e1dcc5' w='100%' hp={4} color='white'>
      <Navbar/>
      <Box width="75%" margin="10px auto">
      <Card >
          <Grid
      h='200px'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={2}
      padding="20px 20px"
    >
      <Card maxW='sm'>
      <GridItem rowSpan={2} colSpan={1}  padding="20px 20px">
      <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
      <Button colorScheme='telegram' w="100%" onClick={onOpen}>Telegram</Button>
      </GridItem>
     
      </Card>
    
      <GridItem colSpan={4} rowSpan={10} bg='papayawhip' >
          <Text fontSize='3xl'>(6xl) In love with React & Next</Text>
      <Text fontSize='1xl'>(5xl) In love with React & Next</Text>
      <Text fontSize='3xl'>(5xl) In love with React & Next</Text>
      <Text fontSize='2xl'>(5xl) In love with React & Next</Text>

      </GridItem>
      
    </Grid>

    <Grid
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(5, 1fr)'
      gap={2}padding="20px 20px"
    >
     
      
      <GridItem colSpan={10} rowSpan={10} bg='tomato' mt="60px">
      <Text fontSize='3xl'>(6xl) In love with React & Next</Text>
      <AliceCarousel
              animationType="fadeout" 
              animationDuration={800}
              disableButtonsControls
              infinite
              items={items}
              mouseTracking
              responsive={responsive}
          />
         <Text fontSize='3xl'>(6xl) In love with React & Next</Text>
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
      </Box>
     
   </Box>
 {/* borrow modal */}
   <Modal
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
    </Modal>
   </>
  )
}

export default Detail
