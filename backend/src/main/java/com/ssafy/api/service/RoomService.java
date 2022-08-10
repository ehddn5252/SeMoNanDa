package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.RoomRequest;
import com.ssafy.db.entity.GameConferenceRoom;
import com.ssafy.db.entity.User;

/**
 *	게임 방  관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */

public interface RoomService {
	GameConferenceRoom createRoom(RoomRequest roomRegisterInfo);
	List<GameConferenceRoom> findNormalRoomByRoomTitle(String title);
	List<GameConferenceRoom> findCustomRoomByRoomTitle(String title);
	List<GameConferenceRoom> findRoomByRoomTitle(String title);
	GameConferenceRoom findRoomByUid(int uid);
	void deleteRoomByUid(GameConferenceRoom room);
	List<GameConferenceRoom> findNormalRoomlist();
	List<GameConferenceRoom> findCustomRoomlist();
	GameConferenceRoom updateRoom(GameConferenceRoom room, RoomRequest roomRegisterInfo);
	GameConferenceRoom findRoomByUrl(String url);
	User findUserUidById(String id);
	
	//방 참가 어떻게??
}