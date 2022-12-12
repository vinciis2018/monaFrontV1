import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { EmailVerificationModal } from "pages/authPopup/EmailVerificationModal";

export function Signup(props: any) {
  const navigate = useNavigate();
  const userSignin = useSelector((state: any) => state.userSignin);
  const [emailVerificationShow, setEmailVerificationShow] = useState<any>(true);
  const { userInfo, loading, error } = userSignin;

  // const redirect = props?.location?.search.split("=")[1]
  //   ? props?.location?.search.split("=")[1]
  //   : "/welcome";

  // useEffect(() => {
  //   if (userInfo) {
  //     if (userInfo.defaultWallet) {
  //       navigate(redirect);
  //     } else {
  //       navigate("/welcome");
  //     }
  //   } else {
  //     setEmailVerificationShow(true);
  //   }
  // }, [props?.history, redirect, userInfo, navigate]);

  return (
    <Box>
      <EmailVerificationModal
        show={emailVerificationShow}
        onHide={() => setEmailVerificationShow(false)}
      />
    </Box>
  );
}
