import styled from "styled-components";
import React, {useContext, useEffect, useState} from "react";
import AuthApi from "../api/AuthApi";
import {useDispatch, useSelector} from "react-redux";
import {logout, setAccessToken, setRefreshToken, setRole} from "../context/redux/PersistentReducer";
import TopBar from "../component/TopBar";
import MobileTopBar from "../component/MobileTopBar";
import SideBar from "../component/SideBar";
import GlobalStyle from "./GlobalStyle";
import {Outlet} from "react-router-dom";
import {createContext} from "react";

const Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  width: 100%;
  height: 80px;
  position: relative;
  z-index: 1000;
`;

const PC = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Mobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const DarkModeContent = createContext();

const Layout = () => {
  // 임시로 옵셔널 체이닝 사용, persistent가 없어도 레어 없이 실행됨
  const accessToken = useSelector((state) => state.persistent?.accessToken);
  const refreshToken = useSelector((state) => state.persistent?.refreshToken);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUserStatus = async () => {
      try{
        console.log("유저정보 패치")
        const rsp = await AuthApi.IsLogin();
        if(rsp)
        {
          console.log(rsp);
          dispatch(setRole(rsp.data))
          return
        }
        dispatch(logout())
      } catch (error) {
        console.log(error);
        dispatch(logout())
      }
    }
    fetchUserStatus();
  }, [dispatch, accessToken, refreshToken]);

  const [darkMode, setDarkMode] = useState(() => {
    // return document.documentElement.classList.contains("dark");
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <DarkModeContent.Provider value={{darkMode, setDarkMode}}>
      <GlobalStyle darkMode={darkMode} />
      <Background darkMode={darkMode}>
        <Header>
          <PC>
            <TopBar setDarkMode={setDarkMode} darkMode={darkMode}/>
            <SideBar setDarkMode={setDarkMode} darkMode={darkMode}/>
          </PC>
          {/*        <Mobile>
          <MobileTopBar/>
        </Mobile>*/}
        </Header>
        <main className="body">
          <Outlet />
        </main>
      </Background>
    </DarkModeContent.Provider>
  );
};

export default Layout;
