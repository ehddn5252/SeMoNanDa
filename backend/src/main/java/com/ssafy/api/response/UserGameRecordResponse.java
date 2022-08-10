package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UsergameRecordResponse")
public class UserGameRecordResponse{
	@ApiModelProperty(name="유저 UID", example="1")
	int uid;
	@ApiModelProperty(name="유저 승리 횟수", example="ssafy")
	int winTimes;
	@ApiModelProperty(name="유저 패배 횟수", example="김싸피")
	int loseTimes;;
	@ApiModelProperty(name="유저 랭크포인트", example="100")
    int rankpoint;
    @ApiModelProperty(name="승률", example="싸피")
    float winRate;
    
    /*
    사용자는 개인 페이지에서 개인 전적을 확인할 수 있다.
    1) 게임 전적
    2) 게임 승률
    3) 게임 랭크 포인트 (커스텀 게임 기록 제외)
    4) 전체 순위 및 순위에 따른 티어 (커스텀 게임 기록 제외)
	*/
    
	public static UserGameRecordResponse of(Integer statusCode, String message, User user) {
		if (user==null) {
			return null;
		}
		else {
			UserGameRecordResponse res = new UserGameRecordResponse();
			res.setUid(user.getUid());
			
			return res;
		}
	}
	
}
