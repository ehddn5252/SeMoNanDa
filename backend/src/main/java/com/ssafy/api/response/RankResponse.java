package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RankResponse")
public class RankResponse {
	
	//얘는 필요없는듯 삭제?
	
	
	@ApiModelProperty(name = "유저 ID", example = "ssafy")
	String id;

	@ApiModelProperty(name = "유저 닉네임", example = "싸피")
	String nickname;

	@ApiModelProperty(name = "유저 랭크포인트", example = "100")
	int rankpoint;

	@ApiModelProperty(name = "게임 우승 횟수", example = "9")
	int numberOfWins;

	@ApiModelProperty(name = "게임에서 진 횟수", example = "4")
	int numberOfLoses;

	public static RankResponse of(Integer statusCode, String message, User user) {
		if (user == null) {
			return null;
		} else {
			RankResponse res = new RankResponse();
			res.setId(user.getId());
			res.setNickname(user.getNickname());
			res.setRankpoint(user.getRankpoint());
			res.setNumberOfWins(user.getNumberOfWins());
			res.setNumberOfLoses(user.getNumberOfLoses());

			return res;
		}
	}
}
