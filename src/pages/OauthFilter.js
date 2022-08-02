import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../shared/KakaoOauth";
import { kakaoLogInDB } from "../redux/modules/users";
import { useDispatch } from "react-redux";

const OauthFilter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  let memberParam = getParameter("code");

  useEffect(() => {
    return () => {
      dispatch(kakaoLogInDB(memberParam));
    };
  }, []);

  return <div></div>;
};
export default OauthFilter;
