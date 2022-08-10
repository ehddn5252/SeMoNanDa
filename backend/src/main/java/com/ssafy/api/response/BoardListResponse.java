package com.ssafy.api.response;

import java.util.List;

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
public class BoardListResponse{
	@ApiModelProperty(name="board UID", example="1")
	List<Board> boardList;
	
	
	
	public static BoardListResponse of(Integer statusCode, String message, List<Board> boardList) {
		if (boardList==null) {
			return null;
		}
		else {
			BoardListResponse res = new BoardListResponse();
			res.setBoardList(boardList);
			return res;
		}
	}
	
}
