import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Stack, Image, Text } from "@chakra-ui/react";

export function AtvertiseBox(props: any) {
  const { video } = props;

  return (
    <Box
      width="100%"
      height="100%"
      bgColor="#F6F5F5"
      borderRadius="lg"
      boxShadow="2xl"
      key={video._id}
      as={RouterLink}
      to={`/advert/${video._id}/${video?.video?.split("/").slice(-1)[0]}/${
        video.video
      }`}
    >
      <Box p="2" height={{ height: 50, lg: "200px" }}>
        <Image
          borderRadius="10px"
          height="240px"
          width="100%"
          src={video.thumbnail}
          alt=""
        />
      </Box>
      <Stack p="2" pb="4">
        <Text
          px="1"
          color="#403F49"
          fontSize="xl"
          fontWeight="1000"
          align="left"
        >
          {video.brandName}
        </Text>
        <Text
          px="1"
          color="#666666"
          fontSize="sm"
          fontWeight="600 "
          align="left"
        >
          Location : Lanka, Varanasi, India
        </Text>
      </Stack>
    </Box>
  );
}