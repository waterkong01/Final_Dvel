// 111
/*
package kh.BackendCapstone.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import kh.BackendCapstone.dto.chat.ChatMsgDto;
import kh.BackendCapstone.dto.chat.ChatRoomResDto;
import kh.BackendCapstone.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
//WebSocketHandler 를 상속받아 WebSocketHandler 를 구현
public class WebSocketHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper; //JSON 문자열로 변환하기 위한 객체
	private final ChatService chatService; // 채팅방 관련 비즈니스 로직을 처리할 서비스
	private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>();
	private final Map<Long, WebSocketSession> sessionMap = new ConcurrentHashMap<>(); // 사용자 ID 기준 세션 관리

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info("웹소켓 연결됨: {}", session.getId());
	}

	@Override
	//클라이언트가 서버로 연결을 시도할 때 호출
	protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
		*/
/*String payload = msg.getPayload();
		log.info("payload : {}", payload);

		ChatMsgDto chatMsg = objectMapper.readValue(payload, ChatMsgDto.class);
		Long senderId = chatMsg.getSenderId();
		Long receiverId = chatMsg.getReceiverId();

		// 기존 세션이 닫혀 있다면 제거
		WebSocketSession existingSession = sessionMap.get(senderId);
		if (existingSession != null && !existingSession.isOpen()) {
			sessionMap.remove(senderId);
			log.info("닫힌 세션 제거: {}", senderId);
		}

		// 현재 사용자 세션 저장
		sessionMap.put(senderId, session);

		// 메시지를 DB에 저장
		chatService.saveMsg(chatMsg.getRoomId(), chatMsg.getSenderId(), chatMsg.getReceiverId(), chatMsg.getNickName(), chatMsg.getMsg(), chatMsg.getProfile());

		// 수신자에게 메시지 전달
		WebSocketSession receiverSession = sessionMap.get(receiverId);
		if (receiverSession != null && receiverSession.isOpen()) {
			receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMsg)));
			log.info("메시지 전송 완료: {} -> {}", senderId, receiverId);
		} else {
			log.warn("수신자 {}의 세션이 존재하지 않음", receiverId);
		}*//*

		try {
			String payload = msg.getPayload();
			log.info("payload : {}", payload);

			ChatMsgDto chatMsg = objectMapper.readValue(payload, ChatMsgDto.class);
			Long senderId = chatMsg.getSenderId();
			Long receiverId = chatMsg.getReceiverId();

			// 현재 사용자 세션 저장 (연결 유지)
			sessionMap.put(senderId, session);

			// 메시지를 DB에 저장
			chatService.saveMsg(chatMsg.getRoomId(), senderId, receiverId, chatMsg.getNickName(), chatMsg.getMsg(), chatMsg.getProfile());

			// 수신자에게 메시지 전달
			WebSocketSession receiverSession = sessionMap.get(receiverId);
			if (receiverSession != null && receiverSession.isOpen()) {
				receiverSession.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMsg)));
				log.info("메시지 전송 완료: {} -> {}", senderId, receiverId);
			} else {
				log.warn("수신자 {}의 세션이 존재하지 않음. 메시지는 저장됨.", receiverId);
			}
		} catch (Exception e) {
			log.error("handleTextMessage에서 에러 발생", e);
		}
	}
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
*/
/*		log.error("연결 해제 이후 동작(채팅방 종료) : {}", session);

		Long memberId = null;
		for (Map.Entry<Long, WebSocketSession> entry : sessionMap.entrySet()) {
			if (entry.getValue().equals(session)) {
				memberId = entry.getKey();
				break;
			}
		}

		if (memberId != null) {
			sessionMap.remove(memberId);
			log.info("사용자 {}의 웹소켓 세션이 종료되었습니다.", memberId);
			chatService.removeSession(memberId);
		}*//*

		try {
			log.info("웹소켓 연결 종료: {}", session.getId());

			// 세션을 가진 사용자 찾기
			Long memberId = sessionMap.entrySet()
					.stream()
					.filter(entry -> entry.getValue().equals(session))
					.map(Map.Entry::getKey)
					.findFirst()
					.orElse(null);

			if (memberId != null) {
				sessionMap.remove(memberId);
				log.info("사용자 {}의 웹소켓 세션이 종료되었습니다.", memberId);
				chatService.removeSession(memberId);
			}
		} catch (Exception e) {
			log.error("afterConnectionClosed에서 에러 발생", e);
		}
	}
}*/




