package com.ssafy.api.service;

import java.util.Optional;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	
	User createUser(UserRegisterPostReq userRegisterInfo);
	User updateUser(User user,UserRegisterPostReq userRegisterInfo);
	User updateUserPassword(User user, UserRegisterPostReq userRegisterInfo);

	User getUserById(String userId);
	User getUserByUid(int uid);
	User getUserByNickname(String nickname);
	User getGameRecordByNickname(String nickname);
}
