import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Center,
  Stack,
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
import { GrDown } from "react-icons/gr";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { listScreens } from "../../Actions/screenActions";
import { listAllVideos } from "../../Actions/advertActions";
// import { triggerPort } from "services/utils";

// import { TopNftsContent } from "components/widgets";
// import { TimeFilter } from "components/filters";

import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
//image
// import homeScreen from "../../assets/image/homescreen.png";
import railway from "../../assets/image/raily.png";
import indor from "../../assets/image/indor.png";
import outdor from "../../assets/image/outdore.png";
import appartment from "../../assets/image/appartment.png";
// import rectangle from "../../assets/image/Rectangle86.png";
import girl2 from "../../assets/image/girl2.png";
import { Screen } from "components/common";
import { AtvertiseBox } from "components/common/AtvertiseBox";
import { motion } from "framer-motion";

export function HomePage() {
  const navigate = useNavigate();
  const MotionFlex = motion(Flex);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);

  const {
    loading: loadingVideos,
    error: errorVideos,
    allVideos,
  } = videoListAll;
  let topThreeVideos = [];
  if (allVideos !== undefined) {
    topThreeVideos = allVideos.slice(allVideos.length - 3, allVideos.length);
  }

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    dispatch(listScreens({}));
    dispatch(listAllVideos());
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
      // border="1px solid black"
    >
      <Center px="10">
        {loadingScreens || loadingVideos ? (
          <HLoading loading={loadingScreens || loadingVideos} />
        ) : errorScreens || errorVideos ? (
          <MessageBox variant="danger">
            {errorScreens || errorVideos}
          </MessageBox>
        ) : (
          <Stack>
            <Box width="100%">
              <Box
                as="video"
                src="https://bafybeid57yuz6xuqdniw744q62r2nmh4r3doz7i736ujh3xonjvulqkra4.ipfs.w3s.link/pexels-henry-5538832.mp4"
                autoPlay
                loop
                muted
                display="inline-block"
                borderRadius="24px"
                height={{ base: "100%", lg: "50%" }}
              ></Box>
              <Stack zIndex="1" align="center">
                <Text
                  mt={{ base: "-300", lg: "-500" }}
                  pb={{ base: "10", lg: "20" }}
                  fontSize={{ base: "4xl", lg: "80px" }}
                  fontWeight="1000"
                  color="#FFFFFF"
                >
                  Enter the new age of advertising
                </Text>
                <InputGroup size="lg" width="70%" mt="20">
                  <Input
                    type="text"
                    p="5"
                    heigth=""
                    bgColor="#FCFCFC"
                    borderRadius="80px"
                    fontSize="lg"
                    placeholder="Search by place, by location, by screen names"
                  />
                  <InputRightElement width="4.5rem" pr="1" pt="2.5">
                    <IconButton
                      bg="none"
                      icon={<IoSearchCircleSharp size="50px" color="#D7380E" />}
                      aria-label="Edit user details"
                    />
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </Box>
            <Text
              color="#403F49"
              pt="5"
              pb="5"
              fontSize="4xl"
              fontWeight="700"
              align="left"
            >
              Categories
            </Text>
            <SimpleGrid
              align="center"
              // mt="10"
              gap="2"
              columns={[4]}
            >
              {categorys.map((eachCategory, index) => (
                <Box
                  // width="23%"
                  // height="200px"
                  bgColor="#F6F5F5"
                  borderRadius="lg"
                  boxShadow="2xl"
                  key={index + 1}
                >
                  <Image
                    width="100%"
                    src={eachCategory.image}
                    alt={`${eachCategory.category}`}
                  />
                  <Text color="#3E3D48" p="5" fontSize="lg" fontWeight="600">
                    {eachCategory.category}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
            <Text
              color="#403F49"
              pt="10"
              pb="10"
              fontSize="4xl"
              fontWeight="700"
              align="left"
            >
              Popular screens
            </Text>
            <SimpleGrid columns={[1, 2, 3]} spacing="4">
              {screens.map((eachScreen: any) => (
                <MotionFlex
                  key={eachScreen._id}
                  flexDir="column"
                  w="100%"
                  role="group"
                  rounded="md"
                  // shadow="card"
                  whileHover={{
                    translateY: -3,
                  }}
                  pos="relative"
                  zIndex="0"
                >
                  <Screen eachScreen={eachScreen} />
                </MotionFlex>
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
                as={RouterLink}
                to={`/all-screens`}
              >
                See All
              </Button>
            </Flex>
            <Text
              color="#403F49"
              mt="10"
              fontSize="4xl"
              fontWeight="bold"
              align="left"
            >
              Ads playing
            </Text>
            <SimpleGrid columns={[1, 3]} spacing="10">
              {topThreeVideos &&
                topThreeVideos.map((eachVideo: any) => (
                  <AtvertiseBox video={eachVideo} key={eachVideo._id} />
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
              >
                See All
              </Button>
            </Flex>
          </Stack>
        )}
      </Center>
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
            <Text color="#403F49" fontSize="xl" fontWeight="700" align="left">
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
    </Box>
  );
}
