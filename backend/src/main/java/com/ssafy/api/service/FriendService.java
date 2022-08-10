package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.FriendRequest;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;

public interface FriendService {
	User findUserUidByNickname(String nickname);
//	List<User> findUserUidByNickname(String nickname1, String nickname2);
	Friend AddFriend(FriendRequest friendInfo);
	
	//친구 신청 받은 목록(내 팔로워보기)
	List<User> findReceiverFriendList(String nickname);
	//내가 친구 신청 건 목록(내 팔로잉 보기)
	List<User> findRequesterFriendList(String nickname);
}
