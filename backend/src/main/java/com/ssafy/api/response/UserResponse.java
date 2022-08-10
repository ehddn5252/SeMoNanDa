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
@ApiModel("UserResponse")
public class UserResponse{
	@ApiModelProperty(name="유저 UID", example="1")
	int uid;
	@ApiModelProperty(name="유저 ID", example="ssafy")
	String id;
	@ApiModelProperty(name="유저 이름", example="김싸피")
	String name;
	@ApiModelProperty(name="유저 비밀번호", example="1234")
    String password;
	@ApiModelProperty(name="유저 전화번호(띄어쓰기 없이 11자)", example="01012345678")
    String phonenumber;
	@ApiModelProperty(name="유저 랭크포인트", example="100")
    int rankpoint;
    @ApiModelProperty(name="유저 닉네임", example="싸피")
    String nickname;
    @ApiModelProperty(name="유저 이미지 주소", example="/res/...")
    String img;
    @ApiModelProperty(name="유저 승리 횟수",example="3")
    int numberOfWins;

    @ApiModelProperty(name="유저 패배 횟수",example="3")
    int numberOfLoses;

    @ApiModelProperty(name="유저 권한(GENERAL 또는 MANAGER) 대문자로 적어줘야 한다.",example="GENERAL")
    String authority;
    
    @ApiModelProperty(name="유저 한줄소개(100자 이내)", example="난 나야")
    String description;
	
	public static UserResponse of(Integer statusCode, String message, User user) {
		if (user==null) {
			return null;
		}
		else {
			UserResponse res = new UserResponse();
			res.setUid(user.getUid());
			res.setId(user.getId());
			res.setName(user.getName());
			res.setPassword(user.getPassword());
			res.setPhonenumber(user.getPhonenumber());
			res.setRankpoint(user.getRankpoint());
			res.setNickname(user.getNickname());
			res.setImg(user.getImg());
			res.setDescription(user.getDescription());
			res.setNumberOfWins(user.getNumberOfWins());
			res.setNumberOfLoses(user.getNumberOfLoses());
			res.setAuthority(user.getAuthority());
			return res;
		}
	}
}
