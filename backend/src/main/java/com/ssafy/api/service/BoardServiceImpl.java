package com.ssafy.api.service;

import java.util.List;
import java.sql.Timestamp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.BoardRequest;
import com.ssafy.db.entity.Board;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.BoardRepositorySupport;
/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */

/**

  * @FileName : BoardServiceImpl.java
  * @Project : ssafy-web-project
  * @Date : 2022. 7. 30 
  * @작성자 : 김동우
  * @변경이력 :
  * @프로그램 설명 :
  */
@Service("boardService")
public class BoardServiceImpl implements BoardService {
	@Autowired
	BoardRepository boardRepository;
	
	@Autowired
	BoardRepositorySupport boardRepositorySupport;

	/**
	  * @Method Name : createBoard
	  * @작성일 : 2022. 7. 30
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 : 
	  * @param boardRegisterInfo
	  * @return
	  */
	@Override
	public Board createBoard(BoardRequest boardRegisterInfo) {
		
		Board board = new Board();
		
		board.setCategoryLarge(boardRegisterInfo.getCategoryLarge());
		board.setCategoryMiddle(boardRegisterInfo.getCategoryMiddle());
		board.setContent(boardRegisterInfo.getContent());
		board.setImg(boardRegisterInfo.getImg());
		board.setTitle(boardRegisterInfo.getTitle());
		board.setUserUid(boardRegisterInfo.getUserUid());
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		board.setRegTime(timestamp);
		board.setViewCount(0);

		return boardRepository.save(board);
	}
	
	

	/**
	  * @Method Name : findBoardByUid
	  * @작성일 : 2022. 7. 30
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 :
	  * @param uid
	  * @return
	  */
	@Override
	public Board findBoardByUid(int uid) {
		Board board = new Board();
		board = boardRepositorySupport.findBoardByUid(uid);
		return board;
	}
	

	
	/**
	  * @Method Name : updateBoard
	  * @작성일 : 2022. 7. 30
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 : save 함수를 통해 업데이트한다.
	  * find by Id를 통해 
	  * @param boardRegisterInfo
	  * @return
	  */
	@Override
	public Board updateBoard(Board board, BoardRequest boardRegisterInfo) {
		
		board.setUid(boardRegisterInfo.getUid());
		// 카테고리 변경할 수 있으면 cATEGORY 바꾸는 부분을 넣는다.
		//board.setCategoryLarge(boardRegisterInfo.getCategoryLarge());			
		//board.setCategoryMiddle(boardRegisterInfo.getCategoryMiddle());
		board.setTitle(boardRegisterInfo.getTitle());
		board.setContent(boardRegisterInfo.getContent());
		if (boardRegisterInfo.getImg()!=null) {
			board.setImg(boardRegisterInfo.getImg());			
		}
		//board.setUserUid(boardRegisterInfo.getUserUid());
		board.setRegTime(boardRegisterInfo.getRegTime());
		//board.setViewCount(boardRegisterInfo.getViewCount());
		return boardRepository.save(board);
	}

	/**
	  * @Method Name : deleteBoardByUid
	  * @작성일 : 2022. 8. 1
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 :
	  * @param board
	  */
	@Override
	public void deleteBoardByUid(Board board) {
		boardRepository.delete(board);
	}

	@Override
	public Board postBoardByUsersNickname(int uid) {
		// TODO Auto-generated method stub
		return null;
	}
	
	/**
	  * @Method Name : getAllBoard
	  * @작성일 : 2022. 7. 30
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 :
	  * @return
	  */
	
	@Override
	public List<Board> getAllBoard() {
		// TODO Auto-generated method stub
		return boardRepository.findAll();
	}

	/**
	  * @Method Name : findBoardByTitle
	  * @작성일 : 2022. 8. 1
	  * @작성자 : 김동우
	  * @변경이력 : 
	
	  * @Method 설명 : board 의 이름으로 찾는다.
	  * @param board
	  * @return
	  */
	
	@Override
	public List<Board> findBoardByTitle(String title) {
		// TODO Auto-generated method stub
		return boardRepositorySupport.findBoardByTitle(title);
	}
}
