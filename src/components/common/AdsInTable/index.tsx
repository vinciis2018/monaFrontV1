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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsDot } from "react-icons/bs";
import { convertIntoDateAndTime } from "utils/dateAndTime";

export function AdsInTable(props: any) {
  const { videos } = props;
  const [checkedItems, setCheckedItems] = useState([false, false]);
  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <TableContainer borderRadius="5px" bgColor="#FFFFFF">
      <Table variant="simple" size="lg">
        <Thead>
          <Tr>
            <Th>
              <Flex>
                <Checkbox
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
          {videos.map((video: any, index: any) => (
            <Tr key={index + 1}>
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
              <Td isNumeric fontSize="sm" color="#403F49" fontWeight="semibold">
                2226
              </Td>
              <Td fontSize="sm" color="#403F49" fontWeight="semibold">
                ₹2056
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
