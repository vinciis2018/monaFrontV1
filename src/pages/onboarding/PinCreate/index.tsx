import { useState } from "react";
// hooks

import { Box } from "@chakra-ui/react";

import { PinCreateModal } from "pages/onboardingmodal/PinCreateModal";

export function PinCreate() {
  const [pinCreateModal, setPinCreateModalShow] = useState<any>(true);

  return (
    <Box px="2" pt="20" color="black.500">
      <PinCreateModal
        show={pinCreateModal}
        onHide={() => setPinCreateModalShow(false)}
      />
    </Box>
  );
}
