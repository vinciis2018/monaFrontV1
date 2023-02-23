import React, { useEffect } from "react";
import { Box, Text, Stack } from "@chakra-ui/react";

import { userCampaignsList } from "Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { MySingleCampaign } from "components/common";

export function CampaignListOfUser() {
  const userCampaign = useSelector((state: any) => state.userCampaign);
  const {
    loading: loadingMyVideos,
    error: errorMyVideos,
    campaign: myVideos,
  } = userCampaign;
  //console.log("myvideo : ", JSON.stringify(myVideos));
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && !userInfo.defaultWallet) {
      navigate("/welcome");
    } else if (!userInfo) {
      navigate("/signin");
    } else {
      dispatch(userCampaignsList(userInfo));
    }
  }, [navigate, dispatch]);

  return (
    <Box p="20" pt="20">
      <Stack direction="row" justifyContent="space-between">
        <Text color="#000000" fontSize="2xl" fontWeight="semibold" pt="5">
          My Campaign
        </Text>
      </Stack>

      <Stack pt="10" spacing={5}>
        {loadingMyVideos ? (
          <HLoading loading={loadingMyVideos} />
        ) : errorMyVideos ? (
          <MessageBox variant="danger">{errorMyVideos}</MessageBox>
        ) : (
          myVideos.map((eachCampaign: any) => (
            <MySingleCampaign campaign={eachCampaign} key={eachCampaign._id} />
          ))
        )}
      </Stack>
    </Box>
  );
}
