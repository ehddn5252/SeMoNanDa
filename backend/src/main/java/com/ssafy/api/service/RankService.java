package com.ssafy.api.service;

import java.util.List;

import com.ssafy.db.entity.User;

public interface RankService {
	List<User> findUserListAll();
	List<User> findUserListOfWeek();
}
