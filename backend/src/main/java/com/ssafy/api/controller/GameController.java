package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRequest;
import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.GameCategoryTopicsRes;
import com.ssafy.api.response.PlayerRes;
import com.ssafy.api.response.TopicsWinnerRes;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserResponse;
import com.ssafy.api.service.GameService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.common.util.JwtTokenUtil;
import com.ssafy.db.entity.GameCategoryTopic;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepositorySupport;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;


@Api(value = "게임 API", tags = {"Game"})
@RestController
@RequestMapping("/api/game")
public class GameController { 
	
	@Autowired
	GameService gameService;
	
	@GetMapping("/common/player-info")
	@ApiOperation(value = "플레이어 정보 조회", notes = "플레이어의 <strong>아이디</strong>를 통해 플레이어의 정보를 리턴한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<PlayerRes> getPlayerInfo(
			@RequestParam("userID") @ApiParam(value="플레이어 아이디", required = true) String userId) {

		Player player = gameService.getPlayerByUserId(userId);
		return ResponseEntity.status(200).body(PlayerRes.of(player));
	}
	
	@PostMapping("/common/ready")
	@ApiOperation(value = "플레이어 준비 상태 변경", notes = "플레이어의 <strong>아이디</strong>를 통해 플레이어의 준비상태를 변경한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> playerReady(
			@RequestParam("userID") @ApiParam(value="플레이어 아이디", required = true) String userId) {

		gameService.changePlayerReady(userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/common/game-start")
	@ApiOperation(value = "게임 시작", notes = "게임 컨퍼런스 룸이 <strong>게임 중</strong>상태로 전환된다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> gameStart(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.gameStart(gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/common/penalty")
	@ApiOperation(value = "플레이어 제한", notes = "해당 아이디의 플레이어의 <strong>제한 여부(0:스피커, 1:카메라, 2:음성변조)</strong>를 변경한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> changePenalty(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid,
			@RequestParam("userID") @ApiParam(value="플레이어의 user ID", required = true) String userID, 
			@RequestParam("penalty") @ApiParam(value="제한 종류(0:스피커, 1:카메라, 2:음성변조)", required = true) int penalty) {

		gameService.changePenalty(gameConferenceRoomUid, userID, penalty);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/normal/random-king")
	@ApiOperation(value = "랜덤 왕 선정", notes = "해당 게임에서 <strong>랜덤왕을 한 번도 해본 적 없는</strong>플레이어 중 왕을 선정한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> randomKing(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.makeRandomKing(gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/normal/random-team")
	@ApiOperation(value = "랜덤 팀 배정", notes = "왕을 제외한  플레이어들에게 <strong>랜덤으로 팀을</strong>배정한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> randomTeam(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.makeRandomTeam(gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/normal/round-start")
	@ApiOperation(value = "라운드 시작", notes = "왕으로 선정된 플레이어의 goldfinch 등 플레이어들의 라운드 게임변수를 초기화하고 랜덤 주제를 리턴한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<TopicsWinnerRes> getRoundStart(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		TopicsWinnerRes res = gameService.getRoundStart(gameConferenceRoomUid);
		return ResponseEntity.status(200).body(res);
	}
	
	@PostMapping("/normal/round-end")
	@ApiOperation(value = "라운드 끝", notes = "승리팀에게 금화를 분배하고 다음 턴의 왕을 선정한다. 왕으로 세번 째 선정된 플레이어가 있다면 리턴한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> getRoundEnd(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid,
			@RequestParam("winTeam") @ApiParam(value="승리팀 정보", required = true) String winTeam) {

		gameService.getRoundEnd(gameConferenceRoomUid, winTeam);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
	@PostMapping("/normal/game-end")
	@ApiOperation(value = "normal 게임 종료", notes = "normal 게임을 종료한다. 1. 게임 방의 game-start 상태를 false로 바꾼다. 2. total_gold_finch 대로 점수를 배분한다.3. game_records에 게임 기록을 추가한다.4. 모든 플레이어의 게임 정보를 초기화한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> normalGameEnd(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid,
			@RequestParam("userId") @ApiParam(value="승리한 플레이어의 userId", required = true) String userId) {

		gameService.normalGameEnd(gameConferenceRoomUid, userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	@PostMapping("/custom/game-end")
	@ApiOperation(value = "custom 게임 종료", notes = "custom 게임을 종료한다. 게임 방의 game-start 상태를 false로 바꾼다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> customGameEnd(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.customGameEnd(gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	@PostMapping("/common/accustion")
	@ApiOperation(value = "플레이어 신고", notes = "플레이어가 다른 플레이어를 신고한 내용을 신고사유와 함께 저장한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> accusation(
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid,
			@RequestParam("attackerUid") @ApiParam(value="신고 당한 플레이어의 userUid", required = true) int attackerUid,
			@RequestParam("reporterUid") @ApiParam(value="신고한 플레이어의 userUid", required = true) int reporterUid,
			@RequestParam("accusationUid") @ApiParam(value="accustion의 userUid", required = true) int accusationUid) {

		gameService.accusation(gameConferenceRoomUid, attackerUid, reporterUid, accusationUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	@PostMapping("/common/join")
	@ApiOperation(value = "방 입장", notes = "유저 아이디와 컨퍼런스 룸의 UID를 통해 방에 입장한다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> join(
			@RequestParam("userId") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) String userId,
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.join(userId, gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	@PostMapping("/common/quit")
	@ApiOperation(value = "방 나가기", notes = "유저 아이디와 컨퍼런스 룸의 UID를 통해 방에서 나간다.") 
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<? extends BaseResponseBody> quit(
			@RequestParam("userId") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) String userId,
			@RequestParam("gameConferenceRoomUid") @ApiParam(value="게임 컨퍼런스룸 Uid 정보", required = true) int gameConferenceRoomUid) {

		gameService.quit(userId, gameConferenceRoomUid);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}
	
}
