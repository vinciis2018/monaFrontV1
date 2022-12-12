/* eslint-disable no-console */
import { useState } from "react";

import { Box } from "@chakra-ui/react";

import { StartWalletModal } from "pages/onboardingmodal/StartWalletModal";

export function PinSuccess() {
  const [startWalletShow, setStartWalletShow] = useState<any>(true);

  return (
    <Box>
      <StartWalletModal
        show={startWalletShow}
        onHide={() => setStartWalletShow(false)}
        // onClick={handleStartwalletShow}
      />
    </Box>
  );
}
