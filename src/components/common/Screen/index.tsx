import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Image,
  Flex,
  Text,
  IconButton,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
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
      height="100%"
      borderRadius="lg"
      boxShadow="2xl"
      key={eachScreen._id}
      as={RouterLink}
      to={`/screen/${eachScreen._id}/${
        eachScreen.image.split("/").slice(-1)[0]
      }/${eachScreen.activeGameContract}`}
    >
      {/* image */}
      <Box p="2" height={{ height: 50, lg: "200px" }}>
        <Image
          width="100%"
          height="240px"
          borderRadius="10px"
          src={eachScreen?.image}
          // onLoad={() => triggerPort(eachScreen?.image?.split("/").slice(-1)[0])}
        />
      </Box>
      {/* details of screem */}
      <Stack p="2" pb="4">
        {/* Name */}
        <Flex>
          <Text
            color="#403F49"
            fontSize="lg"
            fontWeight="bold"
            align="left"
            width="85%"
          >
            {eachScreen.name}
          </Text>
          <IconButton
            bg="none"
            icon={<AiOutlinePlus size="25px" color="#403F49" />}
            aria-label="Edit user details"
          />
        </Flex>
        {/* Ratings */}
        <Flex align="center" justifyContent="space-between" p="">
          <Flex>
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
          </Flex>
          <Flex>
            <IconButton
              bg="none"
              icon={<BsDot size="16px" color="#403F49" />}
              aria-label="Star"
            ></IconButton>
            <Text
              color="#403F49"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              2120 slots available
            </Text>
          </Flex>
        </Flex>
        {/* Cost */}
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <IconButton
              bg="none"
              icon={<BiRupee size="16px" color="#403F49" />}
              aria-label="Star"
            ></IconButton>
            <Text
              color="#403F49"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              {`${eachScreen.rentPerSlot}/slot`}
            </Text>
          </Flex>
          <Flex align="center">
            <IconButton
              bg="none"
              icon={<BiRupee size="16px" color="#403F49" />}
              aria-label="Star"
            ></IconButton>
            <Text
              color="#787878"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              250/slot
            </Text>
          </Flex>
          <Text
            pl="1"
            color="#F86E6E"
            fontSize="xs"
            fontWeight="semibold"
            align="left"
          >
            ( 50% OFF)
          </Text>
        </Flex>
        {/* Address */}
        <Tooltip
          label={`${eachScreen.screenAddress}, ${eachScreen.districtCity}, ${eachScreen.country}`}
          aria-label="A tooltip"
        >
          <Stack align="left">
            <Text
              color="#666666"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
              isTruncated
            >
              {`${eachScreen.screenAddress}`}
            </Text>
            <Text
              color="#666666"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              {`${eachScreen.districtCity}, ${eachScreen.country}`}
            </Text>
          </Stack>
        </Tooltip>
      </Stack>
    </Box>
  );
}
