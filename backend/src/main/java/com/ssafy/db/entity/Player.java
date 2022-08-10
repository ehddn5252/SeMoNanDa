package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import javax.persistence.*;
/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name="players")
public class Player extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Column(name="users_uid")
	int usersUid;
	
	@Column(name="game_conference_room_uid")
	int gameConferenceRoomUid;
	
	int goldfinch;
	
	@Column(name="role_uid")
	int roleUid;
	
	@Column(name="king_count")
	int kingCount;
	
	String team;
	
	@Column(name="accusation_count")
	int accusationCount;
	
	@Column(name="total_goldfinch")
	int totalGoldfinch;
	
	@Column(name="random_king")
	boolean randomKing;

	@Column(name="ready_state")
	boolean readyState;
	
	@Column(name="is_muted")
	boolean isMuted;
	
	@Column(name="is_cam_off")
	boolean isCamOff;
	
	@Column(name="is_change_voice")
	boolean isChangeVoice;
}
