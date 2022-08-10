package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

import javax.persistence.*;
/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@ToString
@Table(name="game_conference_rooms")
public class GameConferenceRoom extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Column(name = "is_normal")
	boolean normal;
	
	@Column(name= "Game_categories_uid")
	int gameCategoriesUid;
	
	@Column(name="game_category_topics_uid")
	Integer gameCategoryTopicsUid;
	
	@Column(name="room_admin_user_uid")
	int roomAdminUserUid;
	
	@Column(name="conference_room_url")
	String conferenceRoomUrl;
	
	@Column(name="start_time")
	Date startTime;
	
	@Column(name="end_time")
	Date endTime;
	
	@Column(name="custom_password")
	String customPassword;
	
	@Column(name="title")
	String title;
	
	@Column(name="custom_topic")
	String customTopic;

	@Column(name="custom_answer_A")
	String customAnswerA;

	@Column(name="custom_answer_B")
	String customAnswerB;

	@Column(name = "game_start")
	boolean gameStart;
	
	@Column(name="admin_nickname")
	String adminNickname;

}
