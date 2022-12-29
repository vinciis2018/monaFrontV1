import React, { useEffect, useState } from "react";
import { Box, Flex, Stack, Button, Text } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { DashBoard } from "./DashBoard";
import { History } from "./History";
import { Actions } from "./Actions";

export function ScreenOwner() {
  const listOfScreen = [
    { name: "Screen1", id: "6396f6922665b32d1193eeb9" },
    { name: "Screen2", id: "6396e3322665b32d119364ee" },
    { name: "Screen3", id: "6395aac32665b32d119226c0" },
    { name: "Screen4", id: "6395aa0a2665b32d1192260a" },
  ];
  const [selectedScreen, setSelectedScreen] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(true);
  const [histoty, setHistory] = useState<any>(false);
  const [actions, setActions] = useState<any>(false);
  const handleDashboardClick = (e: any) => {
    setDashboard(true);
    setHistory(false);
    setActions(false);
  };
  const handleHistoryClick = (e: any) => {
    setDashboard(false);
    setHistory(true);
    setActions(false);
  };
  const handleActionClick = (e: any) => {
    setDashboard(false);
    setHistory(false);
    setActions(true);
  };

  useEffect(() => {
    setSelectedScreen(listOfScreen[0].id);
  }, [selectedScreen]);

  return (
    <Box pl="20" pr="20">
      <Flex>
        <Stack p="5" bgColor="#FEFEFE" width="15%" boxShadow="2xl">
          <Text
            fontSize="lg"
            fontWeight="semibold"
            color="#000000"
            align="left"
            pt="20"
          >
            All Screen
          </Text>
          <Button
            color="#000000"
            fontSize="sm"
            boxShadow="2xl"
            align="center"
            variant="outline"
            p="3"
          >
            + New Screen
          </Button>
          <Stack pt="10">
            {listOfScreen.map((eachScreen, index) => (
              <Text
                fontSize="sm"
                fontWeight="regular"
                key={index + 1}
                color="#403F49"
                align="left"
                p="3"
                borderRadius="8px"
                type="Button"
                _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
                onClick={(e) => {
                  setSelectedScreen(eachScreen.id);
                }}
              >
                {eachScreen.name}
              </Text>
            ))}
          </Stack>
        </Stack>
        <Stack width="80%" p="5">
          <Stack direction="row" justifyContent="space-around" pt="20">
            <Stack
              direction="row"
              borderRadius="48px"
              boxShadow="2xl"
              align="center"
              bgColor="rgba(0, 0, 0, 0.07)"
            >
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="#000000"
                borderColor="#0EBCF5"
                border="1px"
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                type="Button"
                onClick={handleDashboardClick}
              >
                DashBoard
              </Text>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="#000000"
                borderColor="#0EBCF5"
                border="1px"
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                type="Button"
                onClick={handleHistoryClick}
              >
                History
              </Text>
              <Text
                fontSize="sm"
                fontWeight="semibold"
                color="#000000"
                borderColor="#0EBCF5"
                border="1px"
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                type="Button"
                onClick={handleActionClick}
              >
                Actions
              </Text>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" align="center">
              <FiSettings size="20px" color="#333333" />
              <Text fontSize="sm" fontWeight="semibold" color="#333333" pl="5">
                Settings
              </Text>
            </Stack>
          </Stack>
          <Box>
            {dashboard && selectedScreen ? (
              <DashBoard screenID={selectedScreen} />
            ) : histoty ? (
              <History screenID={selectedScreen} />
            ) : actions ? (
              <Actions screenID={selectedScreen} />
            ) : null}
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
}
