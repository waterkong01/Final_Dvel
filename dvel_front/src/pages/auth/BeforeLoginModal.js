import React from "react";
import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
    }
    to {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px; /* 컨텐츠 높이에 맞게 조정 */
    }
`;

const slideUp = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
        max-height: 200px;
    }
    to {
        opacity: 0;
        transform: translateY(-10px);
        max-height: 0;
    }
`;

// 모달 컨텐츠
const ModalContent = styled.div`
    position: fixed;
    top: 80px;
    right: 0;
    //background-color: #f0f0f0;
    background: ${({ darkMode }) => (darkMode ? "#000" : "#F0F0F0")};
    padding: 10px;
    border-radius: 0 0 10px 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    width: 230px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //gap: 1.5rem;
    animation: ${({ isOpen }) => (isOpen ? slideUp : slideDown)} 0.3s ease-in-out forwards;
    & {
        color: ${({ darkMode }) => (darkMode ? "#F0F0F0" : "#000")};
    }
`;

// 텍스트 링크 스타일링
const ModalTextLink = styled.div`
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    width: 100%;
    padding: 15px;
    border-radius: 10px;
    &:hover {
        background: ${({ darkMode }) => (darkMode ? "#363636" : "#dbdbdb")};
    }
`;

const ModalLoginPage = ({ isOpen, closeModal, handleModalLinkClick, darkMode }) => {
    // 모달이 열리지 않은 경우 아무것도 렌더링하지 않음
    if (!isOpen) return null;

    return (
        <ModalContent darkMode={darkMode}>
            <ModalTextLink darkMode={darkMode}>
                회원가입
            </ModalTextLink>
            <ModalTextLink darkMode={darkMode}>
                로그인
            </ModalTextLink>
        </ModalContent>
    );
};

export default ModalLoginPage;
