import React, { useState } from "react";
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

export function Actions(props: any) {
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

  return (
    <Box>
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
                  <Tr>
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
                      {convertIntoDateAndTime(video.createdAt)}
                    </Td>
                    <Td
                      isNumeric
                      fontSize="sm"
                      color="#403F49"
                      fontWeight="semibold"
                    >
                      {video.totalNoOfSlots}
                    </Td>
                    <Td fontSize="sm" color="#403F49" fontWeight="semibold">
                      ₹{video.totalNoOfSlots * screen.rentPerSlot}
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
        </Stack>
      </Box>
    </Box>
  );
}
