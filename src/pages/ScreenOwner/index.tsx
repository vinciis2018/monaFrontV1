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
import Axios from "axios";
import HLoading from "components/atoms/HLoading";
import { userScreensList } from "Actions/userActions";

export function ScreenOwner() {
  const navigate = useNavigate();
  const [selectedScreen, setSelectedScreen] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(true);
  const [histoty, setHistory] = useState<any>(false);
  const [actions, setActions] = useState<any>(false);
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  const [screen, setScreen] = useState<any>(null);
  const [screenLoading, setScreenLoading] = useState<any>(true);
  const [screenError, setScreenError] = useState<any>(null);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState<any>(0);

  console.log("screenLoading : ", screenLoading);
  console.log("videoLoading : ", videoLoading);

  const getVideoList = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}/screenVideos`
      );
      setVideosList(data);
      setVideoLoading(false);
    } catch (error: any) {
      setVideosListError(
        error.response && error.response.data.message
          ? error.response.data.messages
          : error.message
      );
    }
  };
  const getScreentDetail = async (screenId: any) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_BLINDS_SERVER}/api/screens/${screenId}`
      );
      setScreen(data);
      getVideoList(screenId);
      setScreenLoading(false);
    } catch (error: any) {
      setScreenError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const userScreens = useSelector((state: any) => state.userScreens);
  const { loading: loadingScreens, error: errorScreens, screens } = userScreens;
  //console.log("screens : ", JSON.stringify(screens));

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
  const handleSelectScreen = (screenId: any) => {
    setSelectedScreen(screenId);
    setVideoLoading(true);
    setScreenLoading(true);
    getScreentDetail(screenId);
  };

  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    }
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      navigate(`/edit-screen/${createdScreen._id}`);
    }
    console.log("screens : ", screens);
    if (screens.length > 0) {
      setSelectedScreen(screens[0]._id);
      getScreentDetail(screens[0]._id);
    } else {
      dispatch(userScreensList(userInfo));
    }
  }, [successCreate, dispatch, screenLoading, videoLoading]);

  return (
    <Box pl="20" pr="20">
      {screenLoading || videoLoading || loadingScreens ? (
        <HLoading loading={screenLoading || videoLoading || loadingScreens} />
      ) : (
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
              {screens.map((eachScreen: any, index: any) => (
                <Text
                  fontSize="sm"
                  fontWeight="regular"
                  key={index + 1}
                  color="#403F49"
                  align="left"
                  p="3"
                  borderRadius="8px"
                  bg={index === selectedScreenIndex ? "#0EBCF5" : ""}
                  type="Button"
                  _hover={{ bg: "rgba(14, 188, 245, 0.3)", color: "#674780" }}
                  onClick={(e) => {
                    setSelectedScreenIndex(index);
                    handleSelectScreen(eachScreen._id);
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
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color="#333333"
                  pl="5"
                  type="Button"
                  onClick={() => navigate(`/edit-screen/${selectedScreen}`)}
                >
                  edit
                </Text>
              </Stack>
            </Stack>
            <Box>
              {dashboard && selectedScreen ? (
                <DashBoard screen={screen} videosList={videosList} />
              ) : histoty ? (
                <History screen={screen} videosList={videosList} />
              ) : actions ? (
                <Actions screen={screen} videosList={videosList} />
              ) : null}
            </Box>
          </Stack>
        </Flex>
      )}
    </Box>
  );
}
