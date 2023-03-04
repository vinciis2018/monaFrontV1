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
} from "@chakra-ui/react";

import { IoSearchCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listScreens } from "../../Actions/screenActions";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { ContactUs, Screen } from "components/common";
import { AtvertiseBox } from "components/common/AtvertiseBox";
import { motion } from "framer-motion";
import { getCampaignList } from "Actions/campaignAction";

export function HomePage() {
  const navigate = useNavigate();
  const MotionFlex = motion(Flex);

  const userSignin = useSelector((state: any) => state.userSignin);
  const {
    loading: loadingUserInfo,
    error: errorUserInfo,
    userInfo,
  } = userSignin;

  const screenList = useSelector((state: any) => state.screenList);
  const { loading: loadingScreens, error: errorScreens, screens } = screenList;

  const campaignListAll = useSelector((state: any) => state.campaignListAll);

  const {
    loading: loadingVideos,
    error: errorVideos,
    allCampaign,
  } = campaignListAll;

  //console.log("allCampaign : ", allCampaign);

  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    // console.log("userInfo : ", userInfo);
    if (!loadingUserInfo && !userInfo && errorUserInfo) {
      navigate("/signin");
    }
    dispatch(getCampaignList());
    dispatch(listScreens({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, userInfo, loadingUserInfo, errorUserInfo]);

  const categorys = [
    {
      image:
        "https://bafybeicnlmmrb2x7efxsaxu6o6xvipaed6wvrmufjbbsqx77csmfvffn6y.ipfs.w3s.link/appartment.png",
      category: "APPARTMENTS",
    },
    {
      image:
        "https://bafybeicduvlghzcrjtuxkro7foazucvuyej25rh3humeujbzt7bmio4hsa.ipfs.w3s.link/raily.png",
      category: "RAILWAYS",
    },
    {
      image:
        "https://bafybeidn5bnz4vlo6h3l3g5eqswwu7ygmktzai2dfdn6vka4xz4xpscpsy.ipfs.w3s.link/indor.png",
      category: "INDOORS",
    },
    {
      image:
        "https://bafybeih3x5kv5zosfm5vpkgk7ixspqsbfhbowiihdql4dhky3ajo65lsga.ipfs.w3s.link/outdore.png",
      category: "OUTDOORS",
    },
  ];

  return (
    <Box color="black.500" align="center" pt={{ base: "3", lg: "5" }}>
      <Center px="10">
        {loadingScreens || loadingVideos ? (
          <HLoading loading={loadingScreens || loadingVideos} />
        ) : errorScreens || errorVideos ? (
          <MessageBox variant="danger">
            {errorScreens || errorVideos}
          </MessageBox>
        ) : (
          <Stack>
            <Box width="100%" fontFamily="sans">
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
              <Stack
                zIndex="1"
                align="center"
                width={{ base: "70%", lg: "50%" }}
              >
                <Text
                  mt={{ base: "-100", lg: "-700", md: "-300" }}
                  pb={{ base: "10", lg: "20" }}
                  fontSize={{ base: "lg", lg: "6xl", md: "5xl" }}
                  fontWeight="extrabold"
                  color="#FFFFFF"
                >
                  Enter the new age of advertising
                </Text>
                <InputGroup
                  size="lg"
                  width="100%"
                  mt={{ base: "1px", lg: "10px" }}
                >
                  <Input
                    type="text"
                    p={{ base: "2", lg: "5" }}
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
              pt={{ base: "5", lg: "10" }}
              pb={{ base: "5", lg: "10" }}
              fontSize={{ base: "lg", lg: "5xl" }}
              fontWeight="bold"
              align="left"
            >
              Categories
            </Text>
            <SimpleGrid
              align="center"
              // mt="10"
              gap="2"
              columns={[2, null, 4]}
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
                  <Text
                    color="#3E3D48"
                    p="5"
                    fontSize={{ base: "sm", lg: "lg" }}
                    fontWeight="600"
                  >
                    {eachCategory.category}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
            <Text
              color="#403F49"
              pt={{ base: "5", lg: "10" }}
              pb={{ base: "5", lg: "10" }}
              fontSize={{ base: "lg", lg: "5xl" }}
              fontWeight="bold"
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
                  <Screen eachScreen={eachScreen} key={eachScreen._id} />
                </MotionFlex>
              ))}
            </SimpleGrid>
            <Flex align="center" justifyContent="center">
              <Button
                width="250px"
                p="3"
                variant="outline"
                borderColor="black"
                color="#D7380E"
                fontSize="xl"
                fontWeight="semibold"
                mt="20"
                as={RouterLink}
                to={`/all-screens`}
              >
                See All
              </Button>
            </Flex>
            <Text
              color="#403F49"
              pt={{ base: "5", lg: "10" }}
              pb={{ base: "5", lg: "10" }}
              fontSize={{ base: "lg", lg: "5xl" }}
              fontWeight="bold"
              align="left"
            >
              Ads playing
            </Text>
            <SimpleGrid columns={[1, 3]} spacing="10">
              {allCampaign &&
                allCampaign
                  ?.slice(allCampaign.length - 3, allCampaign.length)
                  ?.map((campaign: any) => (
                    <AtvertiseBox video={campaign} key={campaign._id} />
                  ))}
            </SimpleGrid>
            <Flex align="center" justifyContent="center">
              <Button
                width="250px"
                p="3"
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
