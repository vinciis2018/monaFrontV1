import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { GiRoundStar } from "react-icons/gi";

export function Review(props: any) {
  const { review } = props;
  //console.log(rating, name, comments);
  const ratingArray = [1, 2, 3, 4, 5];

  const getRatingBox = (color: any) => {
    return <GiRoundStar size="20px" color={color} />;
  };
  return (
    <Box>
      <Text color="#403F49" fontSize="3xl" fontWeight="semibold" align="left">
        {review.name}
      </Text>
      <Flex pt="5">
        {ratingArray.map((rat, index) => {
          if (rat <= review.rating) {
            return getRatingBox("#0EBCF5");
          } else {
            return getRatingBox("#E2E2E2");
          }
        })}
      </Flex>
      <Text color="#686868" fontSize="sm" pt="5" align="left">
        {review.comment}
      </Text>
    </Box>
  );
}
