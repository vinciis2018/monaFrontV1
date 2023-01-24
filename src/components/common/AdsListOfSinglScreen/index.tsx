import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Form from "react-bootstrap/Form";

import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { convertIntoDateAndTime } from "utils/dateAndTime";

export function AdsListOfSinglScreen(props: any) {
  const { videos, rentPerSlot } = props;
  const [checkedItems, setCheckedItems] = useState(
    new Array(videos.length).fill(false)
  );
  const allChecked = checkedItems.every(Boolean);

  const handleall = () => {
    const arr = new Array(videos.length).fill(true);
    setCheckedItems([...arr]);
  };
  const handleSingle = (index: any) => {
    const newArray = [...checkedItems];
    newArray[index] = !newArray[index];
    setCheckedItems([...newArray]);
  };

  return (
    <TableContainer borderRadius="5px" bgColor="#FFFFFF">
      <Table variant="simple" size="lg">
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
          {videos.map((video: any, index: any) => (
            <Tr key={index + 1}>
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
              <Td isNumeric fontSize="sm" color="#403F49" fontWeight="semibold">
                {video.totalNoOfSlots}
              </Td>
              <Td fontSize="sm" color="#403F49" fontWeight="semibold">
                ₹{rentPerSlot * video.totalNoOfSlots}
              </Td>
              {video.paidForSlots ? (
                <Td>
                  <Flex>
                    <BsDot color="#00D615" size="20px" />
                    <Text color="#403F45" fontSize="sm" pl="2">
                      Active
                    </Text>
                  </Flex>
                </Td>
              ) : (
                <Td>
                  <Flex>
                    <BsDot size="20px" color="#E93A03" />
                    <Text color="#403F45" fontSize="sm" pl="2">
                      Pending
                    </Text>
                  </Flex>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
