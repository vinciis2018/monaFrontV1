import React from "react";
import { Modal } from "react-bootstrap";
import {
  Stack,
  IconButton,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  Box,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export function CreateNewCampaign(props: any) {
  const handleAddCampaignName = (event: any) => {
    if (event.which == 13) {
      props.onHide();
      props.openUloadCamaign();
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <Modal.Body>
        <Box bgGradient="linear(to-r, #FFFFFF, rgba(255, 255, 255, 0.6))">
          <Stack align="end" justifyContent="flex-end">
            <IconButton
              bg="none"
              icon={
                <AiOutlineCloseCircle
                  size="40px"
                  fontWeight="10"
                  color="black"
                  onClick={props.onHide}
                />
              }
              aria-label="Close"
            />
          </Stack>
          <Stack pl="20" pr="20">
            <Stack align="center">
              <Text fontSize="xl" fontWeight="semibold" color="#000000">
                Add campaign
              </Text>
            </Stack>
            <FormControl pt="5">
              <FormLabel htmlFor="share">Enter campaign name</FormLabel>
              <InputGroup>
                <Input
                  name="share"
                  id="share"
                  size="lg"
                  onChange={props.setCampaignName}
                  onKeyPress={(e) => handleAddCampaignName(e)}
                />
              </InputGroup>
            </FormControl>
            <Text
              fontSize="lg"
              fontWeight="light"
              color="#000000"
              align="left"
              pt="5"
              type="Button"
            >
              Or add to existing campians
            </Text>
            <Stack
              fontSize="lg"
              fontWeight="semibold"
              color="#000000"
              align="left"
              justifyContent="flex-start"
              pt="5"
              spacing={1}
            >
              <Text type="Button">Pumas Dusshera sales</Text>
              <Text type="Button">Diwali divas campiagn</Text>
              <Text type="Button">Diwali divas campiagn</Text>
            </Stack>
          </Stack>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
