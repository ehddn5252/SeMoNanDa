package com.ssafy.db.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Board;
import com.ssafy.db.qentity.QBoard;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class BoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;
    
    public Board findBoardByUid(int uid) {
        Board board = jpaQueryFactory.select(qBoard).from(qBoard)
                .where(qBoard.uid.eq(uid)).fetchOne();
        return board;
    }

    public List<Board> findBoardByTitle(String t) {
    	
    	QBoard qBoard= QBoard.board;
    	List<Board> boards = jpaQueryFactory.select(qBoard).from(qBoard)
                .where(qBoard.title.like("%"+t+"%")).fetch();
        return boards;
    }

    public Board findBoardByUserUid(int user_uid) {
    	
    	QBoard qBoard= QBoard.board;
    	Board board = jpaQueryFactory.select(qBoard).from(qBoard)
                .where(qBoard.userUid.eq(user_uid)).fetchOne();
        return board;
    }
}