//222
/*
package kh.BackendCapstone.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import kh.BackendCapstone.dto.chat.ChatMsgDto;
import kh.BackendCapstone.dto.chat.ChatRoomResDto;
import kh.BackendCapstone.entity.chat.ChatRoom;
import kh.BackendCapstone.repository.chat.ChatRoomRepository;
import kh.BackendCapstone.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
//WebSocketHandler 를 상속받아 WebSocketHandler 를 구현
public class WebSocketHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper; //JSON 문자열로 변환하기 위한 객체
	private final ChatService chatService; // 채팅방 관련 비즈니스 로직을 처리할 서비스
	private final ChatRoomRepository chatRoomRepository;
	private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>();
	private final Map<WebSocketSession, Long> sessionMemberIdMap = new ConcurrentHashMap<>(); // 사용자 ID 기준 세션 관리

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.warn("웹소켓 연결됨: {}", session.getId());

		// 클라이언트가 WebSocket 연결 시 보내는 메시지를 확인하여 senderId, receiverId, roomId 가져오기
		Map<String, Object> attributes = session.getAttributes();
		String roomId = (String) attributes.get("roomId");
		Long senderId = (Long) attributes.get("senderId");
		Long receiverId = (Long) attributes.get("receiverId");

		log.warn("roomId : {}, senderId : {}, receiverId : {}", roomId, senderId, receiverId);

*/
/*		if (roomId == null || senderId == null || receiverId == null) {
			log.error("WebSocket 연결 중 roomId, senderId 또는 receiverId가 없음. 연결 종료");
			session.close();
			return;
		}*//*


		// 세션 맵에 저장
		sessionRoomIdMap.put(session, roomId);
		sessionMemberIdMap.put(session, senderId); // senderId를 기준으로 세션 관리 (receiverId도 관리하려면 로직 추가 필요)

		// 채팅방 입장 메시지 생성
		ChatMsgDto chatMsg = new ChatMsgDto();
		chatMsg.setType(ChatMsgDto.MsgType.ENTER);
		chatMsg.setRoomId(roomId);
		chatMsg.setSenderId(senderId);
		chatMsg.setReceiverId(receiverId);

		// 채팅 서비스에 세션 추가
		chatService.addSessionAndHandlerEnter(senderId, roomId, session, chatMsg);
		log.info("채팅방 입장 완료: senderId={}, receiverId={}, roomId={}", senderId, receiverId, roomId);
	}

	@Override
	//클라이언트가 서버로 연결을 시도할 때 호출
	protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
		String payload = msg.getPayload();
		log.warn("payload : {}", payload);

		ChatMsgDto chatMsg = objectMapper.readValue(payload, ChatMsgDto.class);

		if (chatMsg.getRoomId() == null) {
			log.error("roomId가 null입니다.");
			return;
		}

		ChatRoom chatRoom = chatRoomRepository.findByRoomId(chatMsg.getRoomId()).orElse(null);
		if (chatRoom == null) {
			log.error("채팅방을 찾을 수 없습니다. roomId: {}", chatMsg.getRoomId());
			return;
		}

		Long senderId = chatRoom.getSender().getMemberId();
		Long receiverId = chatRoom.getReceiver().getMemberId();

		if (senderId == null || receiverId == null) {
			log.error("roomId 또는 senderId 또는 receiverId가 null입니다. roomId: {}, senderId: {}, receiverId: {}",
					chatMsg.getRoomId(), senderId, receiverId);
			return;
		}

		// payload에 senderId와 receiverId 포함하여 다시 전송
		chatMsg.setSenderId(senderId);
		chatMsg.setReceiverId(receiverId);
//		chatMsg.setProfile(chatMsg.getProfile());
		String updatedPayload = objectMapper.writeValueAsString(chatMsg);

		log.warn("Updated payload : {}", updatedPayload);

		for (WebSocketSession s : sessionRoomIdMap.keySet()) {
			s.sendMessage(new TextMessage(updatedPayload));
		}
	}
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//세션과 매핑된 채팅방 ID 가져오기
		try {
			log.error("연결 해제 이후 동작(채팅방 종료) : {}", session);

			String roomId = sessionRoomIdMap.remove(session);
			Long memberId = sessionMemberIdMap.remove(session);

			if (roomId != null && memberId != null) {
				ChatMsgDto chatMsg = new ChatMsgDto();
				chatMsg.setType(ChatMsgDto.MsgType.CLOSE);
				chatService.removeSessionAndHandleExit(memberId, roomId, session, chatMsg);
			}
		} catch (Exception e) {
			log.error("채팅방 종료 에러", e);
		}
	}
}*/





