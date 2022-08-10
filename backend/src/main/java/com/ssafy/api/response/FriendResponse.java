package com.ssafy.api.response;

import com.ssafy.db.entity.Friend;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("friendResponse")
public class FriendResponse {
	@ApiModelProperty(name = "친구 신청자 uid", example = "1")
	int friendRequesterUid;

	@ApiModelProperty(name = "친구 신청받은 사람 uid", example = "5")
	int friendReceiverUid;

//	@ApiModelProperty(name = "친구 신청자 닉네임", example = "ssafy1")
//	String friendRequesterNickname;
//
//	@ApiModelProperty(name = "친구 신청받은 사람 닉네임", example = "ssafy2")
//	String friendReceiverNickname;

	public static FriendResponse of(Integer statusCode, String message, Friend friend) {
		if (friend == null) {
			return null;
		} else {
			FriendResponse res = new FriendResponse();
			res.setFriendReceiverUid(friend.getFriendReceiverUid());
			res.setFriendRequesterUid(friend.getFriendRequesterUid());
			return res;
		}
	}
}
