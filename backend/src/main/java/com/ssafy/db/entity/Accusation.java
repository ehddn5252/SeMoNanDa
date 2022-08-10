package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name="accusations")
public class Accusation extends BaseEntity{
	
	@Id
	@Column(name = "uid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Column(name = "accusation_infos_uid")
	int accusationInfosUid;
	
	@Column(name = "reporter_uid")
	int reporterUid;
	
	@Column(name = "attacker_uid")
	int attackerUid;
	
	@Column(name = "game_conference_room_uid")
	int gameConferenceRoomUid;
}
