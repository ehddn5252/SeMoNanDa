package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.GameConferenceRoom;
import com.ssafy.db.entity.User;

@Repository
public interface RoomRepository  extends JpaRepository<GameConferenceRoom, Long>{
	 GameConferenceRoom findRoomByUid(int uid);
	 GameConferenceRoom findRoomByTitleLike(String title);
}
