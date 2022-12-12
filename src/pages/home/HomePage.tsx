import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  IconButton,
  Image,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";

import { IoSearchCircleSharp } from "react-icons/io5";
import { AiOutlinePlus, AiFillStar } from "react-icons/ai";
import { BsDot } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { GrDown } from "react-icons/gr";
//image
import homeScreen from "../../assets/image/homescreen.png";
import railway from "../../assets/image/raily.png";
import indor from "../../assets/image/indor.png";
import outdor from "../../assets/image/outdore.png";
import appartment from "../../assets/image/appartment.png";
import screen1 from "../../assets/image/screen1.png";
import tesla from "../../assets/image/tesla.png";
import addidas from "../../assets/image/addidas.png";
import macdonal from "../../assets/image/macdonal.png";
import rectangle from "../../assets/image/Rectangle86.png";
import girl2 from "../../assets/image/girl2.png";

export function HomePage() {
  const categorys = [
    {
      image: appartment,
      category: "APPARTMENTS",
    },
    {
      image: railway,
      category: "RAILWAY PLATFORMS",
    },
    {
      image: indor,
      category: "INDOOR",
    },
    {
      image: outdor,
      category: "OUTDOORS",
    },
  ];
  const popularScreen = [
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
    {
      name: "New Demo Screen Admin Platform 6",
      image: screen1,
      rating: "4.5",
      screenAddress: "Lanka, Varanasi, India",
      availableSlots: "2120",
      rentPerSlot: "200",
      scWorth: "250",
      discountInPer: "50",
    },
  ];

  const topScreen = [
    {
      image: addidas,
      location: "Lanka, Varanasi, India",
    },
    {
      image: tesla,
      location: "Lanka, Varanasi, India",
    },
    {
      image: macdonal,
      location: "Lanka, Varanasi, India",
    },
  ];

  return (
    <Box px="2" pt="0" p="10" color="black.500" align="center">
      <Box
        backgroundImage={homeScreen}
        display="inline-block"
        backgroundRepeat="no-repeat"
        // backgroundAttachment="fixed"
        backgroundSize="100%"
        borderRadius="24px"
        width="90%"
        height="700px"
        fontFamily="Sans"
        mt="5"
      >
        <Box align="center" p="20">
          <Text fontSize="64px" color="#FFFFFF" width="760px">
            Enter the new age of advertising
          </Text>
          <InputGroup size="lg" width="70%" mt="20">
            <Input
              pr="4.5rem"
              type="text"
              p="9"
              heigth=""
              bgColor="#FCFCFC"
              borderRadius="70px"
              fontSize="20px"
              placeholder="Search by place, by location, by screen names"
            />
            <InputRightElement width="4.5rem" pt="5">
              <IconButton
                bg="none"
                icon={<IoSearchCircleSharp size="59px" color="#D7380E" />}
                aria-label="Edit user details"
              ></IconButton>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
      <Text
        color="#403F49"
        mt="10"
        fontSize="48px"
        fontWeight="700"
        align="left"
        width="90%"
      >
        Categories
      </Text>
      <Flex
        align="center"
        direction="row"
        justifyContent="space-between"
        mt="10"
        width="90%"
      >
        {categorys.map((eachCategory, index) => (
          <Box
            width="307px"
            height="200px"
            bgColor="#F6F5F5"
            borderRadius="12px"
          >
            <Image src={eachCategory.image} alt=""></Image>
            <Text color="#3E3D48" p="5" fontSixe="24px" fontWeight="600">
              {eachCategory.category}
            </Text>
          </Box>
        ))}
      </Flex>
      <Text
        color="#403F49"
        mt="10"
        fontSize="48px"
        fontWeight="700"
        align="left"
        width="90%"
      >
        Popular screens
      </Text>
      <Flex width="90%" justifyContent="space-between" mt="5">
        <SimpleGrid columns={[2, null, 3]} spacing="20">
          {popularScreen.map((eachScreen, index) => (
            <Box
              bgColor="#F7F7F7"
              borderColor="#DFDFDF"
              border="1.5px"
              width="418px"
              height="446px"
              borderRadius="16px"
            >
              {/* image */}
              <Box p="5">
                <Image src={screen1} alt=""></Image>
              </Box>
              {/* details of screem */}
              <Box p="0">
                <Flex ml="4">
                  <Text
                    color="#403F49"
                    fontSize="24px"
                    fontWeight="bold"
                    align="left"
                  >
                    New Demo Screen Admin Platform 6
                  </Text>
                  <IconButton
                    bg="none"
                    mt="5"
                    mr="5"
                    icon={<AiOutlinePlus size="59px" color="#403F49" />}
                    aria-label="Edit user details"
                  ></IconButton>
                </Flex>
                <Flex align="center" ml="2">
                  <IconButton
                    bg="none"
                    icon={<AiFillStar size="16px" color="#403F49" />}
                    aria-label="Star"
                  ></IconButton>
                  <Text
                    pl="2"
                    color="#403F49"
                    fontSize="16px"
                    fontWeight="semibold"
                    align="left"
                  >
                    4.5
                  </Text>
                  <IconButton
                    bg="none"
                    icon={<BsDot size="16px" color="#403F49" />}
                    aria-label="Star"
                  ></IconButton>
                  <Text
                    color="#666666"
                    fontSize="16px"
                    fontWeight="semibold"
                    align="left"
                  >
                    Lanka, Varanasi, India
                  </Text>
                </Flex>
                <Text
                  ml="4"
                  color="#403F49"
                  fontSize="16px"
                  fontWeight="semibold"
                  align="left"
                >
                  2120 slots available
                </Text>
                <Flex align="center" ml="2">
                  <IconButton
                    bg="none"
                    icon={<BiRupee size="16px" color="#403F49" />}
                    aria-label="Star"
                  ></IconButton>
                  <Text
                    pl="-5"
                    color="#403F49"
                    fontSize="20px"
                    fontWeight="semibold"
                    align="left"
                  >
                    200 per slot
                  </Text>
                  <IconButton
                    bg="none"
                    icon={<BiRupee size="16px" color="#403F49" />}
                    aria-label="Star"
                  ></IconButton>
                  <Text
                    as="s"
                    color="#787878"
                    fontSize="16px"
                    fontWeight="semibold"
                    align="left"
                  >
                    250 per slot
                  </Text>
                  <Text
                    pl="1"
                    color="#F86E6E"
                    fontSize="20px"
                    fontWeight="semibold"
                    align="left"
                  >
                    ( 50% OFF)
                  </Text>
                </Flex>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
      <Flex align="center" justifyContent="center" mt="10" width="90%">
        <Button
          width="250px"
          p="7"
          variant="outline"
          borderColor="black"
          color="#D7380E"
          fontSize="24px"
          fontWeight="semibold"
        >
          See All
        </Button>
      </Flex>
      <Text
        color="#403F49"
        mt="10"
        fontSize="48px"
        fontWeight="bold"
        align="left"
        width="90%"
      >
        Screens playing
      </Text>
      <Flex justifyContent="space-between" width="90%" mt="10">
        {topScreen.map((screen, index) => (
          <Box
            width="417px"
            height="334px"
            bgColor="#F6F5F5"
            borderRadius="12px"
          >
            <Image src={screen.image} alt="" p="5"></Image>
            <Text
              color="#403F49"
              pl="5"
              fontSixe="24px"
              fontWeight="bold"
              align="left"
            >
              Brand name
            </Text>
            <Text
              color="#666666"
              pl="5"
              fontSixe="16px"
              fontWeight="semibold"
              align="left"
              mt="2"
            >
              Location : {screen.location}
            </Text>
          </Box>
        ))}
      </Flex>
      <Flex align="center" justifyContent="center" mt="10" width="90%">
        <Button
          width="250px"
          p="7"
          variant="outline"
          borderColor="black"
          color="#D7380E"
          fontSize="24px"
          fontWeight="semibold"
        >
          See All
        </Button>
      </Flex>
      <Box
        backgroundImage={rectangle}
        // display="inline-block"
        backgroundRepeat="no-repeat"
        // backgroundAttachment="fixed"
        backgroundSize="100%"
        borderRadius="67px"
        width="90%"
        height="521px"
        fontFamily="Sans"
        ml="50"
        mt="10"
      >
        <Flex width="90%">
          <Box
            width="702px"
            height="204px"
            color="#EBEBEB"
            align="left"
            p="20"
            left="180px"
          >
            <Text
              fontSize="40px"
              fontWeight="bold"
              align="left"
              mt="2"
              width="780px"
            >
              Need help or want to know how it works?
            </Text>
            <Text
              fontSize="40px"
              fontWeight="bold"
              align="left"
              mt="2"
              width="702px"
            >
              Our industry expersts are here to help you.
            </Text>
            <Button
              mt="10"
              width="251px"
              height="54px"
              bgColor="#D7380E"
              color="#FFFFFF"
              fontSize="24px"
              fontWeight="semibold"
              p="5"
            >
              {" "}
              Contact us
            </Button>
          </Box>
          <Box>
            <Image
              src={girl2}
              alt=""
              p=""
              height="540px"
              width="580px"
              mt="-50"
              ml="20"
            ></Image>
          </Box>
        </Flex>
      </Box>
      <Divider mt="10" width="90%" />
      <Flex align="center" justifyContent="space-between" width="90%">
        <Text color="#403F49" fontSize="48px" fontWeight="700" align="left">
          All destinations
        </Text>
        <IconButton
          bg="none"
          mr="10"
          icon={<GrDown color="#9A9A9A" height="14px" width="27px" />}
          aria-label="Star"
        ></IconButton>
      </Flex>
      <Divider mt="2" width="90%" />
    </Box>
  );
}
