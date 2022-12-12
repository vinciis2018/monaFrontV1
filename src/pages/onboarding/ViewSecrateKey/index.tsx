import React, { useState } from "react";
import { ViewSecrateKeyModal } from "pages/onboardingmodal/ViewSecrateKeyModal";

import { Box } from "@chakra-ui/react";

export function ViewSecrateKey() {
  const [viewSecrateKeyShow, setviewSecrateKeyShow] = useState<any>(true);

  return (
    <Box>
      <ViewSecrateKeyModal
        show={viewSecrateKeyShow}
        onHide={() => setviewSecrateKeyShow(false)}
      />
    </Box>
  );
}
