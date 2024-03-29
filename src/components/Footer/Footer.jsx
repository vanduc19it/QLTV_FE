import {
  Box,
  Container,
  Flex,
  Text,
  Image,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import logoLight from "../../assets/img/logo-light.png";
import logoDark from "../../assets/img/logo-dark.png";

function Footer() {
  const logo = useColorModeValue(logoDark, logoLight);
  return (
    <Box as="footer">
      <Container maxW="full">
        <Flex h="4rem" justify="space-between" align="center">
          <HStack spacing="7px">
            <Image
              width="2.4rem"
              height="2.4rem"
              objectFit="contain"
              src={logo}
              alt="Manticore"
            />
            <Text letterSpacing="0.2px" fontSize="md" textTransform="uppercase" fontWeight="600">
              Quản Lý Thư Viện
            </Text>
          </HStack>
          <Text color="textThird" fontSize="sm">
            © by Cap Van Duc - 2023
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

export default Footer;
