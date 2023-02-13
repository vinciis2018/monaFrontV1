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
  const { eachScreen: screen } = props;
  return (
    <Box
      bgColor="#F7F7F7"
      borderColor="#DFDFDF"
      border="1.5px"
      width="100%"
      height="100%"
      borderRadius="lg"
      boxShadow="2xl"
      key={screen._id}
      as={RouterLink}
      to={`/screen/${screen._id}`}
    >
      {/* image */}
      <Box p="2" height={{ height: 50, lg: "200px" }}>
        <Image
          width="100%"
          height="240px"
          borderRadius="10px"
          src={screen?.image}
          // onLoad={() => triggerPort(screen?.image?.split("/").slice(-1)[0])}
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
            {screen.name}
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
              {screen.rating}
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
              {`${screen.rentPerSlot}/slot`}
            </Text>
          </Flex>
          <Flex align="center" as="s">
            <Text
              color="#787878"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              ₹
              {screen.rentPerSlot - screen.rentOffInPercent
                ? (screen.rentPerSlot * 100) / screen.rentOffInPercent
                : 0}{" "}
              per slot
            </Text>
          </Flex>
          <Text
            pl="1"
            color="#F86E6E"
            fontSize="xs"
            fontWeight="semibold"
            align="left"
          >
            ( {screen.rentOffInPercent}% OFF)
          </Text>
        </Flex>
        {/* Address */}
        <Tooltip
          label={`${screen.screenAddress}, ${screen.districtCity}, ${screen.country}`}
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
              {`${screen.screenAddress}`}
            </Text>
            <Text
              color="#666666"
              fontSize="xs"
              fontWeight="semibold"
              align="left"
            >
              {`${screen.districtCity}, ${screen.country}`}
            </Text>
          </Stack>
        </Tooltip>
      </Stack>
    </Box>
  );
}
