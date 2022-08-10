package com.ssafy.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.GameRecord;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import com.ssafy.infos.Authority;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserRepositorySupport userRepositorySupport;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		
		user.setId(userRegisterInfo.getId());
		user.setName(userRegisterInfo.getName());
		user.setNickname(userRegisterInfo.getNickname());
		user.setPhonenumber(userRegisterInfo.getPhonenumber());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));
		user.setAuthority(Authority.GENERAL.toString());
		return userRepository.save(user);
	}
	

	@Override
	public User getUserById(String userId) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
		User user = userRepository.findById(userId);
		return user;
	}
	
	@Override
	public User getUserByNickname(String nickname) {
		//디비에 유저 정보 조회(nickname을 통한 조회).
		User user = userRepositorySupport.findUserByNickname(nickname);
		return user;
	}										
	
	/**
	  * @Method Name : getGameRecordByNickname
	  * @작성일 : 2022. 8. 1
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 : 닉내임으로 user uid를 찾고 user uid를 통해 
	  * @param nickname: 찾을 닉네임
	  * @return
	  */
	@Override
	public User getGameRecordByNickname(String nickname) {
		
		User user = userRepositorySupport.findUserByNickname(nickname);
		System.out.println("hihi");
		if (user==null) return null;
		// rank point
		int rankPoint = user.getRankpoint();
		List<GameRecord> gameRecordList = userRepositorySupport.getGameRecordListByUid(user.getNickname());
		// 계산식
		int winCount = 0;
		for(int i = 0;i<gameRecordList.size();++i) {
			GameRecord gameRecord = gameRecordList.get(i);
			if (gameRecord.isWinner()==true) winCount+=1;
		}
		int loseCount = gameRecordList.size()-winCount;
		float winRate = winCount/gameRecordList.size();
		System.out.println("winRate");
		System.out.println(winRate);
		return null;
	}


	/**
	  * @Method Name : getUserByUid
	  * @작성일 : 2022. 8. 2
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 :
	  * @param uid
	  * @return
	  */
	
	@Override
	public User getUserByUid(int uid) {
		return userRepository.findByUid(uid);
	}


	/**
	  * @Method Name : updateUser
	  * @작성일 : 2022. 8. 4
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 :
	  * @param userRegisterInfo
	  * @return
	  */
	
	@Override
	public User updateUser(User user, UserRegisterPostReq userRegisterInfo) {
		user.setName(userRegisterInfo.getName());
		user.setPhonenumber(userRegisterInfo.getPhonenumber());
		user.setDescription(userRegisterInfo.getDescription());
		return userRepository.save(user);
		
	}
	
	@Override
	public User updateUserPassword(User user, UserRegisterPostReq userRegisterInfo) {
		user.setPassword(userRegisterInfo.getNewPassword());
		return userRepository.save(user);
	}
	
}
