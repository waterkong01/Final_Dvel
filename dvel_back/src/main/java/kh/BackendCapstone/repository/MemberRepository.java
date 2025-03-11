package kh.BackendCapstone.repository;


import io.lettuce.core.dynamic.annotation.Param;
import kh.BackendCapstone.constant.Authority;
import kh.BackendCapstone.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
	boolean existsByEmail(String email);

	boolean existsByPhone(String phone);


	Optional<Member> findByEmail(String email);

	boolean existsByNickName(String nickName);


	Optional<Member> findByNickName(String nickName);

	Optional<Member> findById(Long id);

	Optional<Member> findByAuthority(Authority authority);
	
	Optional<Member> findEmailByPhone(String phone);
	
	Optional<Member> findByMemberId(Long memberId);
	List<Member> findAllByAuthority(Authority authority);
	List<Member> findAllByUniv_UnivNameContaining(String univName);

	// 채팅 - memberId로 nickName 가져오기
	@Query ("SELECT m.nickName FROM Member m WHERE m.memberId = ?1")
	String getNickNameByMemberId(@Param("memberId") Long memberId);
}