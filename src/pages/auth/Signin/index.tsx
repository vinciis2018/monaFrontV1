import React, { useState } from "react";

import { SignInModal } from "pages/authPopup/SignInModal";

export function Signin(props: any) {
  const [signinModalShow, setSigninModalShow] = useState<any>(true);

  return (
    <SignInModal
      show={signinModalShow}
      onHide={() => setSigninModalShow(false)}
    />
  );
}
