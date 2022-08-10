package com.ssafy.db.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.GameConferenceRoom;
import com.ssafy.db.entity.User;
import com.ssafy.db.qentity.QGameConferenceRoom;
import com.ssafy.db.qentity.QUser;

@Repository
public class RoomRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QGameConferenceRoom qRoom = QGameConferenceRoom.gameConferenceRoom;
	QUser quser = QUser.user;

	public GameConferenceRoom findRoomByUid(int uid) {
		GameConferenceRoom room = jpaQueryFactory.select(qRoom).from(qRoom).where(qRoom.uid.eq(uid)).fetchOne();
		return room;

	}

	public List<GameConferenceRoom> findRoomByTitle(String word) {

		QGameConferenceRoom qRoom = QGameConferenceRoom.gameConferenceRoom;
		List<GameConferenceRoom> rooms = jpaQueryFactory.select(qRoom).from(qRoom)
				.where(qRoom.title.like("%" + word + "%")).orderBy(qRoom.startTime.desc()).fetch();
		return rooms;
	}

	public List<GameConferenceRoom> findNormalRoomlist() {
		System.err.println("여기는????????");
		List<GameConferenceRoom> rooms = jpaQueryFactory.select(qRoom).from(qRoom).where(qRoom.normal.eq(true)).orderBy(qRoom.startTime.desc()).fetch();
		System.err.println("쿼리가 이상한가????????");
		return rooms;
	}

	public List<GameConferenceRoom> findCustomRoomlist() {
		List<GameConferenceRoom> rooms = jpaQueryFactory.select(qRoom).from(qRoom).where(qRoom.normal.eq(false))
				.orderBy(qRoom.startTime.desc()).fetch();
		return rooms;
	}

	public List<GameConferenceRoom> findNormalRoomByTitle(String word) {

		QGameConferenceRoom qRoom = QGameConferenceRoom.gameConferenceRoom;
		List<GameConferenceRoom> rooms = jpaQueryFactory.select(qRoom).from(qRoom)
				.where(qRoom.title.like("%" + word + "%")).where(qRoom.normal.eq(true)).orderBy(qRoom.startTime.desc()).fetch();
		return rooms;
	}

	public List<GameConferenceRoom> findCustomRoomByTitle(String word) {

		QGameConferenceRoom qRoom = QGameConferenceRoom.gameConferenceRoom;
		List<GameConferenceRoom> rooms = jpaQueryFactory.select(qRoom).from(qRoom)
				.where(qRoom.title.like("%" + word + "%")).where(qRoom.normal.eq(false)).orderBy(qRoom.startTime.desc()).fetch();
		return rooms;
	}

	public GameConferenceRoom findRoomByUrl(String url) {
		GameConferenceRoom room = jpaQueryFactory.select(qRoom).from(qRoom).where(qRoom.conferenceRoomUrl.eq(url))
				.fetchOne();
		return room;
	}

	public User findUserUidByNickname(String nickname) {
		System.err.println("support, findUserUidByNickname");
		System.err.println(nickname);
		User user = jpaQueryFactory.select(Projections.fields(User.class, quser.uid.as("uid"))).from(quser)
				.where(quser.nickname.eq(nickname)).fetchOne();
		System.err.println("들어오나?");
		System.err.println("user : "+user.toString());
		return user;
	}

//	//게임이 시작 되었는지 확인하는 메소드
//	@Transactional
//	public void gameStart(int gameConferenceRoomUid) {
//		jpaQueryFactory.update(qGameConferenceRoom).set(qGameConferenceRoom.gameStart, true)
//				.where(qGameConferenceRoom.uid.eq(3)).execute();
//		GameConferenceRoom g = jpaQueryFactory.selectFrom(qGameConferenceRoom)
//				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).fetchFirst();
//		System.out.println("UID " + g.getUid() + "번방 게임 시작");
//		System.out.println("방제목: " + g.getTitle());
//	}

}
