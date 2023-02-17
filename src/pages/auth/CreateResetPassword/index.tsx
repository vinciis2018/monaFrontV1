import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import { CreateAndResetPassword } from "pages/authPopup/CreateAndResetPassword";

export function CreateResetPassword(props: any) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<any>("");
  const [createAndResetPasswordShow, setCreateAndResetPasswordShow] =
    useState(true);

  const userSignup = useSelector((state: any) => state.userSignup);
  const { userInfo } = userSignup;

  const dispatch = useDispatch<any>();

  useEffect(() => {
    const email = window.location.pathname.split("/")[2];
    setEmail(email);
  }, [dispatch, navigate, userInfo]);

  return (
    <Box p="10%" pl="25%" width="100%">
      <CreateAndResetPassword
        show={createAndResetPasswordShow}
        onHide={() => setCreateAndResetPasswordShow(false)}
        email={email}
      />
    </Box>
  );
}
