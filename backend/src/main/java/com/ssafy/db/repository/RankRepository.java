package com.ssafy.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.db.entity.GameConferenceRoom;
import com.ssafy.db.entity.User;

public interface RankRepository extends JpaRepository<User, Long> {
}
