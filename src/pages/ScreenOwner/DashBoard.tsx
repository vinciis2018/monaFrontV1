import { Box, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { AdsInTable, AdsPlaying } from "components/common";
import { MyMap } from "pages/MyMap";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import HLoading from "components/atoms/HLoading";

export function DashBoard(props: any) {
  const { screenID } = props;
  const data = { features: [] };
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  const [screen, setScreen] = useState<any>(null);
  const [screenLoading, setScreenLoading] = useState<any>(true);
  const [screenError, setScreenError] = useState<any>(null);
  console.log("videoLoading : ", videoLoading);

  const getVideoList = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/screenVideos`
      );
      setVideosList(data);
      console.log("video  : ", JSON.stringify(data));
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
      console.log("Screen datta : ", JSON.stringify(data));
      setScreenLoading(false);
      getVideoList(screenID);
    } catch (error: any) {
      setScreenError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  useEffect(() => {
    console.log("useEffect called ", screenID);
    if (screenID) {
      getScreentDetail(screenID);
    }
  }, [props]);
  return (
    <Box>
      {videoLoading || screenLoading ? (
        <HLoading loading={videoLoading || screenLoading} />
      ) : (
        <Box>
          <Stack direction="row" pt="5">
            <Stack p="5" direction="column" boxShadow="2xl" width="25%">
              <Text
                fontSize="lg"
                fontWeight="semibold"
                color="#403F49"
                align="left"
              >
                {screen.name}
              </Text>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="#403F49"
                align="left"
              >
                {`${screen.size.length} X ${screen.size.width}`}
              </Text>
              <Text
                fontSize="14px"
                fontWeight="semibold"
                color="#333333"
                align="left"
                pt="10"
              >
                20sec/slot
              </Text>
              <Text
                fontSize="14px"
                fontWeight="semibold"
                color="#403F49"
                align="left"
              >
                3:30 AM to 5:30 PM
              </Text>
            </Stack>
            <Stack p="5" direction="column" boxShadow="2xl" width="50%"></Stack>
            <Stack direction="column" boxShadow="2xl" width="25%">
              <MyMap data={data} />
            </Stack>
          </Stack>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="#403F49"
            align="left"
            pt="10"
          >
            Ads playing
          </Text>
          <SimpleGrid columns={[1, null, 3]} spacing="10" pt="5">
            {videosList &&
              videosList
                .slice(0, 3)
                .map((video: any) => (
                  <AdsPlaying video={video} key={video._id} />
                ))}
          </SimpleGrid>
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="#403F49"
            align="left"
            pt="10"
          >
            History
          </Text>
          <Stack pt="5" boxShadow="2xl">
            {videosList && <AdsInTable videos={videosList} />}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
