package com.ssafy.db.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.GameRecord;
import com.ssafy.db.entity.User;
import com.ssafy.db.qentity.QGameRecord;
import com.ssafy.db.qentity.QUser;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;
    
    QGameRecord qGameRecord = QGameRecord.gameRecord;
    
    public User findUserById(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.id.eq(userId)).fetchOne();
        if(user == null) return null;
        return user;
    }
    
    public User findUserByNickname(String nickname) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.nickname.eq(nickname)).fetchOne();

        if(user == null) return null;
        return user;
    }
    public List<GameRecord> getGameRecordListByUid(String uid) {
        List<GameRecord> gameRecord = (List<GameRecord>) jpaQueryFactory.select(qGameRecord).from(qGameRecord).where(qUser.uid.eq(qGameRecord.userUid)).fetchAll();

        return gameRecord;

    }
}
