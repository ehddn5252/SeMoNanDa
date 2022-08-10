package com.ssafy.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.response.UserLoginPostRes;
import com.ssafy.api.response.UserResponse;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import springfox.documentation.annotations.ApiIgnore;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = { "User" })
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/signin")
	@ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>를 통해 회원가입 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> register(
			@RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
		// 임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
		userService.createUser(registerInfo);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/me")
	@ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<UserResponse> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저
		 * 식별. 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access
		 * Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String id = userDetails.getUsername();
		User user = userService.getUserById(id);

		return ResponseEntity.status(200).body(UserResponse.of(200, "user_info 호출", user));
	}

	@GetMapping("/id-info")
	@ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디가 DB에 있는 지 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> idOverlapCheck(
			@ApiParam(value = "아이디 정보", required = true) @RequestParam("user_id") String id) {

		User user = userService.getUserById(id);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)

		if (user == null) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("중복이 없습니다. 성공");
			return ResponseEntity.ok(UserResponse.of(200, "Success", null));
		} else {
			System.out.println("중복 아이디가 있습니다. 실패");
			return ResponseEntity.status(409).body(UserResponse.of(409, "중복된 아이디가 있습니다.", user));
		}

//		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	@GetMapping("/user-info")
	@ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디가 DB에 있는 지 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> getUserInfo(
			@ApiParam(value = "아이디 정보", required = true) @RequestParam("id") String id) {

		User user = userService.getUserById(id);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)

		if (user == null) {
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("해당 아이디에 맞는 user가 없습니다. 실패");
			return ResponseEntity.ok(UserResponse.of(404, "failed", null));
		} else {
			System.out.println("검색 성공");
			return ResponseEntity.status(200).body(UserResponse.of(200, "중복된 아이디가 있습니다.", user));
		}

//		return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Invalid Password", null));
	}

	@GetMapping("/nickname-info")
	@ApiOperation(value = "아이디 중복 검사", notes = "<strong>아이디가 DB에 있는 지 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> nicknameOverlapCheck(
			@ApiParam(value = "넥네임 정보", required = true) @RequestParam("nickname") String nickname) {
		User user = userService.getUserByNickname(nickname);
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (user == null) {
			System.out.println(user);
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("중복이 없습니다. 성공");
			return ResponseEntity.ok(UserResponse.of(200, "Success", null));
		} else {
			System.out.println("중복 넥네임이 있습니다. 실패");
			return ResponseEntity.status(409).body(UserResponse.of(409, "중복된 아이디가 있습니다.", user));
		}
	}

	@GetMapping("/profile")
	@ApiOperation(value = "전적 검사", notes = "<strong>전적을 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> profileSearch(
			@ApiParam(value = "넥네임 정보", required = true) @RequestParam("nickname") String nickname) {

		System.out.println(nickname);
		// user를 가져와서
		User user = userService.getGameRecordByNickname(nickname);

		System.out.println("nickname");
		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (user == null) {
			System.out.println(user);
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("중복이 없습니다. 성공");
			return ResponseEntity.ok(UserResponse.of(200, "Success", null));
		} else {
			System.out.println("중복 넥네임이 있습니다. 실패");
			return ResponseEntity.status(409).body(UserResponse.of(409, "중복된 아이디가 있습니다.", user));
		}
	}

	@PutMapping("/profile")
	@ApiOperation(value = "전적 검사", notes = "<strong>전적을 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> updateUser(
			@RequestBody @ApiParam(value = "변경할 유저 정보", required = true) UserRegisterPostReq registerInfo) {

		System.out.println("registerInfo.toString()");
		System.out.println(registerInfo.toString());
		System.out.println(registerInfo.toString());
		// user를 가져와서
		User user = userService.getUserById(registerInfo.getId());

		// 로그인 요청한 유저로부터 입력된 패스워드 와 디비에 저장된 유저의 암호화된 패스워드가 같은지 확인.(유효한 패스워드인지 여부 확인)
		if (user == null) {
			System.out.println(user);
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("해당 아이디가 없습니다. 실패");
			return ResponseEntity.status(400).body(UserResponse.of(400, "can`t not found your id check post Id", null));
		} else {
			userService.updateUser(user, registerInfo);
			System.out.println("update 성공");
			return ResponseEntity.status(200).body(UserResponse.of(200, "중복된 아이디가 있습니다.", null));
		}
	}

	@PutMapping("/profile/password")
	@ApiOperation(value = "전적 검사", notes = "<strong>전적을 확인한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "인증 실패", response = BaseResponseBody.class),
			@ApiResponse(code = 404, message = "사용자 없음", response = BaseResponseBody.class),
			@ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class) })
	public ResponseEntity<UserResponse> updateUserPassword(
			@RequestBody @ApiParam(value = "변경할 유저 정보", required = true) UserRegisterPostReq registerInfo) {

		// user를 가져와서
		User user = userService.getUserById(registerInfo.getId());
		if (user == null) {
			System.out.println(user);
			// 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
			System.out.println("해당 아이디가 없습니다. 실패");
			return ResponseEntity.status(400).body(UserResponse.of(400, "can`t not found your id check post Id", null));
		}
		if (user.getPassword().equals(registerInfo.getPassword())) {
			userService.updateUserPassword(user, registerInfo);
			System.out.println("update 성공");
			return ResponseEntity.status(200).body(UserResponse.of(200, "중복된 아이디가 있습니다.", null));

		} else {
			return ResponseEntity.status(403).body(UserResponse.of(403, "기존 패스워드가 다릅니다.", null));
		}
	}
}
