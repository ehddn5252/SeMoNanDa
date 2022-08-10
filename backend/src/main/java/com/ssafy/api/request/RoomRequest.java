package com.ssafy.api.request;

import java.util.Date;

import javax.persistence.Column;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 
 * @packageName : com.ssafy.api.request
 * @fileName : RoomRequest.java
 * @author : 김유정
 * @date : 2022.08.01
 * @description :
 */

@Getter
@Setter
@ToString
@ApiModel("RoomRequest")
public class RoomRequest {
	@ApiModelProperty(name = "방 고유  Uid", example = "1")
	int uid;

	@ApiModelProperty(name = "방장 id", example = "ssafy")
	String nickname;
	
	@ApiModelProperty(name = "노말모드 인지 확인하는 변수", example = "True")
	boolean normal;

	@ApiModelProperty(name = "일반 모드 게임 카테고리 Uid", example = "1")
	int gameCategoriesUid;

	@ApiModelProperty(name = "게임 토픽별 Uid", example = "1")
	int gameCategoryTopicsUid;

	@ApiModelProperty(name = "방장 id", example = "ssafy")
	String roomAdminUserId;

	@ApiModelProperty(name = "방 url", example = "/sadas123")
	String conferenceRoomUrl;

	@ApiModelProperty(name = "방 생성 시간", example = "2022-08-01 11:35:43")
	Date startTime;

	@ApiModelProperty(name = "방 종료(삭제)시간", example = "2022-08-01 12:35:43")
	Date endTime;

	@ApiModelProperty(name = "커스텀 모드 방 비밀번호", example = "1234")
	String customPassword;

	@ApiModelProperty(name = "방 제목", example = "나랑 붙어 볼 사람~")
	String title;

	@ApiModelProperty(name = "커스텀 모드(사용자가 입력한)공통주제 ", example = "깻잎을")
	String customTopic;

	@ApiModelProperty(name = "커스텀 모드(사용자가 입력한) A진영 주제", example = "떼줘도 된다")
	String customAnswerA;

	@ApiModelProperty(name = "커스텀 모드(사용자가 입력한) B진영 주제", example = "떼주면 안된다")
	String customAnswerB;

	@ApiModelProperty(name = "게임이 진행중인 방인지 확인하는 변수", example = "true")
	boolean gameStart;

}
