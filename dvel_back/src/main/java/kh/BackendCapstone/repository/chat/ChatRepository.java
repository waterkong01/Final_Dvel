package kh.BackendCapstone.repository.chat;

import kh.BackendCapstone.entity.chat.Chat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository <Chat, String> {
    @Query(value = "SELECT * FROM chat WHERE room_id = ?1 ORDER BY sent_at ASC LIMIT 50", nativeQuery = true)
    List<Chat> findRecentMsg(String roomId);
    Page<Chat> findAllByOrderByChatId(Pageable pageable);
    Optional<Chat> findByChatId(Long chatId);

/*    @Query(value = """
        SELECT c.* FROM chat c
        JOIN chat_member cm ON c.room_id = cm.room_id
        WHERE c.room_id = ?1 
        AND cm.member_id = ?2
        AND c.sent_at >= cm.join_at
        ORDER BY c.sent_at ASC 
        LIMIT 50
        """, nativeQuery = true)
    List<Chat> findRecentMsg(String roomId, Long memberId);*/
}
