package com.ssafy.db.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;
import com.ssafy.db.qentity.QFriend;
import com.ssafy.db.qentity.QUser;

@Repository
public class FriendRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QUser quser = QUser.user;


	public User findUserUidByNickname(String nickname) {
		User user = jpaQueryFactory.select(Projections.fields(User.class, quser.uid.as("uid"))).from(quser)
				.where(quser.nickname.eq(nickname)).fetchOne();
		return user;
	}
 
//	public List<User> findUserUidByNickname(String nickname1, String nickname2) {
//	System.err.println("여기는?");
//	System.err.println(nickname1+" , "+nickname2);
//	List<User> users = jpaQueryFactory
//			.select(quser).from(quser)
//			.where(quser.nickname.eq(nickname1).or(quser.nickname.eq(nickname2))).fetch();
//	System.err.println("여기는???");
//	return users;
//
//}

	public List<Friend> findReceiverFriendListUid(int uid) {
		QFriend qfriend = QFriend.friend;
		List<Friend> friends = jpaQueryFactory.select(qfriend).from(qfriend).where(qfriend.friendReceiverUid.eq(uid))
				.fetch();
		return friends;
	}

	public List<User> findReceiverFriendList(List<Friend> friends) {
		List<User> users = new ArrayList<User>();
		for (int i = 0; i < friends.size(); i++) {
			System.err.println(friends.get(i).toString());
			int uid = friends.get(i).getFriendRequesterUid();
			users.add(jpaQueryFactory.select(Projections.fields(User.class, quser.nickname.as("nickname"))).from(quser)
					.where(quser.uid.eq(uid)).fetchOne());
		}

		return users;
	}
	
	public List<Friend> findRequesterFriendListUid(int uid) {
		QFriend qfriend = QFriend.friend;
		List<Friend> friends = jpaQueryFactory.select(qfriend).from(qfriend).where(qfriend.friendRequesterUid.eq(uid))
				.fetch();
		return friends;
	}
	
	public List<User> findRequesterFriendList(List<Friend> friends) {
		List<User> users = new ArrayList<User>();
		for (int i = 0; i < friends.size(); i++) {
			System.err.println(friends.get(i).toString());
			int uid = friends.get(i).getFriendReceiverUid();
			users.add(jpaQueryFactory.select(Projections.fields(User.class, quser.nickname.as("nickname"))).from(quser)
					.where(quser.uid.eq(uid)).fetchOne());
		}

		return users;
	}
}
