import React from "react";
import { Box, Stack, Image, Text, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "hooks";
import { MediaContainer } from "../MediaContainer";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function UserCollections(props: any) {
  const {
    data: media,
    isLoading,
    isError,
  } = useMedia({ id: props.props.media.split("/").slice(4)[0] });
  console.log(props.props);

  const navigate = useNavigate();

  return (
    <Box
      width="100%"
      height="100%"
      key={props._id}
      // onClick={() => navigate(`/campaignDetails/${video._id}`)}
    >
      {isLoading ? (
        <HLoading loading={isLoading} />
      ) : isError ? (
        <MessageBox variant="danger">{isError}</MessageBox>
      ) : (
        <SimpleGrid key={props.props._id} columns={[1, 2]} gap={4}>
          <Stack p="1" borderRadius="lg" onClick={() => {}} boxShadow="2xl">
            <Image
              src={props.props.thumbnail}
              alt="media"
              width="100%"
              borderRadius="8px"
            />
            <Text color="#000000" align="left" fontWeight="semibold">
              {props.props.title}
            </Text>
          </Stack>
          <Stack p="1" borderRadius="lg" onClick={() => {}} boxShadow="2xl">
            <MediaContainer media={media} />
            <Text color="#000000" align="left" fontWeight="semibold">
              {props.props.title}
            </Text>
          </Stack>
        </SimpleGrid>
      )}
    </Box>
  );
}
