import { React, useEffect } from "react";
import Cookies from "universal-cookie";
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
    // const getUserToken=(code)=>{
    //     getAccessToken(code).then(response=>{
    //         let accssToken = response.data.access_token
    //         console.log(accssToken);
    //         getUserInfo(accssToken);
    //     });
    // }
    let memberParam = getParameter("code");
    
    useEffect( () => {
        return () => {
             dispatch(kakaoLogInDB(memberParam));
      }}, []);
    

  const setJwtCookie = (token) => {
    const cookies = new Cookies();
    let date = new Date();
    date.setMinutes(date.getMinutes() + 20);
    cookies.set("code", token, { path: "/" });
  };

  //   React.useEffect(() => {
  //     setToken();
  //   }, []);


    // React.useEffect(() => {
    //     setToken();
    // }, []);


    return (
        <div></div>
    );

};
export default OauthFilter;
