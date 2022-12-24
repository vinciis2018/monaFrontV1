import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Image, Flex, Text, IconButton } from "@chakra-ui/react";
import { BiRupee } from "react-icons/bi";
import { AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

export function Screen(props: any) {
  const { eachScreen } = props;
  return (
    <Box
      bgColor="#F7F7F7"
      borderColor="#DFDFDF"
      border="1.5px"
      width="100%"
      height="446px"
      borderRadius="16px"
      boxShadow="2xl"
      key={eachScreen._id}
      as={RouterLink}
      to={`/screen/${eachScreen._id}`}
    >
      {/* image */}
      <Box p="5" height="60%">
        <Image
          height="100%"
          width="100%"
          src={eachScreen.image}
          alt="screen image"
          borderRadius="15px"
        />{" "}
      </Box>
      {/* details of screem */}
      <Box p="5">
        <Flex align="center" height="25%">
          <Text
            color="#403F49"
            fontSize="xl"
            fontWeight="bold"
            align="left"
            width="85%"
          >
            {eachScreen.name}
          </Text>
          <IconButton
            bg="none"
            mr="2"
            icon={<AiOutlinePlus size="59px" color="#403F49" />}
            aria-label="Edit user details"
          ></IconButton>
        </Flex>
        <Flex align="center" ml="-3" mt="2">
          <IconButton
            bg="none"
            icon={<AiFillStar size="16px" color="#403F49" />}
            aria-label="Star"
          ></IconButton>

          <Text
            pl="1"
            color="#403F49"
            fontSize="sm"
            fontWeight="semibold"
            align="left"
          >
            {eachScreen.ratting || 4.5}
          </Text>
          <IconButton
            bg="none"
            icon={<BsDot size="16px" color="#403F49" />}
            aria-label="Star"
          ></IconButton>
          <Text
            color="#666666"
            fontSize="sm"
            fontWeight="semibold"
            align="left"
          >
            {`${eachScreen.screenAddress} ${eachScreen.districtCity} ${eachScreen.country}`}
          </Text>
        </Flex>
        <Text
          ml="0"
          color="#403F49"
          fontSize="sm"
          fontWeight="semibold"
          align="left"
        >
          2120 slots available
        </Text>
        <Flex align="center" ml="-3">
          <IconButton
            bg="none"
            icon={<BiRupee size="16px" color="#403F49" />}
            aria-label="Star"
          ></IconButton>
          <Text
            pl="-5"
            color="#403F49"
            fontSize="sm"
            fontWeight="semibold"
            align="left"
          >
            {`${eachScreen.rentPerSlot} per slot`}
          </Text>
          <IconButton
            bg="none"
            icon={<BiRupee size="16px" color="#403F49" />}
            aria-label="Star"
          ></IconButton>
          <Text
            as="s"
            color="#787878"
            fontSize="sm"
            fontWeight="semibold"
            align="left"
          >
            250 per slot
          </Text>
          <Text
            pl="1"
            color="#F86E6E"
            fontSize="lg"
            fontWeight="semibold"
            align="left"
          >
            ( 50% OFF)
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
