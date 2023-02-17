import {
  Box,
  Flex,
  Stack,
  Text,
  VStack,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { convertIntoDateAndTime } from "utils/dateAndTime";
import { BsDot } from "react-icons/bs";
import Axios from "axios";
import { MyMap } from "pages/MyMap";

export function CampaignDetails(props: any) {
  //   const videoId = "63b3e7bb8eb1e1983f0cde64";
  //   const [videoId, setVideoId] = useState<any>();
  const [videoDetail, setVideoDetails] = useState<any>();
  const getDiscount = (total: any, discount: any) => {
    return total - (total * 100) / discount;
  };

  const [screen, setScreen] = useState<any>();
  const [loadingScreen, setLoadingScreen] = useState<any>(true);
  const [errorScreen, setErrorScreen] = useState<any>();
  const [video, setVideo] = useState<any>();
  const [loadingVideo, setLoadingVideo] = useState<any>(true);
  const [errorVideo, setErrorVideo] = useState<any>();
  const [geometry, setGeometry] = useState<any>();
  const [jsonData, setJsonData] = useState<any>();

  console.log("screen  : ", JSON.stringify(screen));
  console.log("video  : ", JSON.stringify(video));

  const getScreenDetail = async (screenId: any) => {
    try {
      console.log("getScreenDetail : ", screenId);
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      setScreen(data);
      setGeometry({
        geometry: {
          coordinates: [data.lng, data.lat],
        },
      });
      setJsonData({
        features: [
          {
            type: "Feature",
            properties: {
              pin: data._id,
              screen: data._id,
            },
            geometry: {
              coordinates: [data.lat, data.lng],
              type: "Point",
            },
          },
        ],
      });
      setLoadingScreen(false);
    } catch (error: any) {
      setErrorScreen(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  const getVideoDetails = async (videoId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/videos/${videoId}`
      );
      setVideo(data);
      setLoadingVideo(false);
      getScreenDetail(data.screen);
    } catch (error: any) {
      setErrorVideo(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    const videoId = window.location.pathname.split("/")[2];
    getVideoDetails(videoId);
  }, []);

  return (
    <Box p="10" pt="20">
      <Box shadow="2xl" p="10" pt="0">
        {loadingVideo || loadingScreen ? (
          <HLoading loading={loadingVideo || loadingScreen} />
        ) : errorVideo ? (
          <MessageBox variant="danger">{errorVideo || errorScreen}</MessageBox>
        ) : (
          <Box>
            <Flex justifyContent="space-between" align="center">
              <VStack align="left" pt="3">
                <Text
                  color="#000000"
                  fontSize="2xl"
                  fontWeight="semibold"
                  align="left"
                >
                  Campaign details
                </Text>
                <Text color="#575757" fontSize="sm" align="left">
                  {convertIntoDateAndTime(video.createdAt)}
                </Text>
              </VStack>
              <Stack align="end">
                {video.paidForSlots ? (
                  <Flex>
                    <BsDot color="#00D615" size="20px" />
                    <Text color="#403F45" fontSize="sm" pl="2">
                      Active
                    </Text>
                  </Flex>
                ) : (
                  <Flex>
                    <BsDot size="20px" color="#E93A03" />
                    <Text color="#403F45" fontSize="sm" pl="2">
                      Pending
                    </Text>
                  </Flex>
                )}
              </Stack>
            </Flex>
            <Stack align="center" pt="5" borderRadius="8px">
              <Image
                src={video.thumbnail}
                alt=""
                width="70%"
                borderRadius="8px"
              />
            </Stack>
            <Box p="5" pt="10">
              <Box align="center" bgColor="#F7F7F7" boxShadow="2xl">
                <SimpleGrid columns={[1, null, 3]} spacing={3} p="10">
                  <Box color="black.500" height="300px">
                    <MyMap data={jsonData} geometry={geometry} />
                  </Box>
                  <Box p="5">
                    <Text color="#000000" fontSize="sm">
                      {`${screen.screenAddress},
                      ${screen.districtCity},
                      ${screen.stateUT},
                      ${screen.country}`}
                    </Text>
                  </Box>
                  <Box align="left">
                    <Text color="#0D0D0D" fontSize="lg" fontWeight="semibold">
                      Order summary
                    </Text>
                    <VStack align="left" pt="5">
                      <Flex justifyContent="space-between">
                        <Text color="#0D0D0D" fontSize="lg">
                          Slots selected:
                        </Text>
                        <Text color="#0D0D0D" fontSize="lg">
                          {video.totalNoOfSlots}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text color="#0D0D0D" fontSize="lg">
                          Rent per slot:
                        </Text>
                        <Text color="#0D0D0D" fontSize="lg">
                          ₹{screen.rentPerSlot}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text
                          color="#0D0D0D"
                          fontSize="lg"
                          fontWeight="semibold"
                        >
                          Amount:
                        </Text>
                        <Text
                          color="#0D0D0D"
                          fontSize="lg"
                          fontWeight="semibold"
                        >
                          ₹{screen.rentPerSlot * video.totalNoOfSlots}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text color="#0D0D0D" fontSize="sm">
                          Tax (16%):
                        </Text>
                        <Text color="#0D0D0D" fontSize="sm">
                          ₹
                          {getDiscount(
                            screen.rentPerSlot * video.totalNoOfSlots,
                            16
                          )}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text
                          color="#0D0D0D"
                          fontSize="lg"
                          fontWeight="semibold"
                        >
                          Total payment:
                        </Text>
                        <Text
                          color="#0D0D0D"
                          fontSize="lg"
                          fontWeight="semibold"
                        >
                          ₹
                          {screen.rentPerSlot * video.totalNoOfSlots +
                            getDiscount(
                              screen.rentPerSlot * video.totalNoOfSlots,
                              16
                            )}
                        </Text>
                      </Flex>
                    </VStack>
                  </Box>
                </SimpleGrid>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
