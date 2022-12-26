import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Stack, Text } from "@chakra-ui/react";
import { triggerPort } from "services/utils";
// import { Rating } from "../Rating";

export function Advert(props: any) {
  const { video } = props;

  return (
    <Box
      as={RouterLink}
      to={`/advert/${video._id}/${video?.video?.split("/").slice(-1)[0]}/${
        video.screen
      }`}
      shadow="card"
      rounded="lg"
      p="2"
      key={video._id}
      color="black.500"
    >
      <Box p="2" height={{ height: 50, lg: "200px" }}>
        <Image
          width="100%"
          height="240px"
          borderRadius="10px"
          src={video?.thumbnail}
          onLoad={() => triggerPort(video?.thumbnail?.split("/").slice(-1)[0])}
        />
      </Box>

      <Stack p="1">
        <Text fontSize="xs" fontWeight="600">
          {video?.title}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {video?.category}
        </Text>
        {/* <Button onClick={() => props.history.push(`/advert/${video._id}/${video?.video?.split("/").slice(-1)[0]}/${video.screen}`)} p="1" width="100%" color="violet.500" variant="outline">View</Button> */}
      </Stack>
    </Box>
  );
}
