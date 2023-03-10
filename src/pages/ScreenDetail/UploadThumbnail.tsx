import React, { useState } from "react";
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
  Image,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAnimation } from "framer-motion";
import { getFileData } from "services/utils";
import HLoading from "components/atoms/HLoading";

export function UploadThumbnail(props: any) {
  const controls = useAnimation();

  const [isUploading, setIsUploading] = useState(false);
  const [screenImage, setScreenImage] = useState<any>();
  const [selectedMediaThumbnail, setSelectedMediaThumbnail] = useState<any>("");

  let hiddenInput: any = null;
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  async function handlePhotoSelect(file: any) {
    setIsUploading(true);
    const fileThumbnail = URL.createObjectURL(file);
    const [dataBuffer] = await getFileData(fileThumbnail);
    props.setThumbnailCid(dataBuffer);
    setSelectedMediaThumbnail(fileThumbnail);
    props.setIsOldThumbnail(false);
    setIsUploading(false);
  }
  const handleSelectMediaThumbnail = (thumbnail: any) => {
    props.setThumbnailCid(thumbnail.split("/")[4]);
    setSelectedMediaThumbnail(thumbnail);
  };

  const handleAddToCart = (e: any) => {
    props.onHide();
    props.videoUploadHandler(e);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Body>
        <Box bgColor="#FFFFFF">
          {isUploading ? (
            <HLoading loading={isUploading} />
          ) : (
            <Box bgColor="#FFFFFF">
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
              <Stack p="5">
                <Stack align="center">
                  <Text fontSize="xl" fontWeight="semibold" color="#000000">
                    Add campaign Thumbnail
                  </Text>
                </Stack>
                <FormControl pt="5">
                  <FormLabel htmlFor="share" fontSize="lg">
                    Upload content
                  </FormLabel>
                  <InputGroup>
                    <Box
                      height="90px"
                      width="100%"
                      border="1px"
                      align="center"
                      justifyContent="center"
                      type="Button"
                      isLoading={isUploading}
                      loadingText="Uploading..."
                      onClick={() => hiddenInput.click()}
                    >
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        color="#000000"
                        p="8"
                      >
                        Drag & Drop{" "}
                      </Text>
                      <Input
                        hidden
                        type="file"
                        ref={(el) => (hiddenInput = el)}
                        // accept="image/png, image/jpeg"
                        onDragEnter={startAnimation}
                        onDragLeave={stopAnimation}
                        onChange={(e: any) =>
                          handlePhotoSelect(e.target.files[0])
                        }
                      />
                    </Box>
                  </InputGroup>
                </FormControl>
                {selectedMediaThumbnail ? (
                  <Image
                    src={selectedMediaThumbnail}
                    alt=""
                    width="50%"
                    height="50%"
                  ></Image>
                ) : null}
                <Text
                  fontSize="lg"
                  fontWeight="light"
                  color="#000000"
                  align="left"
                  pt="5"
                  type="Button"
                >
                  Or select content
                </Text>
                <Stack pt="5">
                  <SimpleGrid columns={[1, null, 3]} spacing={3}>
                    {props?.medias?.map((media: any) => (
                      <Stack key={media._id} borderRadius="lg">
                        <Image
                          src={media.thumbnail}
                          alt=""
                          width="100%"
                          height="100%"
                          onClick={() =>
                            handleSelectMediaThumbnail(media.thumbnail)
                          }
                        ></Image>
                      </Stack>
                    ))}
                  </SimpleGrid>
                </Stack>
                <Stack pt="10">
                  <Button
                    variant="outline"
                    borderColor="#000000"
                    border="2px"
                    color="#D7380E"
                    fontSize="lg"
                    fontWeight="semiBold"
                    width="40%"
                    p="2"
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      </Modal.Body>
    </Modal>
  );
}
