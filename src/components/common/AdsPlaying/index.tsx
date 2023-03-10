import React from "react";
// import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { consvertSecondToHrAndMinutes } from "utils/dateAndTime";

export function AdsPlaying(props: any) {
  const { video } = props;
  console.log("video : ", JSON.stringify(video));
  const playingTime = consvertSecondToHrAndMinutes(
    video.duration * video.totalSlotBooked
  ); // sending time in seconds only and get in hr, mn,sec

  return (
    <Box
      p="2"
      width="228px"
      height="202px"
      bgColor="#F6F5F5"
      borderRadius="12px"
      boxShadow="2xl"
      key={video._id}
    >
      <Image height="50%" width="212px" src={video.thumbnail} alt=""></Image>
      <Text
        color="#403F49"
        pt="2"
        fontSize="sm"
        fontWeight="semibold"
        align="left"
      >
        {video.brandName}
      </Text>
      <Flex justifyContent="space-between" pt="2">
        <Text color="#403F49" fontSize="sm" align="left">
          Playtime
        </Text>
        <Text color="#403F49" fontSize="sm" align="left">
          {/* {`${video.hrsToComplete} hours`} */}
          {`${playingTime}`}
        </Text>
      </Flex>
      <Flex justifyContent="space-between" pt="2" align="center">
        <Text color="#403F49" fontSize="sm" align="left">
          Total no of slots
        </Text>
        <Text color="#403F49" fontSize="sm" align="left">
          {video.totalSlotBooked}
        </Text>
      </Flex>
    </Box>
  );
}
