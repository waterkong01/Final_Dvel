package kh.BackendCapstone.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ReviewReqDto {

    private Long memberId;
    private Long fileBoardId;
    private String reviewContent;
}
