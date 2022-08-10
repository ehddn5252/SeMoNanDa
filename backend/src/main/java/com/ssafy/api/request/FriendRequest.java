package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("FriendRequest")
public class FriendRequest {
	@ApiModelProperty(name = "친구 신청자 uid", example = "1")
	int friendRequesterUid;

	@ApiModelProperty(name = "친구 신청받은 사람 uid", example = "5")
	int friendReceiverUid;
	
	@ApiModelProperty(name = "친구 신청자 닉네임", example = "ssafy1")
	String friendRequesterNickname;

	@ApiModelProperty(name = "친구 신청받은 사람 닉네임", example = "ssafy2")
	String friendReceiverNickname;
}
