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
@ApiModel("AccusationRequest")
public class AccusationRequest {
	@ApiModelProperty(name="신고 UID", example="1")
	int uid;
	@ApiModelProperty(name="신고 분류  UID(FK - accustion_infos)", example="1")
	int accusationInfosUid;
	@ApiModelProperty(name="신고자 ", example="김싸피")
	String reporterNickname;
	@ApiModelProperty(name="유저 비밀번호", example="1234")
    String attackerNickname;
}