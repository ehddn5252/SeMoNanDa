package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.BoardRequest;
import com.ssafy.api.response.BoardResponse;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.infos.Authority;
import com.ssafy.infos.BoardLargeCategory;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "News API", tags = { "News" })
@RestController
@RequestMapping("/api/news")
public class NewsController {

	@Autowired
	BoardService boardService;

	@Autowired
	UserService userService;

	@PostMapping("/create")
	@ApiOperation(value = "board 글등록", notes = "<strong>글 정보</strong>를 통해 게시글을 추가한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> createBoard(
			@RequestBody @ApiParam(value = "글 정보", required = true) BoardRequest boardInfo) {
		boardInfo.setCategoryLarge(BoardLargeCategory.NEWS.ordinal());
		User user = userService.getUserByUid(boardInfo.getUserUid());

		if (user.getAuthority().equals(Authority.MANAGER.toString())) {
			boardService.createBoard(boardInfo);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		} else return ResponseEntity.status(403).body(BaseResponseBody.of(403, "you dont have Authority to make News"));
	}

	@GetMapping("")
	@ApiOperation(value = "board 검색 정보", notes = "<strong>board 를 uid로 검색한 정보</strong>")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BoardResponse> findBoardByUid(
			@ApiParam(value = "board uid", required = true) @RequestParam("uid") int uid) {

		Board board = boardService.findBoardByUid(uid);
		if (board == null) {
			return ResponseEntity.status(400).body(BoardResponse.of(400, "Bad responce", board));
		} else {
			return ResponseEntity.status(200).body(BoardResponse.of(200, "Success", board));
		}
	}

	@PutMapping("")
	@ApiOperation(value = "board 글 변경 내용", notes = "<strong>board 를 uid로 검색한 정보</strong>.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BoardResponse> updateBoardByUid(
			@RequestBody @ApiParam(value = "글 정보", required = true) BoardRequest boardInfo) {

		User user = userService.getUserByUid(boardInfo.getUserUid());
		if (user.getAuthority().equals(Authority.MANAGER.toString())) {
			Board board = boardService.findBoardByUid(boardInfo.getUid());
			if (board != null) {
				boardService.updateBoard(board, boardInfo);
				return ResponseEntity.status(200).body(BoardResponse.of(200, "Success", board));
			} else
				return ResponseEntity.status(400).body(BoardResponse.of(400, "bad request", board));
		} else
			return ResponseEntity.status(403).body(BoardResponse.of(403, "forbidden ", null));
	}

	@DeleteMapping("")
	@ApiOperation(value = "board 글 삭제", notes = "<strong>board 를 uid로 검색한 게시글 삭제</strong>.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> deleteBoardByUid(
			@ApiParam(value = "board uid", required = true) @RequestParam("uid") int uid) {
		Board board = boardService.findBoardByUid(uid);
		
		if (board == null) 
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "bad request"));
		
		User user = userService.getUserByUid(board.getUserUid());
		
		// board uid로 uid 찾음
		if (user.getAuthority().equals(Authority.MANAGER.toString())) {
			boardService.deleteBoardByUid(board);
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		} else 
			return ResponseEntity.status(403).body(BaseResponseBody.of(403, "your authority can`t delete board"));
	}

	@GetMapping("/list")
	@ApiOperation(value = "board list 정보", notes = "<strong>전체 board 목록</strong>")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<Board>> getBoardList() {
		List<Board> boards = boardService.getAllBoard();
		if (boards == null) {
			return new ResponseEntity<List<Board>>(boards, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<Board>>(boards, HttpStatus.OK);
		}
	}

}
