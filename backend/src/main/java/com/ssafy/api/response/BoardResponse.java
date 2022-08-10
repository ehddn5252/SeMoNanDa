package com.ssafy.api.response;

import java.util.Date;

import com.ssafy.db.entity.Board;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("BoardResponse")
public class BoardResponse{
	@ApiModelProperty(name="board UID", example="1")
	int uid;
	@ApiModelProperty(name="users테이블의 uid", example="2")
	int userUid;
	@ApiModelProperty(name="board 카테고리 대분류 번호", example="2")
	int categoryLarge;
	@ApiModelProperty(name="board 카테고리 중분류 번호", example="1")
	int categoryMiddle;
	@ApiModelProperty(name="board 내용", example="이 편지는 영국에서부터 시작된...")
	String content;
	@ApiModelProperty(name="첨부 이미지 url", example="sfamcslax201381")
	String img;
	@ApiModelProperty(name="조회수", example="2")
	int viewCount;
	@ApiModelProperty(name="등록시각", example="2022-07-29 06:38:57")
	Date regTime;
	
	
	
	
	public static BoardResponse of(Integer statusCode, String message, Board board) {
		if (board==null) {
			return null;
		}
		else {
			BoardResponse res = new BoardResponse();
			res.setUid(board.getUid());
			res.setUserUid(board.getUserUid());
			res.setCategoryLarge(board.getCategoryLarge());
			res.setCategoryMiddle(board.getCategoryMiddle());
			res.setContent(board.getContent());
			res.setImg(board.getImg());
			res.setRegTime(board.getRegTime());
			res.setViewCount(board.getViewCount());
			board.getUserUid();
			
			return res;
		}
	}
	
}
