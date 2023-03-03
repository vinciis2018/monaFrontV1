import { Box, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { AdsListOfSinglScreen, AdsPlaying } from "components/common";
import { MyMap } from "pages/MyMap";
import { useEffect, useState } from "react";
import { convertIntoDateAndTime } from "utils/dateAndTime";
export function DashBoard(props: any) {
  const { screen, videosList } = props;
  const [geometry, setGiometry] = useState<any>();
  const [jsonData, setJsonData] = useState<any>({});
  //console.log("selct screen id 1212: ", JSON.stringify(screen));
  //console.log("videosList: ", JSON.stringify(videosList));
  const data = { features: [] };
  useEffect(() => {
    setGiometry({
      coordinates: [screen?.lat, screen?.lng],
      type: "Point",
    });
    setJsonData({
      features: [
        {
          type: "Feature",
          properties: {
            pin: screen._id,
            screen: screen._id,
          },
          geometry: {
            coordinates: [screen.lat, screen.lng],
            type: "Point",
          },
        },
      ],
    });
  }, [props]);

  return (
    <Box>
      <Box>
        <SimpleGrid columns={[1, 0, 3]} spacing="2" pt="5">
          <Stack p="5" direction="column" boxShadow="2xl">
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
              {`${screen.slotsTimePeriod}sec/slot`}
            </Text>
            <Text
              fontSize="14px"
              fontWeight="semibold"
              color="#403F49"
              align="left"
            >
              {convertIntoDateAndTime(screen.startTime)?.split(",")[2]} to{" "}
              {convertIntoDateAndTime(screen.endTime)?.split(",")[2]}
            </Text>
          </Stack>
          <Stack p="5" direction="column" boxShadow="2xl"></Stack>
          <Stack direction="column" boxShadow="2xl">
            {jsonData && geometry ? (
              <MyMap data={jsonData} geometry={geometry} zoom={3} />
            ) : null}
          </Stack>
        </SimpleGrid>
        <Stack direction="row" pt="5"></Stack>
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
              ?.slice(0, 3)
              .map((video: any, index: any) => (
                <AdsPlaying video={video} key={index} />
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
        <Stack pt="10" boxShadow="2xl">
          {videosList && (
            <AdsListOfSinglScreen
              videos={videosList}
              rentPerSlot={screen.rentPerSlot}
            />
          )}
        </Stack>
      </Box>
    </Box>
  );
}
