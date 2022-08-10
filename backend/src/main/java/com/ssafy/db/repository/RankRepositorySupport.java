package com.ssafy.db.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.User;
import com.ssafy.db.qentity.QUser;

@Repository
public class RankRepositorySupport {
	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QUser quser = QUser.user;

	public List<User> findUserListAll() {
		List<User> users = jpaQueryFactory
				.select(Projections.fields(com.ssafy.db.entity.User.class, quser.id.as("id"),
						quser.nickname.as("nickname"), quser.rankpoint.as("rankpoint"),
						quser.numberOfWins.as("numberOfWins"), quser.numberOfWins.as("numberOfLoses")))
				.from(quser).orderBy(quser.rankpoint.desc()).fetch();
		return users;

	}

	public List<User> findUserListOfWeek() {
		return null;
	}
}
