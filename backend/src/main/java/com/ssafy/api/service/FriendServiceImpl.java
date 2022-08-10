package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.FriendRequest;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.FriendRepository;
import com.ssafy.db.repository.FriendRepositorySupport;

@Service("friendService")
public class FriendServiceImpl implements FriendService {
	@Autowired
	FriendRepository friendRepository;

	@Autowired
	FriendRepositorySupport friendRepositorySupport;

	@Override
	public User findUserUidByNickname(String nickname) {
		System.err.println("여긴 오나");
		return friendRepositorySupport.findUserUidByNickname(nickname);
	}

//	@Override
//	public List<User> findUserUidByNickname(String nickname1, String nickname2) {
//		return friendRepositorySupport.findUserUidByNickname(nickname1, nickname2);
//	}

	@Override
	public Friend AddFriend(FriendRequest friendInfo) {
		Friend friend = new Friend();
		int FriendReceiverUid = friendRepositorySupport.findUserUidByNickname(friendInfo.getFriendReceiverNickname())
				.getUid();
		int FriendRequesterUid = friendRepositorySupport.findUserUidByNickname(friendInfo.getFriendRequesterNickname())
				.getUid();

		friend.setFriendReceiverUid(FriendReceiverUid);
		friend.setFriendRequesterUid(FriendRequesterUid);
		return friendRepository.save(friend);
	}


//	@Override
//	public List<Friend> findReceiverFriendList(String nickname) {
//		int uid = friendRepositorySupport.findUserUidByNickname(nickname).getUid();
//		System.err.println(uid);
//		return friendRepositorySupport.findReceiverFriendList(uid);
//	}


	@Override
	public List<User> findReceiverFriendList(String nickname) {
		int uid = friendRepositorySupport.findUserUidByNickname(nickname).getUid();
		List<Friend> friends = friendRepositorySupport.findReceiverFriendListUid(uid);
		
		return  friendRepositorySupport.findReceiverFriendList(friends);
	}

	@Override
	public List<User> findRequesterFriendList(String nickname) {
		int uid = friendRepositorySupport.findUserUidByNickname(nickname).getUid();
		List<Friend> friends = friendRepositorySupport.findRequesterFriendListUid(uid);
		
		return  friendRepositorySupport.findRequesterFriendList(friends);
	}
}
