import { Box, Flex, Stack, Text, Select, FormControl } from "@chakra-ui/react";
import { AdsInTable } from "components/common";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import HLoading from "components/atoms/HLoading";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {
  IconButton as MiuiIconButton,
  InputAdornment,
} from "@material-ui/core";
import { AiOutlineDown } from "react-icons/ai";

export function History(props: any) {
  const { screenID } = props;
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);
  const [startDateHere, setStartDateHere] = useState<any>(new Date());
  const [endDateHere, setEndDateHere] = useState<any>(new Date());
  const [status, setStatus] = useState<any>("All");
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
          <Flex
            p="5"
            boxShadow="2xl"
            mt="5"
            align="center"
            justifyContent="flex-start"
            bgColor="#FFFFFF"
            borderRadius="8px"
          >
            <Stack>
              <FormControl align="center" id="startDateHere" height="39px">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="outlined"
                    disablePast={true}
                    format="dd/MM/yyyy hh:mm"
                    variant="dialog"
                    value={startDateHere}
                    onChange={setStartDateHere}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <MiuiIconButton>
                            <AiOutlineDown />
                          </MiuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Stack>
            <Stack pl="10">
              <FormControl
                width="100%"
                align="center"
                id="endDateHere"
                height="39px"
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    inputVariant="outlined"
                    disablePast={true}
                    format="dd/MM/yyyy hh:mm"
                    variant="dialog"
                    value={endDateHere}
                    onChange={setEndDateHere}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <MiuiIconButton>
                            <AiOutlineDown />
                          </MiuiIconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>
            </Stack>

            <Stack pl="10">
              <Select
                size="lg"
                variant="outline"
                value={status}
                color="#403F49"
                fontSize="sm"
                height="60px"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </Select>
            </Stack>
          </Flex>
          <Stack pt="5" boxShadow="xl" borderRadius="8px">
            <AdsInTable videos={videosList} />
          </Stack>
        </Box>
      )}
    </Box>
  );
}
