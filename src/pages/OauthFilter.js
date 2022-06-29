import React from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserInfo } from "../shared/KakaoOauth";

const OauthFilter = () => {
  const navigate = useNavigate();
  const getParameter = (key) => {
    return new URLSearchParams(window.location.search).get(key);
  };
  // const getUserToken=(code)=>{
  //     getAccessToken(code).then(response=>{
  //         let accssToken = response.data.access_token
  //         console.log(accssToken);
  //         getUserInfo(accssToken);
  //     });
  // }
  let memberParam = getParameter("code");

  const setJwtCookie = (token) => {
    const cookies = new Cookies();
    let date = new Date();
    date.setMinutes(date.getMinutes() + 20);
    cookies.set("code", token, { path: "/" });
  };
  const setToken = () => {
    console.log("check parameter");
    // if (memberParam !== null) {
    //     new Promise(() => {
    //         setJwtCookie(memberParam);
    //     }).then(() => {
    //        console.log('set cookie')
    //     });
    // }
    // navigate('/');
    // getUserToken(memberParam);
  };

  React.useEffect(() => {
    setToken();
  }, []);

  return <div></div>;
};
export default OauthFilter;
