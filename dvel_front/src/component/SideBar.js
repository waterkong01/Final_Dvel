import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import HomeBeforeLight from "../images/home_before-1.png";
import HomeBeforeDark from "../images/home_before.png";
import HomeAfterLight from "../images/home_after-1.png";
import HomeAfterDark from "../images/home_after.png";

import SearchBeforeLight from "../images/search.png";
import SearchBeforeDark from "../images/search_white.png";
import SearchAfterLight from "../images/search-1.png";
import SearchAfterDark from "../images/search_white 1.png";

import NewsBeforeLight from "../images/news.png";
import NewsBeforeDark from "../images/news-1.png";
import NewsAfterLight from "../images/news 1.png";
import NewsAfterDark from "../images/news_white 1.png";

import AddBeforeLight from "../images/add_thin.png";
import AddBeforeDark from "../images/add_thin_white.png";
import AddAfterLight from "../images/plus3 1.png";
import AddAfterDark from "../images/plus3_gray 1.png";

import AlarmBeforeLight from "../images/like_before-1.png";
import AlarmBeforeDark from "../images/like_before.png";
import AlarmAfterLight from "../images/like_after-1.png";
import AlarmAfterDark from "../images/like_after.png";

import MsgBeforeLight from "../images/message_before-1.png";
import MsgBeforeDark from "../images/message_before.png";
import MsgAfterLight from "../images/message_after-1.png";
import MsgAfterDark from "../images/message_after.png";

import UserBeforeLight from "../images/user_before.png";
import UserBeforeDark from "../images/user_before-1.png";
import UserAfterLight from "../images/user_after.png";
import UserAfterDark from "../images/user_after-1.png";

import {ToggleImg} from "./TopBar";

const SideBarContainer = styled.div`
    width: 80px;
    height: 100%;
    padding: 0 1vw;
    background: ${({ darkMode }) => (darkMode ? "#000" : "#F0F0F0")};
    display: flex;
    gap: 3rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
`

const ToggleImgBig = styled.img`
    width: 40px;
    aspect-ratio: 1 / 1;
`

const SideBar = ({darkMode, setDarkMode}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIcon, setActiveIcon] = useState(null);

    useEffect(() => {
        // 현재 경로를 기준으로 activeIcon 설정
        const pathToIcon = {
            "/home": "home",
            "/search": "search",
            "/news": "news",
            "/add": "add",
            "/alarm": "alarm",
            "/msg": "msg",
            "/user": "user",
        };
        setActiveIcon(pathToIcon[location.pathname]);
    }, [location.pathname]);

    const handleIconClick = (icon, path) => {
        if (activeIcon !== icon) {
            setActiveIcon(icon);
            navigate(path);
        }
    };

    return (
        <SideBarContainer darkMode={darkMode}>
            <ToggleImg
                src={darkMode ? (activeIcon === "home" ? HomeAfterDark : HomeBeforeDark) : (activeIcon === "home" ? HomeAfterLight : HomeBeforeLight)}
                onClick={() => handleIconClick("home", "/home")}
            />
            <ToggleImg
                src={darkMode ? (activeIcon === "search" ? SearchAfterDark : SearchBeforeDark) : (activeIcon === "search" ? SearchAfterLight : SearchBeforeLight)}
                onClick={() => handleIconClick("search", "/search")}
            />
            <ToggleImg
                src={darkMode ? (activeIcon === "news" ? NewsAfterDark : NewsBeforeDark) : (activeIcon === "news" ? NewsAfterLight : NewsBeforeLight)}
                onClick={() => handleIconClick("news", "/news")}
            />
            <ToggleImgBig
                src={darkMode ? (activeIcon === "add" ? AddAfterDark : AddBeforeDark) : (activeIcon === "add" ? AddAfterLight : AddBeforeLight)}
                onClick={() => handleIconClick("add", "/add")}
            />
            <ToggleImg
                src={darkMode ? (activeIcon === "alarm" ? AlarmAfterDark : AlarmBeforeDark) : (activeIcon === "alarm" ? AlarmAfterLight : AlarmBeforeLight)}
                onClick={() => handleIconClick("alarm", "/alarm")}
            />
            <ToggleImg
                src={darkMode ? (activeIcon === "msg" ? MsgAfterDark : MsgBeforeDark) : (activeIcon === "msg" ? MsgAfterLight : MsgBeforeLight)}
                onClick={() => handleIconClick("msg", "/msg")}
            />
            <ToggleImg
                src={darkMode ? (activeIcon === "user" ? UserAfterDark : UserBeforeDark) : (activeIcon === "user" ? UserAfterLight : UserBeforeLight)}
                onClick={() => handleIconClick("user", "/user")}
            />
        </SideBarContainer>
    );
}

export default SideBar;