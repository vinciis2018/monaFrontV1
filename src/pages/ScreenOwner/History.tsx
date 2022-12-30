import { Box, HStack, Stack, Text, Select } from "@chakra-ui/react";
import { AdsInTable } from "components/common";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import HLoading from "components/atoms/HLoading";
// import DateFnsUtils from "@date-io/date-fns"; // choose your lib
// import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
// import {
//   IconButton as MiuiIconButton,
//   InputAdornment,
// } from "@material-ui/core";
// import { AiOutlineCalendar } from "react-icons/ai";

export function History(props: any) {
  const { screenID } = props;
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  // const [startDateHere, setStartDateHere] = React.useState<any>(new Date());
  // const [endDateHere, setEndDateHere] = React.useState<any>(new Date());
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

  useEffect(() => {
    if (screenID) {
      getVideoList(screenID);
    }
  }, [props]);
  return (
    <Box>
      {videoLoading ? (
        <HLoading loading={videoLoading} />
      ) : (
        <Box>
          <Text
            color="#403F49"
            fontSize="lg"
            fontWeight="semibold"
            align="left"
          >
            Screen 1231422
          </Text>
          <Text
            pt="10"
            color="#403F49"
            fontSize="lg"
            fontWeight="bold"
            align="left"
          >
            Filter
          </Text>
          <HStack p="5" boxShadow="xl" mt="5">
            {/* <FormControl py="4" width="100%" align="center" id="startDateHere">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  inputVariant="outlined"
                  disablePast={true}
                  format="dd/MM/yyyy hh:mm"
                  // variant="dialog"
                  label="Select Slot Start Date"
                  value={startDateHere}
                  onChange={setStartDateHere}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MiuiIconButton>
                          <AiOutlineCalendar />
                        </MiuiIconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl> */}
            <Select
              placeholder="From"
              size="lg"
              variant="outline"
              bgColor="#EAEAEA"
              color="#403F49"
              fontSize="sm"
              width="40%"
            ></Select>
            <Select
              placeholder="To"
              size="lg"
              variant="outline"
              bgColor="#EAEAEA"
              color="#403F49"
              fontSize="sm"
              width="40%"
            ></Select>
            <Select
              placeholder="Status"
              size="lg"
              variant="outline"
              bgColor="#EAEAEA"
              color="#403F49"
              fontSize="sm"
              width="40%"
            >
              <option value="option1">All</option>
              <option value="option2">Pending</option>
              <option value="option3">Active</option>
              <option value="option3">Completed</option>
            </Select>
          </HStack>
          <Stack pt="5" boxShadow="xl">
            <AdsInTable videos={videosList} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
