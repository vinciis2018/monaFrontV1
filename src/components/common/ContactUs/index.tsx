import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Center,
  Stack,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { GrDown } from "react-icons/gr";

export function ContactUs() {
  return (
    <Center p="10">
      <Stack width="100%">
        <Box
          backgroundColor="#2BB3E0"
          display="inline-block"
          backgroundRepeat="no-repeat"
          // backgroundAttachment="fixed"
          backgroundSize="100%"
          borderRadius="67px"
        >
          <Flex align="center" justify="space-between">
            <Box
              width="60%"
              color="#EBEBEB"
              align="left"
              pt={{ base: "5", lg: "20" }}
              pl={{ base: "10", lg: "20" }}
            >
              <Text
                fontSize={{ base: "lg", lg: "5xl" }}
                fontWeight="bold"
                align="left"
              >
                Need help or want to know how it works?
              </Text>
              <Text
                fontSize={{ base: "lg", lg: "5xl" }}
                fontWeight="bold"
                align="left"
              >
                Our industry expersts are here to help you.
              </Text>
              <Stack pt="10"></Stack>
              <Button
                bgColor="#D7380E"
                color="#FFFFFF"
                fontSize={{ base: "lg", lg: "xl" }}
                fontWeight="semibold"
                px={{ base: "5", lg: "20" }}
                py={{ base: "2", lg: "5" }}
                ml={{ base: "2", lg: "10" }}
                mt={{ base: "2", lg: "5" }}
                mb={{ base: "5" }}
              >
                {" "}
                Contact us
              </Button>
            </Box>
            <Box py="3">
              <Image
                src="https://bafybeianqzktg4aqnrpar75txd6enrc6kc2yvojfzb6t3dfo5hnv3e4t4y.ipfs.w3s.link/girl2.png"
                alt=""
                p=""
                height="100%"
                width=""
              />
            </Box>
          </Flex>
        </Box>
        <Divider pt="10" />
        <Flex align="center" justifyContent="space-between">
          <Text
            color="#000000"
            fontSize={{ base: "lg", lg: "4xl" }}
            fontWeight="semibold"
            align="left"
            p="3"
          >
            All destinations
          </Text>
          <IconButton
            bg="none"
            mr="10"
            icon={<GrDown color="#9A9A9A" size="30px" />}
            aria-label="Star"
          ></IconButton>
        </Flex>
        <Divider />
      </Stack>
    </Center>
  );
}
