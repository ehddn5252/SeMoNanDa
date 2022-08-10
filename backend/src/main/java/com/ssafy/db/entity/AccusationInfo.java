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
@Table(name="accusation_infos")
public class AccusationInfo extends BaseEntity{
	
	@Id
	@Column(name="uid")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	

	@Column(name="accusation_info")
	String accusationInfo;
}
