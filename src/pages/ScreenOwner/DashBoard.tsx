import { Box, Stack, Text, SimpleGrid } from "@chakra-ui/react";
import { AdsListOfSinglScreen, AdsPlaying } from "components/common";
import { MyMap } from "pages/MyMap";
import { useEffect } from "react";

export function DashBoard(props: any) {
  const { screen, videosList } = props;
  //console.log("selct screen id 1212: ", JSON.stringify(screen));
  //console.log("videosList: ", JSON.stringify(videosList));

  const data = { features: [] };
  useEffect(() => {}, [props]);

  return (
    <Box>
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
              {`${screen.slotsTimePeriod}sec/slot`}
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
              ?.slice(0, 3)
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
