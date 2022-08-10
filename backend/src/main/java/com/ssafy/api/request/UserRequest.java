 package com.ssafy.api.request;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserLoginIdRequest")
public class UserRequest {
	@ApiModelProperty(name="유저 UID", example="1")
	int uid;
	@ApiModelProperty(name="유저 ID", example="ssafy")
	String id;
	@ApiModelProperty(name="유저 이름", example="김싸피")
	String name;
	@ApiModelProperty(name="유저 비밀번호", example="1234")
    String password;
	@ApiModelProperty(name="유저 전화번호(띄어쓰기 없이 11자)", example="01012345678")
    String phonenumber;
	@ApiModelProperty(name="유저 랭크포인트", example="100")
    int rankpoint;
    @ApiModelProperty(name="유저 닉네임", example="싸피")
    String nickname;
    @ApiModelProperty(name="유저 이미지 주소", example="/res/...")
    String img;
    @ApiModelProperty(name="유저 한줄소개(100자 이내)", example="난 나야")
    String description;
}