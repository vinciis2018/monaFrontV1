import React, { useEffect } from "react";
import { Box, Text, Stack, Select } from "@chakra-ui/react";
import { AdsInTable } from "components/common";

import { userVideosList } from "Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";

export function CampaignListOfUser() {
  const userVideos = useSelector((state: any) => state.userVideos);
  const {
    loading: loadingMyVideos,
    error: errorMyVideos,
    videos: myVideos,
  } = userVideos;
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
      dispatch(userVideosList(userInfo));
    }
  }, [navigate]);

  return (
    <Box p="20" pt="20">
      <Stack direction="row" justifyContent="space-between">
        <Text color="#000000" fontSize="2xl" fontWeight="semibold">
          My Campaign
        </Text>
        <Select
          height="36px"
          variant="outline"
          borderColor="#797979"
          color="#403F49"
          fontSize="sm"
          width="15%"
          placeholder="Status"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
        </Select>
      </Stack>

      <Stack pt="20">
        {loadingMyVideos ? (
          <HLoading loading={loadingMyVideos} />
        ) : errorMyVideos ? (
          <MessageBox variant="danger">{errorMyVideos}</MessageBox>
        ) : (
          <AdsInTable videos={myVideos} />
        )}
      </Stack>
    </Box>
  );
}
