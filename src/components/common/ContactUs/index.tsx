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
    <Center px="10" mb="10">
      <Stack width="100%">
        <Box
          backgroundColor="#2BB3E0"
          display="inline-block"
          backgroundRepeat="no-repeat"
          // backgroundAttachment="fixed"
          backgroundSize="100%"
          borderRadius="67px"
          pb="10"
        >
          <Flex align="center" justify="space-between">
            <Box width="60%" color="#EBEBEB" align="left" pt="20" pl="10">
              <Text fontSize="4xl" fontWeight="bold" align="left" pl="10">
                Need help or want to know how it works?
              </Text>
              <Text fontSize="4xl" fontWeight="bold" align="left" pl="10">
                Our industry expersts are here to help you.
              </Text>
              <Button
                bgColor="#D7380E"
                color="#FFFFFF"
                fontSize="xl"
                fontWeight="semibold"
                px="20"
                py="7"
                ml="10"
                mt="5"
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
          <Text color="#403F49" fontSize="xl" fontWeight="700" align="left">
            All destinations
          </Text>
          <IconButton
            bg="none"
            mr="10"
            icon={<GrDown color="#9A9A9A" height="14px" width="27px" />}
            aria-label="Star"
          ></IconButton>
        </Flex>
        <Divider pb="" />
      </Stack>
    </Center>
  );
}
