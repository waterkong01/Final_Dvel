import React, { useContext, useEffect, useState } from "react";
import Commons from "../../util/Common";
import { ChatContext } from "../../context/ChatStore";
import {ChatListBg, ChatListBox, ChatName, ChatRoom, ChatUl} from "../../design/Msg/MsgListDesign";
import ChattingApi from "../../api/ChattingApi";
import {DarkModeContent} from "../../styles/Layout";

const MsgList = ({ setSelectedPage }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const {setRoomId} = useContext(ChatContext);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const {darkMode} = useContext(DarkModeContent);

    // 토큰에서 memberId를 가져오는 로직
    const fetchMemberIdFromToken = async () => {
        try {
            const response = await Commons.getTokenByMemberId();
            const memberId = response.data; // 서버에서 반환한 memberId
            console.log("로그인 한 memberId:", memberId);
            setLoggedInUser(memberId);
            fetchChatRoomsForUser(memberId); // memberId로 채팅방 리스트 가져오기
        } catch (e) {
            console.error("Failed to fetch memberId from token:", e);
        }
    };

    // memberId와 관련된 채팅방 목록 가져오기
    const fetchChatRoomsForUser = async (memberId) => {
        try {
            const rooms = await ChattingApi.getMyChatRoom(memberId);
            console.log("Fetched Chat Rooms for Member:", rooms);
            setChatRooms(rooms);
        } catch (error) {
            console.error("Error Fetching Chat Rooms for Member:", error);
        }
    };

    // 처음 화면이 나타나는 시점에 서버로부터 정보를 가져옴
    useEffect(() => {
        fetchMemberIdFromToken();
    }, []);

    // 채팅방 이동
    const enterChatRoom = (roomId) => {
        console.log("Room ID:", roomId);
        setRoomId(roomId);
        setSelectedPage("chatting");
    };

    return (
        <ChatListBg darkMode={darkMode}>
{/*            <ChatUl>
                {chatRooms.map((room) => (
                    <ChatRoom key={room.roomId} onClick={() => enterChatRoom(room.roomId)}>
                        <ChatName>{room.name}</ChatName>
                    </ChatRoom>
                ))}
            </ChatUl>*/}
            <ChatListBox>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
                <ChatUl>
                    <ChatRoom>
                        <ChatName></ChatName>
                    </ChatRoom>
                </ChatUl>
            </ChatListBox>
        </ChatListBg>
    );
};
export default MsgList;