// 333
package kh.BackendCapstone.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import kh.BackendCapstone.dto.chat.ChatMsgDto;
import kh.BackendCapstone.service.chat.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RequiredArgsConstructor
@Slf4j
@Component
//WebSocketHandler 를 상속받아 WebSocketHandler 를 구현
public class WebSocketHandler extends TextWebSocketHandler {
	private final ObjectMapper objectMapper; //JSON 문자열로 변환하기 위한 객체
	private final ChatService chatService; // 채팅방 관련 비즈니스 로직을 처리할 서비스
	private final Map<WebSocketSession, String> sessionRoomIdMap = new ConcurrentHashMap<>();
	@Override
	//클라이언트가 서버로 연결을 시도할 때 호출
	protected void handleTextMessage(WebSocketSession session, TextMessage msg) throws Exception {
		try {
			String payload = msg.getPayload();
			log.warn("payload : {}", payload);
			// JSON 문자열을 ChatMessageDto 변환 작업
			ChatMsgDto chatMsg = objectMapper.readValue(payload, ChatMsgDto.class);
			String roomId = chatMsg.getRoomId();
			log.warn("roomId : {}", roomId);

			if (chatMsg.getType() == ChatMsgDto.MsgType.ENTER) {
				sessionRoomIdMap.put(session, chatMsg.getRoomId());
				chatService.addSessionAndHandlerEnter(roomId, session, chatMsg);
			} else if (chatMsg.getType() == ChatMsgDto.MsgType.CLOSE) {
				chatService.removeSessionAndHandleExit(roomId, session, chatMsg);
			} else if (chatMsg.getType() == ChatMsgDto.MsgType.TALK) {
				chatService.sendMsgToAll(roomId, chatMsg);
				chatService.saveMsg(chatMsg.getRoomId(), chatMsg.getMemberId(), chatMsg.getSendMember(), chatMsg.getMsg(), chatMsg.getProfile());
			}
		} catch (Exception e) {
			log.error("handleTextMessage에서 에러 발생", e);
		}
	}
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		//세션과 매핑된 채팅방 ID 가져오기
		try {
			log.error("연결 해제 이후 동작(채팅방 종료) : {}", session);
			String roomId = sessionRoomIdMap.remove(session);

			if (roomId != null) {
				ChatMsgDto chatMsg = new ChatMsgDto();
				chatMsg.setType(ChatMsgDto.MsgType.CLOSE);
				chatService.removeSessionAndHandleExit(roomId, session, chatMsg);
			}
		} catch (Exception e) {
			log.error("채팅방 종료 에러", e);
		}
	}
}