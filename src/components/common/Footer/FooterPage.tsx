import React from "react";
import {
  Box,
  Image,
  Stack,
  Text,
  Flex,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { TbBrandDiscord, TbBrandFacebook } from "react-icons/tb";

import Logo from "assets/logo.png";
import Name from "assets/name.png";
import { FaInstagram } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";

export function FooterPage() {
  return (
    <Box pt="20">
      <Flex pl="20" pr="20">
        <Box width="50%">
          <Stack as={RouterLink} to="/" direction="row" align="center">
            <Image width={{ base: 30, lg: "50px" }} src={Logo} />
            <Image width={{ base: 70, lg: "100px" }} src={Name} />
          </Stack>
          <Box align="left" mt="10">
            <Text fontWeight="semibold" color="#000000">
              Registered Office Address:
            </Text>{" "}
            <Text fontSize="sm" color="#333333">
              Vinciis Creations Private Limited, D 65/319 C, Lahartara, B
              Shivdaspur, Varanasi, UP, 221002
            </Text>
          </Box>
          <Flex mt="10">
            <Box
              borderRadius="100%"
              border="2px"
              height="40px"
              width="40px"
              borderColor="#9A9A9A"
            >
              <Stack mt="2" ml="2">
                <TbBrandFacebook color="#9A9A9A" size="20px" />
              </Stack>
            </Box>
            <Box
              ml="2"
              borderRadius="100%"
              border="2px"
              height="40px"
              width="40px"
              borderColor="#9A9A9A"
            >
              <Stack mt="2" ml="2">
                <FaInstagram color="#9A9A9A" size="20px" />
              </Stack>
            </Box>
            <Box
              ml="2"
              borderRadius="100%"
              border="2px"
              height="40px"
              width="40px"
              borderColor="#9A9A9A"
              align="center"
              justifyContent="center"
            >
              <Stack mt="2" ml="2">
                <FiTwitter color="#9A9A9A" size="20px" />
              </Stack>
            </Box>
            <Box
              ml="2"
              borderRadius="100%"
              border="2px"
              height="40px"
              width="40px"
              borderColor="#9A9A9A"
            >
              <Stack mt="2" ml="2">
                <TbBrandDiscord color="#9A9A9A" size="20px" />
              </Stack>
            </Box>
            <Box
              ml="2"
              borderRadius="100%"
              border="2px"
              height="40px"
              width="40px"
              borderColor="#9A9A9A"
            >
              <Stack mt="2" ml="2">
                <AiOutlineYoutube color="#9A9A9A" size="20px" />
              </Stack>
            </Box>
          </Flex>
        </Box>
        <Box width="50%">
          <Stack>
            <Text
              align="left"
              color="#403F49"
              fontSize="sm"
              fontWeight="semibold"
            >
              Exclusive offers
            </Text>
            <Text color="#666666" fontSize="sm" align="left">
              Sign up to the newsletter to receive our latest offers
            </Text>
            <Stack pt="5">
              <Input
                p="5"
                borderColor="#888888"
                borderRadius="5px"
                width="70%"
                placeholder="hello@example.com"
                color="#888888"
              ></Input>
            </Stack>
            <Stack pt="5">
              <Button
                color="#403F49"
                borderColor="#403F49"
                variant="outline"
                width="40%"
                fontSize="xl"
                fontWeight="semibold"
                p="5"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Flex>
      <Box pt="10" px="20">
        <Divider borderColor="black.500" />
      </Box>
      <Text color="#5C5C5C" fontSize="sm" align="left" mt="10" pl="20">
        Copyright @ VINCIIS CREATIONS PRIVATE LIMITED, 2022. All rights
        reserved.
      </Text>
    </Box>
  );
}
