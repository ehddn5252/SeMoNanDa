package com.ssafy.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.db.entity.Friend;
import com.ssafy.db.entity.User;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long>{
	
}
