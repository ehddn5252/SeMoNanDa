package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.*;
/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name="game_category_topics")
public class GameCategoryTopic extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Column(name="category_uid")
	int categoryUid;
	
	@Column(name="topic")
	String topic;

	@Column(name="answer_A")
	String answerA;

	@Column(name="answer_B")
	String answerB;
	
	@Column(name="team_A_win_count")
	int teamAWinCount;
	
	@Column(name="team_B_win_count")
	int teamBWinCount;
}
