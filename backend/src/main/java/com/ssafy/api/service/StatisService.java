package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.BoardRequest;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.GameCategory;
import com.ssafy.db.entity.GameCategoryTopic;

/**
 *	통계 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface StatisService {

	List<GameCategory> getTopic();

	List<GameCategoryTopic> getSubject();

	List<GameCategoryTopic> getSubjectByCategory(int categoryUID);

	List<GameCategoryTopic> getSubjectSearch(String search);
}
