import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignInModal } from "pages/authPopup/SignInModal";

export function Signin(props: any) {
  const navigate = useNavigate();

  const [signinModalShow, setSigninModalShow] = useState<any>(false);

  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      navigate("/welcome");
    } else {
      setSigninModalShow(true);
    }
  }, [props?.history, userInfo, navigate]);

  return (
    <SignInModal
      show={signinModalShow}
      onHide={() => setSigninModalShow(false)}
    />
  );
}
