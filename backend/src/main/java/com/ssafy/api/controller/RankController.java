package com.ssafy.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.service.RankService;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "rank", tags = {"rank"})
@RestController
@RequestMapping("api/rank")
public class RankController {
	@Autowired
	RankService rankService;
	
	@GetMapping("/total")
	@ApiOperation(value = "rank 전체 보기", notes = "rank 전체 보기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "rank 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<User>> findUserListAll() {
		List<User> users = rankService.findUserListAll();
		if (users == null) {
			return new ResponseEntity<List<User>>(users, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		}
	}
	
	@GetMapping("/week")
	@ApiOperation(value = "rank 전체 보기", notes = "rank 전체 보기")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "rank 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<List<User>> findUserListOfWeek() {
		List<User> users = rankService.findUserListOfWeek();
		if (users == null) {
			return new ResponseEntity<List<User>>(users, HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<List<User>>(users, HttpStatus.OK);
		}
	}
}
