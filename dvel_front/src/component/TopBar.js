import styled from "styled-components";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import LogoLight from "../images/글씨 (검정).png";
import LogoDark from "../images/글씨 (라이트그레이).png";
import SunLight from "../images/sun_colored.png";
import SunDark from "../images/sun_white.png";
import MoonLight from "../images/moon.png";
import MoonDark from "../images/moon_colored_white.png";
import MenuLight from "../images/menu_dark.png";
import MenuDark from "../images/menu_light.png"
import MenuCloseLight from "../images/close 1.png";
import MenuCloseDark from "../images/close 2.png"
import ModalLoginPage from "../pages/auth/BeforeLoginModal";
import {setLoginModalOpen, setModalOpen, setSignupModalOpen} from "../context/redux/ModalReducer";
import {useNavigate} from "react-router-dom";

const TopBarContainer = styled.div`
    width: 100%;
    //max-width: 1920px;
    height: 80px;
    padding: 0 1vw;
    background: ${({ darkMode }) => (darkMode ? "#000" : "#F0F0F0")};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
`

const LogoImg = styled.img`
    width: 65px;
    aspect-ratio: 1 / 1;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
`

const BgChangeBtn = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`

export const ToggleImg = styled.img`
    width: 30px;
    aspect-ratio: 1 / 1;
`

const MenuImg = styled.img`
    width: 45px;
`

const TopBar = ({darkMode, setDarkMode}) => {
    const navigate = useNavigate();
    const [activeIcon, setActiveIcon] = useState(null);
    const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);
    const isSignupModalOpen = useSelector((state) => state.modal.isSignupModalOpen);
    const isModalOpen = useSelector((state) => state.modal.isModalOpen);
    const dispatch = useDispatch();


    const toggleDarkMode = () => {
        if (!darkMode) {
            setDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    };
    const toggleLightMode = () => {
        if (darkMode) {
            setDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    };
    const handleIconClick = (icon) => {
        if (activeIcon === icon) {
            setActiveIcon(null);
        } else {
            setActiveIcon(icon);
        }
    };

    const handleImageClick = () => {
        dispatch(setModalOpen(!isModalOpen)); // 모달 열기
    };

    const closeModal = () => {
        dispatch(setModalOpen(false));
    };

    const closeLoginModal = () => {
        dispatch(setLoginModalOpen(false));
    };

    const closeSignupModal = () => {
        dispatch(setSignupModalOpen(false));
    };

    const handleModalLinkClick = (action) => {
        if (action === "login") {
            dispatch(setModalOpen(false));
            dispatch(setLoginModalOpen(true));
        } else if (action === "signup") {
            dispatch(setModalOpen(false));
            dispatch(setSignupModalOpen(true));
        }/* else if (action === "logout") {
            dispatch(logout())
            dispatch(setModalOpen(false)); // 모달 닫기
            setReject({message: "로그아웃 했습니다.", active: true});
        } else if (action === "member") {
            navigate("/Member"); // 마이페이지 이동
            dispatch(setModalOpen(false)); // 모달 닫기
        }*/
    };

    return (
        <TopBarContainer darkMode={darkMode}>
            <LogoImg
                src={darkMode ? LogoDark : LogoLight}
                onClick={() => navigate("/")}
            />
            <Right>
                <BgChangeBtn>
                    <ToggleImg
                        src={darkMode ? SunDark : SunLight}
                        onClick={darkMode ? toggleLightMode : null}
                    />
                    <ToggleImg
                        src={darkMode ? MoonDark : MoonLight}
                        onClick={!darkMode ? toggleDarkMode : null}
                    />
                </BgChangeBtn>
                <MenuImg
                    src={darkMode ? (activeIcon === "menu" ? MenuCloseDark : MenuDark) : (activeIcon === "menu" ? MenuCloseLight : MenuLight)}
                    onClick={() => {
                        handleIconClick("menu")
                        handleImageClick()
                    }}
                />
                <ModalLoginPage
                    darkMode={darkMode}
                    isOpen={isModalOpen}
                    closeModal={() => dispatch(setModalOpen(false))}
                />
            </Right>
        </TopBarContainer>
    );
}

export default TopBar;