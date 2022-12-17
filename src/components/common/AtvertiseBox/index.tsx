import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";

export function AtvertiseBox(props: any) {
  const { video } = props;

  return (
    <Box
      width="100%"
      height="334px"
      bgColor="#F6F5F5"
      borderRadius="12px"
      boxShadow="2xl"
      key={video._id}
      as={RouterLink}
      to={`/advert/${video._id}/${video?.video?.split("/").slice(-1)[0]}/${
        video.video
      }`}
    >
      <Image
        height="70%"
        width="100%"
        src={video.thumbnail}
        alt=""
        p="5"
      ></Image>
      <Text color="#403F49" pl="5" fontSize="xl" fontWeight="bold" align="left">
        {video.brandName}
      </Text>
      <Text
        color="#666666"
        pl="5"
        fontSize="sm"
        fontWeight="semibold"
        align="left"
        mt="2"
      >
        Location : Lanka, Varanasi, India
      </Text>
    </Box>
  );
}
