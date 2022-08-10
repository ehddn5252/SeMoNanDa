package com.ssafy.api.response;

import com.ssafy.db.entity.GameCategoryTopic;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GameCategoryTopicsResponse")
public class GameCategoryTopicsRes{
	@ApiModelProperty(name="topic uid")
	int uid;
	@ApiModelProperty(name="category uid")
	int categoryUid;
	@ApiModelProperty(name="topic")
	String topic;
	@ApiModelProperty(name="answer A")
	String answerA;
	@ApiModelProperty(name="answer B")
	String answerB;
	@ApiModelProperty(name="answer A wind count")
	int teamAWinCount;
	@ApiModelProperty(name="answer B wind count")
	int teamBWinCount;
	
	
	public static GameCategoryTopicsRes of(GameCategoryTopic topic) {
		GameCategoryTopicsRes res = new GameCategoryTopicsRes();
		res.setUid(topic.getUid());
		res.setCategoryUid(topic.getCategoryUid());
		res.setTopic(topic.getTopic());
		res.setAnswerA(topic.getAnswerA());
		res.setAnswerB(topic.getAnswerB());
		res.setTeamAWinCount(topic.getTeamAWinCount());
		res.setTeamBWinCount(topic.getTeamBWinCount());
		return res;
	}
}
