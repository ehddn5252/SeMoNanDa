package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ToString
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy_web")
	String id;
	@ApiModelProperty(name="유저 Password", example="your_password")
	String password;
	@ApiModelProperty(name="유저 name", example="김철수")
	String name;
	@ApiModelProperty(name="유저 nickname", example="spa1")
	String nickname;
	@ApiModelProperty(name="유저 phonenumber", example="01057429111")
	String phonenumber;
	@ApiModelProperty(name="유저 description", example="나는 나다")
	String description;
	@ApiModelProperty(name="유저 description", example="나는 나다")
	String newPassword;
}
