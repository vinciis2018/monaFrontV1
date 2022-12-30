import React, { useState, useEffect } from "react";
import {
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Box,
  Select,
} from "@chakra-ui/react";
import Axios from "axios";
import { convertIntoDateAndTime } from "utils/dateAndTime";
import HLoading from "components/atoms/HLoading";

export function Actions(props: any) {
  const { screenID } = props;
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const [videosList, setVideosList] = useState<any>([]);
  const [videosListError, setVideosListError] = useState<any>([]);
  const [videoLoading, setVideoLoading] = useState<any>(true);

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
          <TableContainer borderRadius="5px" bgColor="#FFFFFF">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Flex>
                      <Checkbox
                        borderColor="#202020"
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={(e) =>
                          setCheckedItems([e.target.checked, e.target.checked])
                        }
                      ></Checkbox>
                      <Text pl="5">Brand</Text>
                    </Flex>
                  </Th>
                  <Th>Start date</Th>
                  <Th isNumeric>Total no of slots</Th>
                  <Th>Total charge</Th>
                  <Th>Status</Th>
                </Tr>
              </Thead>
              <Tbody>
                {videosList.map((video: any, index: any) => (
                  <Tr>
                    <Td>
                      <Flex>
                        <Checkbox
                          isChecked={checkedItems[index]}
                          onChange={(e) =>
                            setCheckedItems([e.target.checked, checkedItems[1]])
                          }
                        ></Checkbox>
                        <Text color=" #403F49 " fontSize="sm" pl="5">
                          {video.brandName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color="#575757" fontSize="sm">
                      {convertIntoDateAndTime(video.createdAt)}
                    </Td>
                    <Td
                      isNumeric
                      fontSize="sm"
                      color="#403F49"
                      fontWeight="semibold"
                    >
                      2226
                    </Td>
                    <Td fontSize="sm" color="#403F49" fontWeight="semibold">
                      ₹2056
                    </Td>
                    <Td>
                      <Select
                        height="36px"
                        variant="outline"
                        borderColor="#0EBCF5"
                        bgColor="#FFFFFF"
                        color="#403F49"
                        fontSize="sm"
                      >
                        <option value="option2">Pending</option>
                        <option value="option3">Accept</option>
                        <option value="option3">Delete</option>
                      </Select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}
