import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Text,
  Button,
  Image,
  Divider,
  SimpleGrid,
  Progress,
  Textarea,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import HLoading from "components/atoms/HLoading";
// import MessageBox from "components/atoms/MessageBox";
import rectangle from "../../assets/image/Rectangle86.png";
import girl2 from "../../assets/image/girl2.png";
import Axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { BsCheck2Circle, BsDot } from "react-icons/bs";
import { BiRupee } from "react-icons/bi";
import { AtvertiseBox } from "components/common/AtvertiseBox";
import { MyMap } from "pages/MyMap";
import { GiRoundStar } from "react-icons/gi";
import { Review } from "components/common";

export function ScreenDetail(props: any) {
  const navigate = useNavigate();
  const screenID = "639477332665b32d11313e4a";
  const [screen, setScreen] = useState<any>(null);
  const [screenLoading, setScreenLoading] = useState<any>(true);
  const [screenError, setScreenError] = useState<any>(null);
  const [pinLoading, setPinLoading] = useState<any>(true);
  const [pinError, setPinError] = useState<any>(null);
  const [jsonData, setJsonData] = useState<any>(null);
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  const [countEachRating, setCountEachRating] = useState<any>({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  });
  const userSignin = useSelector((state: any) => state.userSignin);
  console.log("screen : ", JSON.stringify(screen));
  console.log("pin : ", jsonData);
  console.log("video : ", videosList);
  console.log("getPinDetails : ", pinError);
  console.log("getVideoList : ", videosListError);
  console.log("getScreentDetail : ", screenError);

  const { userInfo } = userSignin;
  if (!screenLoading && screen) {
    screen.reviews.forEach((review: any) => {
      if (review.rating === 5) {
        countEachRating["5"] += 1;
      } else if (review.rating === 4) {
        countEachRating["4"] += 1;
      } else if (review.rating === 3) {
        countEachRating["3"] += 1;
      } else if (review.rating === 2) {
        countEachRating["2"] += 1;
      } else {
        countEachRating["1"] += 1;
      }
    });
  }

  const getPinDetails = async (pinID: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/pins/${pinID}`
      );
      console.log(" jsonData : ", data);

      setJsonData(data);
      setPinLoading(false);
    } catch (error: any) {
      setPinError(
        error.response && error.response.data.message
          ? error.response.data.messages
          : error.message
      );
    }
  };
  const getVideoList = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/screenVideos`
      );
      console.log("getVideoList  : ", data);
      setVideosList(data);
      setVideoLoading(false);
    } catch (error: any) {
      setVideosListError(
        error.response && error.response.data.message
          ? error.response.data.messages
          : error.message
      );
    }
  };

  const getScreentDetail = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      setScreen(data);
      setScreenLoading(false);
      getPinDetails(data.locationPin);
      getVideoList(data._id);
    } catch (error: any) {
      setScreenError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    // const screenID = window.location.pathname.split("/")[2];
    getScreentDetail(screenID);
  }, [navigate, userInfo]);

  return (
    <Box>
      {screenLoading || videoLoading || pinLoading ? (
        <HLoading loading={screenLoading || videoLoading || pinLoading} />
      ) : (
        <Stack>
          <Flex height="804px">
            <Image src={screen.image} width="50%"></Image>
            <Stack p="20" align="left">
              <Text
                fontSize="4xl"
                fontWeight="bold"
                color="#403F49"
                align="left"
              >
                {screen.name}
              </Text>
              <Flex align="center" ml="-3" mt="2" fontSize="lg">
                <AiFillStar size="28px" color="#403F49" />
                <Text
                  pl="1"
                  color="#403F49"
                  fontWeight="semibold"
                  align="left"
                  mr="5"
                >
                  {screen.ratting || 4.5}
                </Text>
                <BsDot size="16px" color="#403F49" />
                <Text color="#666666" fontWeight="semibold" align="left">
                  {`${screen.screenAddress} ${screen.districtCity} ${screen.country}`}
                </Text>
              </Flex>
              <Divider pt="5" />
              <Text
                pl="1"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                fontSize="lg"
                mr="5"
              >
                16:01
              </Text>
              <Flex align="center" pt="2">
                <BiRupee size="26px" color="#403F49" />
                <Text
                  color="#403F49"
                  fontSize="xl"
                  fontWeight="semibold"
                  align="left"
                >
                  {`${screen.rentPerSlot} per slot`}
                </Text>
                <Text
                  as="s"
                  color="#787878"
                  fontSize="sm"
                  fontWeight="semibold"
                  align="left"
                  pl="2"
                >
                  ₹250 per slot
                </Text>
                <Text
                  pl="1"
                  color="#F86E6E"
                  fontSize="lg"
                  fontWeight="semibold"
                  align="left"
                >
                  ( 50% OFF)
                </Text>
              </Flex>
              <SimpleGrid gap="4" columns={[3, 2]} pt="5">
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    Today
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    Tomorrow
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    12 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    13 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    14 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
                <Box
                  color="#403F49"
                  border="1px"
                  align="center"
                  p="1"
                  width="197px"
                >
                  <Text fontSize="2xl" fontWeight="semibold">
                    15 Dec
                  </Text>
                  <Text fontSize="sm" mt="2">
                    2025 slots available
                  </Text>
                </Box>
              </SimpleGrid>
              <Text color="#403F49" fontSize="sm" align="left" pt="5">
                See more dates
              </Text>
              <Button
                width="196px"
                height="54px"
                color="#FFFFFF"
                bgColor="#D7380E"
                fontWeight="semibold"
                fontSize="xl"
              >
                Add to cart
              </Button>
            </Stack>
          </Flex>

          <Stack p="20">
            <Text
              color="#403F49"
              fontSize="3xl"
              align="center"
              fontWeight="semibold"
            >
              Location highlights
            </Text>
            <Stack align="center">
              <SimpleGrid gap="10" columns={[2, 2]} pt="5">
                <Flex align="center">
                  <BsCheck2Circle size="16px" color="black" />
                  <Text fontSize="sm" color="#787878" pl="3">
                    jahndsbfjbsajhchbsdjhcbhjhsbcjcxsCsdcscvsxc
                  </Text>
                </Flex>
                <Flex align="center">
                  <BsCheck2Circle size="16px" color="black" />
                  <Text fontSize="sm" color="#787878" pl="3">
                    jahndsbfjbsajhchbsdjhcbhjhsbcjcxsCsdcscvsxc
                  </Text>
                </Flex>
                <Flex align="center">
                  <BsCheck2Circle size="16px" color="black" />
                  <Text fontSize="sm" color="#787878" pl="3">
                    jahndsbfjbsajhchbsdjhcbhjhsbcjcxsCsdcscvsxc
                  </Text>
                </Flex>
                <Flex align="center">
                  <BsCheck2Circle size="16px" color="black" />
                  <Text fontSize="sm" color="#787878" pl="3">
                    jahndsbfjbsajhchbsdjhcbhjhsbcjcxsCsdcscvsxc
                  </Text>
                </Flex>
              </SimpleGrid>
            </Stack>
            <Stack align="left">
              <Text
                color="#403F49"
                fontSize="4xl"
                align="left"
                fontWeight="semibold"
                pt="20"
              >
                Brands playing on this screens
              </Text>
              <SimpleGrid columns={[1, null, 3]} spacing="10" pt="5">
                {videosList &&
                  videosList
                    .slice(0, 3)
                    .map((video: any) => (
                      <AtvertiseBox video={video} key={video._id} />
                    ))}
              </SimpleGrid>
            </Stack>
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
          <Box width="100%" height="551px" color="black.500" pb="10">
            <MyMap data={jsonData} geometry={jsonData.features[0].geometry} />
          </Box>
          <Stack p="20">
            <Stack>
              <Text
                fontSize="4xl"
                color="#403F49"
                fontWeight="bold"
                align="left"
              >
                Review
              </Text>
              <Box width="25%" bgColor="#F0F4FC" borderRadius="16px">
                <Flex>
                  <Stack p="10" width="60%">
                    <Flex align="center">
                      <Text fontSize="4xl" color="#403F49" fontWeight="bold">
                        {screen.rating}/
                      </Text>
                      <Text fontSize="lg" color="#403F49" fontWeight="bold">
                        5
                      </Text>
                    </Flex>
                    <Text
                      fontSize="sm"
                      color="#403F49"
                      fontWeight="semibold"
                      align="left"
                    >
                      {`Based on ${screen.numReviews} reviews`}
                    </Text>
                    <Flex>
                      <GiRoundStar size="20px" color="#0EBCF5" />
                      <GiRoundStar size="20px" color="#0EBCF5" />
                      <GiRoundStar size="20px" color="#0EBCF5" />
                      <GiRoundStar size="20px" color="#0EBCF5" />
                      <GiRoundStar size="20px" color="#E2E2E2" />
                    </Flex>
                  </Stack>
                  <Stack pt="5" width="30%">
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        5
                      </Text>
                      <Progress
                        value={(100 * countEachRating["5"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        4
                      </Text>
                      <Progress
                        value={(100 * countEachRating["4"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        3
                      </Text>
                      <Progress
                        value={(100 * countEachRating["3"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        2
                      </Text>
                      <Progress
                        value={(100 * countEachRating["2"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        colorScheme="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color="#403F49" pr="3">
                        1
                      </Text>
                      <Progress
                        value={(100 * countEachRating["1"]) / screen.numReviews}
                        width="100%"
                        size="sm"
                        color="#0EBCF5"
                        bgColor="#90F8FF"
                      />
                    </Flex>
                  </Stack>
                </Flex>
              </Box>
              <Text
                fontSize="xl"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                pt="10"
              >
                Rate your screen
              </Text>
              <Flex pt="5">
                <GiRoundStar size="20px" color="#0EBCF5" />
                <GiRoundStar size="20px" color="#0EBCF5" />
                <GiRoundStar size="20px" color="#0EBCF5" />
                <GiRoundStar size="20px" color="#E2E2E2" />
                <GiRoundStar size="20px" color="#E2E2E2" />
              </Flex>
              <Text
                fontSize="xl"
                color="#403F49"
                fontWeight="semibold"
                align="left"
                pt="10"
              >
                Write a review
              </Text>
              <Textarea
                placeholder="Enter your review here"
                width="30%"
                height="40%"
                color="#000000"
              />
              <Stack pt="10" pb="20">
                {screen.reviews.length > 0
                  ? screen.reviews.map((review: any) => (
                      <Review review={review} />
                    ))
                  : null}
              </Stack>
            </Stack>
            <Box
              backgroundImage={rectangle}
              backgroundRepeat="no-repeat"
              backgroundSize="100%"
              borderRadius="67px"
              height="521px"
            >
              <Flex>
                <Box
                  height="204px"
                  color="#EBEBEB"
                  align="left"
                  p="20"
                  left="180px"
                >
                  <Text
                    fontSize="4xl"
                    fontWeight="bold"
                    align="left"
                    mt="2"
                    width="780px"
                  >
                    Need help or want to know how it works?
                  </Text>
                  <Text
                    fontSize="4xl"
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
                    fontSize="xl"
                    fontWeight="semibold"
                    p="5"
                  >
                    {" "}
                    Contact us
                  </Button>
                </Box>
                <Image
                  src={girl2}
                  alt=""
                  p=""
                  height="540px"
                  width="580px"
                  mt="-50"
                  ml="20"
                ></Image>
              </Flex>
            </Box>
          </Stack>
        </Stack>
      )}
    </Box>
  );
}
