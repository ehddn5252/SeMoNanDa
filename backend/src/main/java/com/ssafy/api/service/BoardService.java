package com.ssafy.api.service;

import java.util.List;

import com.ssafy.api.request.BoardRequest;
import com.ssafy.db.entity.Board;

/**
 *	게시판 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface BoardService {
	Board createBoard(BoardRequest boardRegisterInfo);
	Board findBoardByUid(int uid);
	Board updateBoard(Board board, BoardRequest boardRegisterInfo);
	void deleteBoardByUid(Board board);
	Board postBoardByUsersNickname(int uid);
	List<Board> getAllBoard();
	List<Board> findBoardByTitle(String title);
}
