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
import HLoading from "components/atoms/HLoading";
import { userScreensList } from "Actions/userActions";
import MessageBox from "components/atoms/MessageBox";
import { getCampaignListByScreenId } from "Actions/campaignAction";

export function ScreenOwner() {
  const navigate = useNavigate();
  const [selectedScreen, setSelectedScreen] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(true);
  const [histoty, setHistory] = useState<any>(false);
  const [actions, setActions] = useState<any>(false);
  const [screen, setScreen] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [selectedScreenIndex, setSelectedScreenIndex] = useState<any>(0);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  //console.log("userInfo", JSON.stringify(userInfo));
  const userScreens = useSelector((state: any) => state.userScreens);
  const { loading: loadingScreens, error: errorScreens, screens } = userScreens;
  const campaignListByScreenId = useSelector(
    (state: any) => state.campaignListByScreenId
  );
  const {
    loading: loadingCampaign,
    error: errorCampaign,
    campaigns: videosList,
  } = campaignListByScreenId;
  //console.log("screens 333 : ", JSON.stringify(screens));

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
  const handleSelectScreen = (screen: any, index: any) => {
    setSelectedScreenIndex(index);
    setScreen(screen);
    setSelectedScreen(screen._id);
    dispatch(getCampaignListByScreenId(screen._id));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    if (successCreate) {
      dispatch({ type: SCREEN_CREATE_RESET });
      navigate(`/edit-screen/${createdScreen._id}`);
    }
    //console.log("screens : ", screens);
    if (screens?.length > 0) {
      console.log("came inside when we get screens data");
      handleSelectScreen(screens[0], 0);
    }
    dispatch(userScreensList(userInfo));
    setLoading(true);
  }, [successCreate, dispatch, navigate, userInfo, loading]);

  return (
    <Box pt="5">
      <Box pl={{ base: "2", lg: "20" }} pr={{ base: "2", lg: "20" }}>
        {loadingScreens || loadingCreate || loadingCampaign ? (
          <HLoading
            loading={loadingScreens || loadingCreate || loadingCampaign}
          />
        ) : errorScreens || errorCreate || errorCampaign ? (
          <MessageBox variant="danger">
            {errorScreens || errorCreate || errorCampaign}
          </MessageBox>
        ) : (
          <Flex>
            <Stack
              p="5"
              bgColor="#FEFEFE"
              width={{ base: "70%", lg: "20%" }}
              boxShadow="2xl"
            >
              <Text
                fontSize={{ base: "sm", lg: "lg" }}
                fontWeight="semibold"
                color="#000000"
                align="left"
                pt="20"
              >
                All Screen
              </Text>
              <Button
                color="#000000"
                fontSize={{ base: "xs", lg: "sm" }}
                boxShadow="2xl"
                align="center"
                variant="outline"
                p="3"
                onClick={handleCreateScree}
              >
                + New
              </Button>
              <Stack pt="10">
                {screens?.map((eachScreen: any, index: any) => (
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
                    onClick={() => {
                      handleSelectScreen(eachScreen, index);
                    }}
                  >
                    {eachScreen.name}
                  </Text>
                ))}
              </Stack>
            </Stack>
            <Stack p="5" width="100%">
              <Stack
                direction="row"
                pt=""
                align="center"
                justifyContent="space-between"
              >
                <Stack></Stack>
                <Stack
                  direction="row"
                  borderRadius="48px"
                  boxShadow="2xl"
                  align="center"
                  justifyContent="center"
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
                <Stack
                  direction="row"
                  align="center"
                  alignItems="flex-end"
                  justifyContent="flex-end"
                  pr="10"
                >
                  <FiSettings size="20px" color="#333333" />
                  <Text
                    fontSize="sm"
                    fontWeight="semibold"
                    color="#333333"
                    pl="5"
                    type="Button"
                    onClick={() => {
                      if (selectedScreen) {
                        navigate(`/edit-screen/${selectedScreen}`);
                      } else {
                        alert("First select screen for edit..");
                      }
                    }}
                  >
                    edit
                  </Text>
                </Stack>
              </Stack>
              <Box>
                {dashboard && selectedScreen ? (
                  <DashBoard screen={screen} videosList={videosList} />
                ) : histoty && selectedScreen ? (
                  <History screen={screen} videosList={videosList} />
                ) : actions && selectedScreen ? (
                  <Actions screen={screen} videosList={videosList} />
                ) : null}
              </Box>
            </Stack>
          </Flex>
        )}
      </Box>
    </Box>
  );
}
