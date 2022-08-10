package com.ssafy.api.request;

import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@ApiModel("UserLoginIdRequest")
public class BoardRequest {
	
	@ApiModelProperty(name = "글번호 UID", example = "1")
	int uid;

	@ApiModelProperty(name = "user table의  UID", example = "1")
	int userUid;

	@ApiModelProperty(name = "카테고리 분류(1:공지, 2:소식, 3: 커뮤니티 ,4: 게임 가이드, 5:댓글)", example = "1")
	int categoryLarge;

	@ApiModelProperty(name = "카테고리 중분류(1.공지, 2.점검, 3.패치 등...)", example = "1")
	int categoryMiddle;

	@ApiModelProperty(name = "글 제목", example = "명지 방 양도받으실분 구함")
	String title;

	@ApiModelProperty(name = "글 내용", example = "명지방 300/30 오션뷰 ㅍㅍ")
	String content;

	@ApiModelProperty(name = "글 등록 시각", example = "2022-07-26 23:35:43")
	Date regTime;

	@ApiModelProperty(name = "조회수", example = "10")
	int viewCount;
	
	@ApiModelProperty(name = "첨부 이미지(url형식)", example = "mxdfaogckvjaof")
	String img;

}