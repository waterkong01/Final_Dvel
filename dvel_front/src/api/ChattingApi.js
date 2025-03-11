import axios from "axios";
const Capstone = "http://localhost:8111";

// return 값을 반환할때 객체를 풀어서 반환하지말고 component 개별적으로 객체를 풀어서 사용할 것
const ChattingApi = {

  // 채팅방 생성하기
  chatCreate: async (senderId, receiverId) => {
    const chat = { senderId, receiverId };
    console.log("채팅방 생성 요청 : ", chat); // 서버로 보낼 데이터를 확인
    try {
      const response = await axios.post(Capstone + '/chat/room', chat);
      return response.data;
    } catch (error) {
      console.error("채팅방 생성 오류:", error.response ? error.response.data : error.message);
      throw new Error("채팅방을 생성할 수 없습니다.");
    }
    // return await axios.post(Capstone + "/chat/new", chat);
  },

  // 참여중인 채팅방 목록 가져오기
  getMyChatRoom: async (memberId) => {
    try {
      if (!memberId) {
        console.error("memberId가 undefined입니다.");
        return;
      }
      console.log("memberId 값 확인:", memberId);
      const response = await axios.get(Capstone + `/chat/myRooms/${memberId}`);
      return response.data;
    } catch (error) {
      console.error("채팅방 조회 오류:", error.response ? error.response.data : error.message);
      throw new Error("채팅방을 찾을 수 없습니다.");
    }
  },

  // 채팅방 정보 가져오기
  chatDetail: async (roomId) => {
    try {
      const response = await axios.get(Capstone + `/chat/room/${roomId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat room details:", error);
      throw error;
    }
  },
/*  // 해당 채팅방의 이전 채팅 내역 가져오기(참여이후)
  chatHistory: async (roomId, memberId) => {
    console.log(roomId);
    console.log(memberId);
    return await axios.get(Capstone + `/chat/message/${roomId}/${memberId}`);
  },*/
  // 해당 채팅방의 이전 채팅 내역 가져오기
  chatHistory: async (roomId) => {
    console.log(roomId);
    return await axios.get(Capstone + `/chat/message/${roomId}`);
  },

  // 토큰에서 닉네임 가져오기
  getNickName: async () => {
    const token = localStorage.getItem("accessToken");
    const response = await axios.get(Capstone + `/member/nickName`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ 헤더에 토큰 추가
        },
    });
    return response;
  },

  getNickNameByMemberId: async (memberId) => {
    const response = await axios.get(Capstone + `/member/nickName/${memberId}`);
    console.log(response);
    return response;
  },

  // 채팅방 참여 인원 확인
  cntRoomMember: async (roomId) => {
    try {
      const response = await axios.get(Capstone + `/chat/cntRoomMember/${roomId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
      throw new Error("Failed to fetch chat rooms.");
    }
  },
}

export default ChattingApi;
