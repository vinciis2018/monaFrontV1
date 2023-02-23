import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { EmailVerificationModal } from "pages/authPopup/EmailVerificationModal";

export function Signup(props: any) {
  const [emailVerificationShow, setEmailVerificationShow] = useState<any>(true);

  return (
    <Box>
      <EmailVerificationModal
        show={emailVerificationShow}
        onHide={() => setEmailVerificationShow(false)}
      />
    </Box>
  );
}

/*

situate

2.

glimpse

3.

coil

4.

garden

5.

scale

6.

few

7.

rib

8.

twice

9.

flee

10.

cinnamon

11.

gospel

12.

clarify */
