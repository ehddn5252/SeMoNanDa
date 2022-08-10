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
import com.ssafy.api.response.BoardListResponse;
import com.ssafy.api.response.BoardResponse;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.StatisService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.GameCategory;
import com.ssafy.db.entity.GameCategoryTopic;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.infos.Authority;
import com.ssafy.infos.BoardLargeCategory;
import com.ssafy.infos.BoardMiddleCategory;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

/**
 * 통계 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "통계 API", tags = { "Statis" })
@RestController
@RequestMapping("/api/statis")
public class StatisController {

	@Autowired
	StatisService statisService;

	@PostMapping("/topic")
	@ApiOperation(value = "카테고리 채택률 정보", notes = "<strong>카테고리 채택률을</strong>내림차순으로 반환한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<GameCategory>> getTopic() {
		List<GameCategory> res = statisService.getTopic();
		return ResponseEntity.status(200).body(res);
	}
	@PostMapping("/subject")
	@ApiOperation(value = "주제 승률 정보", notes = "<strong>주제 승률을</strong>내림차순으로 반환한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "게시물 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<GameCategoryTopic>> getSubject() {
		List<GameCategoryTopic> res = statisService.getSubject();
		return ResponseEntity.status(200).body(res);
	}
}
