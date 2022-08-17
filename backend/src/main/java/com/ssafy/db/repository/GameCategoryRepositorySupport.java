package com.ssafy.db.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.GameCategory;
import com.ssafy.db.entity.GameCategoryTopic;
import com.ssafy.db.qentity.QBoard;
import com.ssafy.db.qentity.QFriend;
import com.ssafy.db.qentity.QGameCategory;
import com.ssafy.db.qentity.QGameCategoryTopic;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class GameCategoryRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QGameCategory qGameCategory = QGameCategory.gameCategory;
	QGameCategoryTopic qGameCategoryTopic = QGameCategoryTopic.gameCategoryTopic;

	public List<GameCategory> getTopic() {
		List<GameCategory> res;
		res = jpaQueryFactory.selectFrom(qGameCategory).orderBy(qGameCategory.subjectCount.desc()).fetch();
		return res;
	}

	public List<GameCategoryTopic> getSubject() {
		List<GameCategoryTopic> res;
		res = jpaQueryFactory.selectFrom(qGameCategoryTopic).where(qGameCategoryTopic.uid.ne(22)).fetch();
		return res;
	}

	public List<GameCategoryTopic> getSubjectByCategory(int categoryUID) {
		List<GameCategoryTopic> res;
		if (categoryUID == 11) {
			res = jpaQueryFactory.selectFrom(qGameCategoryTopic).where(qGameCategoryTopic.uid.ne(22)).fetch();
		} else {
			res = jpaQueryFactory.selectFrom(qGameCategoryTopic).where(qGameCategoryTopic.categoryUid.eq(categoryUID))
					.where(qGameCategoryTopic.uid.ne(22)).fetch();
		}
		return res;
	}

	public List<GameCategoryTopic> getSubjectSearch(String search) {
		List<GameCategoryTopic> res;
		res = jpaQueryFactory.selectFrom(qGameCategoryTopic).where(qGameCategoryTopic.uid.ne(22))
				.where(qGameCategoryTopic.answerA.contains(search)
						.or(qGameCategoryTopic.answerB.contains(search).or(qGameCategoryTopic.topic.contains(search))))
				.fetch();
		return res;
	}

}
