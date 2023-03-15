import React, { useEffect, useState } from "react";
import {
  Stack,
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
import { convertIntoDateAndTime } from "utils/dateAndTime";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteCampaign } from "Actions/campaignAction";
import HLoading from "components/atoms/HLoading";
import MessageBox from "components/atoms/MessageBox";
import { CAMPAIGN_DELETE_RESET } from "Constants/campaignConstants";

export function Actions(props: any) {
  const dispatch = useDispatch<any>();
  const { screen, videosList } = props;
  const [checkedItems, setCheckedItems] = useState(
    new Array(videosList.length).fill(false)
  );
  const allChecked = checkedItems.every(Boolean);

  const handleall = () => {
    const arr = new Array(videosList.length).fill(true);
    setCheckedItems([...arr]);
  };
  const handleSingle = (index: any) => {
    const newArray = [...checkedItems];
    newArray[index] = !newArray[index];
    setCheckedItems([...newArray]);
  };
  const campaignDelete = useSelector((state: any) => state.campaignDelete);
  const {
    loading: loadingCampaignDelete,
    error: errorCampaignDelete,
    success: deleteCampaignStatus,
  } = campaignDelete;

  if (deleteCampaignStatus) {
    window.location.reload();
  }
  if (errorCampaignDelete) {
    setTimeout(() => {
      dispatch({
        type: CAMPAIGN_DELETE_RESET,
      });
    }, 2000);
  }

  const handleDeteteCampaign = (campaignId: any) => {
    console.log("handleDeteteCampaign called for id : ", campaignId);
    dispatch(deleteCampaign(campaignId));
  };
  useEffect(() => {}, [dispatch]);

  return (
    <Box>
      {loadingCampaignDelete ? (
        <HLoading loading={loadingCampaignDelete} />
      ) : null}
      {errorCampaignDelete ? (
        <MessageBox variant="danger">{errorCampaignDelete}</MessageBox>
      ) : null}
      <Box>
        <Text color="#403F49" fontSize="lg" fontWeight="semibold" align="left">
          {screen.name}
        </Text>
        <Stack pt="10">
          <TableContainer borderRadius="5px" bgColor="#FFFFFF">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>
                    <Flex>
                      <Form.Check
                        aria-label="option 1"
                        onChange={handleall}
                        checked={allChecked}
                      />
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
                  <Tr key={index}>
                    <Td>
                      <Flex>
                        <Form.Check
                          aria-label="option 1"
                          onChange={() => handleSingle(index)}
                          checked={checkedItems[index]}
                        />
                        <Text color=" #403F49 " fontSize="sm" pl="5">
                          {video.brandName}
                        </Text>
                      </Flex>
                    </Td>
                    <Td color="#575757" fontSize="sm">
                      {convertIntoDateAndTime(video.startDate)}
                    </Td>
                    <Td
                      isNumeric
                      fontSize="sm"
                      color="#403F49"
                      fontWeight="semibold"
                    >
                      {video.totalSlotBooked}
                    </Td>
                    <Td fontSize="sm" color="#403F49" fontWeight="semibold">
                      ₹{video.rentPerSlot * video.totalSlotBooked}
                    </Td>
                    <Td>
                      <Select
                        height="36px"
                        variant="outline"
                        borderColor="#0EBCF5"
                        bgColor="#FFFFFF"
                        color="#403F49"
                        fontSize="sm"
                        onChange={(e) => {
                          const value = e.target.value;
                          console.log(e.target.value);
                          if (value === "delete") {
                            handleDeteteCampaign(video._id);
                          }
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="accept">Accept</option>
                        <option value="delete">Delete</option>
                      </Select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Box>
    </Box>
  );
}
