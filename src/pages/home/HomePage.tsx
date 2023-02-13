import React, { useState } from "react";
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
} from "@chakra-ui/react";

import { IoSearchCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listScreens } from "../../Actions/screenActions";
import { listAllVideos } from "../../Actions/advertActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { ContactUs, Screen } from "components/common";
import { AtvertiseBox } from "components/common/AtvertiseBox";
import { motion } from "framer-motion";

export function HomePage() {
  const navigate = useNavigate();
  const MotionFlex = motion(Flex);
  const [topThreeVideos, setTopThreevideo] = useState<any>([]);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const videoListAll = useSelector((state: any) => state.videoListAll);
  //console.log("topThreeVideo : ", JSON.stringify(topThreeVideos[0]));

  const {
    loading: loadingVideos,
    error: errorVideos,
    allVideos,
  } = videoListAll;
  //console.log("allVideos : ", allVideos);

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    if (allVideos) {
      const topThreeVideos = allVideos.slice(
        allVideos.length - 3,
        allVideos.length
      );
      //console.log("sdsd", topThreeVideos);
      setTopThreevideo(topThreeVideos);
    }
    dispatch(listAllVideos());
    dispatch(listScreens({}));
  }, [dispatch, navigate, userInfo]);

  const categorys = [
    {
      image:
        "https://bafybeicnlmmrb2x7efxsaxu6o6xvipaed6wvrmufjbbsqx77csmfvffn6y.ipfs.w3s.link/appartment.png",
      category: "APPARTMENTS",
    },
    {
      image:
        "https://bafybeicduvlghzcrjtuxkro7foazucvuyej25rh3humeujbzt7bmio4hsa.ipfs.w3s.link/raily.png",
      category: "RAILWAY PLATFORMS",
    },
    {
      image:
        "https://bafybeidn5bnz4vlo6h3l3g5eqswwu7ygmktzai2dfdn6vka4xz4xpscpsy.ipfs.w3s.link/indor.png",
      category: "INDOOR",
    },
    {
      image:
        "https://bafybeih3x5kv5zosfm5vpkgk7ixspqsbfhbowiihdql4dhky3ajo65lsga.ipfs.w3s.link/outdore.png",
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
                as={RouterLink}
                to={`/allads`}
              >
                See All
              </Button>
            </Flex>
          </Stack>
        )}
      </Center>
      <ContactUs />
    </Box>
  );
}
