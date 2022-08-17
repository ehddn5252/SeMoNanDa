package com.ssafy.api.service;

import java.util.List;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.BoardRequest;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.GameCategory;
import com.ssafy.db.entity.GameCategoryTopic;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.BoardRepositorySupport;
import com.ssafy.db.repository.GameCategoryRepositorySupport;
/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
import com.ssafy.db.repository.RoomRepositorySupport;

/**

  * @FileName : StatisServiceImpl.java
  * @Project : ssafy-web-project
  * @Date : 2022. 8. 3 
  * @작성자 : 박찬호
  * @변경이력 :
  * @프로그램 설명 :
  */
@Service("StatisService")
public class StatisServiceImpl implements StatisService {

	@Autowired
	GameCategoryRepositorySupport gameCategoryRepositorySupport;
	/**
	  * @Method Name : getTopic
	  * @작성일 : 2022. 8. 3
	  * @작성자 : 박찬호
	  * @변경이력 : 
	
	  * @Method 설명 : 
	  * @param 
	  * @return
	  */
	
	@Override
	public List<GameCategory> getTopic() {
		List<GameCategory> res = gameCategoryRepositorySupport.getTopic();
		return res;
	}
	@Override
	public List<GameCategoryTopic> getSubject() {
		List<GameCategoryTopic> res = gameCategoryRepositorySupport.getSubject();
		return res;
	}
	@Override
	public List<GameCategoryTopic> getSubjectByCategory(int categoryUID) {
		List<GameCategoryTopic> res = gameCategoryRepositorySupport.getSubjectByCategory(categoryUID);
		return res;
	}
	@Override
	public List<GameCategoryTopic> getSubjectSearch(String search) {
		List<GameCategoryTopic> res = gameCategoryRepositorySupport.getSubjectSearch(search);
		return res;
	}
}
