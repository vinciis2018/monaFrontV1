import React, { useEffect, useState } from "react";
import { Box, Flex, Stack, Button, Text } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { DashBoard } from "./DashBoard";
import { History } from "./History";
import { Actions } from "./Actions";
import { useNavigate } from "react-router-dom";
import { createScreen } from "Actions/screenActions";
import { useDispatch, useSelector } from "react-redux";
import { SCREEN_CREATE_RESET } from "../../Constants/screenConstants";

export function ScreenOwner() {
  const navigate = useNavigate();
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
  const screenCreate = useSelector((state: any) => state.screenCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    screen: createdScreen,
  } = screenCreate;

  const dispatch = useDispatch<any>();

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
  const handleCreateScree = () => {
    dispatch(createScreen());
  };
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      navigate(`/edit-screen/${createdScreen._id}`);
    }
    setSelectedScreen(listOfScreen[0].id);
  }, [selectedScreen, successCreate]);

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
            onClick={handleCreateScree}
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
        <Stack p="5" width="100%">
          <Stack direction="row" justifyContent="space-around" pt="20">
            <Stack
              direction="row"
              borderRadius="48px"
              boxShadow="2xl"
              align="center"
            >
              <Button
                variant="outline"
                fontSize="sm"
                fontWeight={dashboard ? "semibold" : "normal"}
                color={dashboard ? "#000000" : "#333333"}
                borderColor={dashboard ? "#0EBCF5" : ""}
                border={dashboard ? "1px" : ""}
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                onClick={handleDashboardClick}
              >
                DashBoard
              </Button>
              <Button
                variant="outline"
                fontSize="sm"
                fontWeight={histoty ? "semibold" : "normal"}
                color={histoty ? "#000000" : "#333333"}
                borderColor={histoty ? "#0EBCF5" : ""}
                border={histoty ? "1px" : ""}
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                onClick={handleHistoryClick}
              >
                History
              </Button>
              <Button
                variant="outline"
                fontSize="sm"
                fontWeight={actions ? "semibold" : "normal"}
                color={actions ? "#000000" : "#333333"}
                borderColor={actions ? "#0EBCF5" : ""}
                border={actions ? "1px" : ""}
                borderRadius="48px"
                bgColor="#FBFBFB"
                p="3"
                onClick={handleActionClick}
              >
                Actions
              </Button>
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
