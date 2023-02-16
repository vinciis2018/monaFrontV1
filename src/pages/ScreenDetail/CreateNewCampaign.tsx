import React, { useEffect, useState } from "react";
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
  Button,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import MessageBox from "components/atoms/MessageBox";

export function CreateNewCampaign(props: any) {
  const [error, setError] = useState<any>("");
  // const handleAddCampaignName = (event: any, click: any) => {
  //   if (props.campaignName) {
  //     if (event.which == 13 || click) {
  //       props.onHide();
  //       props.openUploadCampaignModal();
  //     }
  //   }
  // };

  const handleCreateCampaignThroughVideo = () => {
    if (props.campaignName) {
      props.onHide();
      props.openUploadCampaignModal();
    } else {
      setError("Please Enter Campaign name!");
      setTimeout(() => {
        setError("");
        console.log("error = ", error);
      }, 2000);
    }
  };
  const handleCreateCampaignThroughImages = () => {
    if (props.campaignName) {
      props.onHide();
      props.openUploadCampaignThrougnImages();
    } else {
      setError("Please Enter Campaign name!");
      setTimeout(() => {
        setError("");
        console.log("error = ", error);
      }, 2000);
    }
  };

  useEffect(() => {}, [error]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
      dialogClassName="modal-90w"
    >
      <Modal.Body>
        <Box>
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
          {error && <MessageBox variant="danger">{error}</MessageBox>}
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
                  py="1"
                  value={props.campaignName}
                  onChange={props.setCampaignName}
                  // onKeyPress={(e) => handleAddCampaignName(e, false)}
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
            <Flex gap={4}>
              <Button p="3" onClick={handleCreateCampaignThroughImages}>
                Create campaign through Images
              </Button>
              <Button p="3" onClick={handleCreateCampaignThroughVideo}>
                Create campaign through Video
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
