package kh.BackendCapstone.dto.chat;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMsgDto {
    public enum MsgType {
        ENTER, TALK, CLOSE
    }
    private MsgType type;
    private Long id;
    private String roomId;
    private Long memberId;
    private String profile;
    private String nickName;
    private String sendMember;
    private String msg;
    private LocalDateTime regDate;
}