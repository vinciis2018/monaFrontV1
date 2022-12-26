import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Center,
  Stack,
  Text,
  Button,
  IconButton,
  Image,
  SimpleGrid,
  Divider,
  InputLeftElement,
  InputGroup,
  Input,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";

import { GrDown } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { listScreens } from "../../Actions/screenActions";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { Screen } from "components/common";
import { IoSearchOutline } from "react-icons/io5";
import { FiMap } from "react-icons/fi";
import { BsSliders } from "react-icons/bs";
import { MyMap } from "pages/MyMap";
import { getPinJson } from "Actions/pinActions";
//image
import railway from "../../assets/image/raily.png";
import indor from "../../assets/image/indor.png";
import outdor from "../../assets/image/outdore.png";
// import rectangle from "../../assets/image/Rectangle86.png";
import appartment from "../../assets/image/appartment.png";
import girl2 from "../../assets/image/girl2.png";

export function AllScreens() {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState<any>("1");

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const jsonPins = useSelector((state: any) => state.jsonPins);
  const { loading: loadingAllPins, error: errorAllPins, jsonData } = jsonPins;

  const dispatch = useDispatch<any>();

  const loadMore = () => {
    setPageNumber(Number(pageNumber) + 1);
    dispatch(listScreens({ pageNumber }));
  };
  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      console.log("go to welcome page");
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(listScreens({ pageNumber }));
    dispatch(getPinJson());
  }, [dispatch, navigate, userInfo]);

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

  return (
    <Box
      color="black.500"
      align="center"
      bgGradient={["linear-gradient(to right, #FFFDE9, #FFFFFF)"]}
      py="20"
    >
      {loadingScreens ? (
        <HLoading loading={loadingScreens} />
      ) : errorScreens ? (
        <MessageBox variant="danger">{errorScreens}</MessageBox>
      ) : (
        <Stack>
          <Center px="20" mb="10">
            <Stack>
              <Stack py="5" align="center">
                <InputGroup size="lg" width="40%">
                  <InputLeftElement
                    p="3"
                    pointerEvents="none"
                    children={<IoSearchOutline color="#3E3D48" />}
                  />
                  <Input
                    placeholder="Loaction"
                    size="lg"
                    borderRadius="25px"
                    borderColor="#3F3E49"
                    fontSize="lg"
                    py="2"
                  />
                </InputGroup>
              </Stack>
              <Stack fontSize="3xl" fontWeight="bold" direction="row" pt="">
                <Text color="#403F49">Popular screens in </Text>
                <Text color="#2BB3E0"> Delhi</Text>
              </Stack>

              <Stack pt="5" direction="row" justifyContent="space-between">
                <Stack direction="row" justifyContent="space-between">
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLabel fontSize="lg">Indoor</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLabel fontSize="lg">Railway Station</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLabel fontSize="lg">Highway</TagLabel>
                  </Tag>
                  <Tag
                    p="3"
                    size="lg"
                    fontSize="xl"
                    variant="outline"
                    color="#3E3D48"
                    borderRadius="full"
                  >
                    <TagLeftIcon as={BsSliders} />
                    <TagLabel fontSize="lg">Filter</TagLabel>
                  </Tag>
                </Stack>
                <Tag
                  p="3"
                  size="lg"
                  fontSize="xl"
                  variant="outline"
                  color="#3E3D48"
                  borderRadius="full"
                >
                  <TagLeftIcon as={FiMap} />
                  <TagLabel fontSize="lg">Map View</TagLabel>
                </Tag>
              </Stack>

              <SimpleGrid columns={[1, 2, 3]} spacing="4">
                {screens.map((eachScreen: any) => (
                  <Screen eachScreen={eachScreen} />
                ))}
              </SimpleGrid>

              <Flex align="center" justifyContent="center">
                <Button
                  width="250px"
                  p="7"
                  variant="outline"
                  borderColor="black"
                  color="#D7380E"
                  fontSize="xl"
                  fontWeight="semibold"
                  mt="20"
                  mb="20"
                  onClick={loadMore}
                >
                  See All
                </Button>
              </Flex>
            </Stack>
          </Center>

          <Box zIndex="1" width="100%" height="550px" color="black.500" pb="10">
            {loadingAllPins ? (
              <HLoading loading={loadingAllPins} />
            ) : errorAllPins ? (
              <MessageBox variant="danger">{errorAllPins}</MessageBox>
            ) : (
              <MyMap data={jsonData} />
            )}
          </Box>
          <Center px="10" mb="10">
            <Stack width="100%">
              <Box
                backgroundColor="#2BB3E0"
                display="inline-block"
                backgroundRepeat="no-repeat"
                // backgroundAttachment="fixed"
                backgroundSize="100%"
                borderRadius="67px"
                pb="10"
              >
                <Flex align="center" justify="space-between">
                  <Box width="60%" color="#EBEBEB" align="left" pt="20" pl="10">
                    <Text fontSize="4xl" fontWeight="bold" align="left" pl="10">
                      Need help or want to know how it works?
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" align="left" pl="10">
                      Our industry expersts are here to help you.
                    </Text>
                    <Button
                      bgColor="#D7380E"
                      color="#FFFFFF"
                      fontSize="xl"
                      fontWeight="semibold"
                      px="20"
                      py="7"
                      ml="10"
                      mt="5"
                    >
                      {" "}
                      Contact us
                    </Button>
                  </Box>
                  <Box py="3">
                    <Image src={girl2} alt="" p="" height="100%" width="" />
                  </Box>
                </Flex>
              </Box>

              <Divider pt="10" />
              <Flex align="center" justifyContent="space-between">
                <Text
                  color="#403F49"
                  fontSize="xl"
                  fontWeight="700"
                  align="left"
                >
                  All destinations
                </Text>
                <IconButton
                  bg="none"
                  mr="10"
                  icon={<GrDown color="#9A9A9A" height="14px" width="27px" />}
                  aria-label="Star"
                ></IconButton>
              </Flex>
              <Divider pb="" />
            </Stack>
          </Center>
        </Stack>
      )}
    </Box>
  );
}
