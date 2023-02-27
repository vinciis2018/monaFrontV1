import {
  Box,
  Flex,
  Stack,
  Text,
  VStack,
  // Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { convertIntoDateAndTime } from "utils/dateAndTime";
import { BsDot } from "react-icons/bs";
import Axios from "axios";
import { MyMap } from "pages/MyMap";
import { useMedia } from "hooks";
import { MediaContainer } from "components/common";

export function CampaignDetails(props: any) {
  //   const campaignId = "63b3e7bb8eb1e1983f0cde64";
  //   const [campaignId, setcampaignId] = useState<any>();
  // const [videoDetail, setCampaignDetails] = useState<any>();
  const getDiscount = (total: any, discount: any) => {
    return total - (total * discount) / 100;
  };

  const [screen, setScreen] = useState<any>();
  const [loadingScreen, setLoadingScreen] = useState<any>(true);
  const [errorScreen, setErrorScreen] = useState<any>();
  const [campaign, setCampaign] = useState<any>();
  const [loadingVideo, setLoadingVideo] = useState<any>(true);
  const [errorVideo, setErrorVideo] = useState<any>();
  const [geometry, setGeometry] = useState<any>();
  const [jsonData, setJsonData] = useState<any>();
  const [cid, setCid] = useState<any>("");

  // console.log("screen  : ", JSON.stringify(screen));
  // console.log("campaign  : ", JSON.stringify(campaign));

  const {
    data: media,
    isLoading,
    isError,
  } = useMedia({ id: cid.split("/").slice(4)[0] });
  // console.log(media);

  const getScreenDetail = async (screenId: any) => {
    try {
      // console.log("getScreenDetail : ", screenId);
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      // console.log("screen  : ", JSON.stringify(data));
      setScreen(data);
      setGeometry({
        coordinates: [data.lat, data.lng],
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
  const getCampaignDetail = async (campaignId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/campaign/${campaignId}`
      );
      setCampaign(data);
      setLoadingVideo(false);
      getScreenDetail(data.screen);
      setCid(data.video);
    } catch (error: any) {
      setErrorVideo(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  useEffect(() => {
    const campaignId = window.location.pathname.split("/")[2];
    getCampaignDetail(campaignId);
    // console.log(media);
  }, [cid]);

  return (
    <Box p="10" pt="20">
      <Box shadow="2xl" p="10" pt="0">
        {loadingVideo || loadingScreen || isLoading ? (
          <HLoading loading={loadingVideo || loadingScreen || isLoading} />
        ) : errorVideo || isError ? (
          <MessageBox variant="danger">
            {errorVideo || errorScreen || isError}
          </MessageBox>
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
                  {convertIntoDateAndTime(campaign.createdAt)}
                </Text>
              </VStack>
              <Stack align="end">
                {campaign.paidForSlots ? (
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
              {/* <Image
                src={campaign.thumbnail}
                alt=""
               
              /> */}
              {/* <Box width="856px" height="333px" borderRadius="8px"> */}
              <MediaContainer media={media} />
              {/* </Box> */}
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
                          {campaign.totalSlotBooked}
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
                          ₹{campaign.totalAmount}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text color="#0D0D0D" fontSize="sm">
                          Tax (16%):
                        </Text>
                        <Text color="#0D0D0D" fontSize="sm">
                          ₹{getDiscount(campaign.totalAmount, 16)}
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
                          {campaign.totalAmount +
                            getDiscount(campaign.totalAmount, 16)}
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
