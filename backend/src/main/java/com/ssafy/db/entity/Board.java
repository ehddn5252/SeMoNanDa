package com.ssafy.db.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

/**
 * 유저 모델 정의.
 */
/**

  * @FileName : Board.java
  * @Project : ssafy-web-project
  * @Date : 2022. 7. 31 
  * @작성자 : 김동우
  * @변경이력 :
  * @프로그램 설명 :
  */
@Entity
@Getter
@Setter
@Table(name = "boards")
public class Board extends BaseEntity implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;


	/**
	 * 1: 커뮤니티 2: 뉴스 3: 가이드
	 */
	@Column(name = "category_large")
	int categoryLarge;

	/**
	 * 1. 자유 게시글, 2. 소식, 3. 업데이트, 4. 댓글
	 *  게임 소개, 게임 룰, 게임 모드
	 */
	@Column(name = "category_middle")
	int categoryMiddle;

	String title;

	String content;

	@Column(name = "reg_time")
	Date regTime;

	@Column(name = "view_count")
	int viewCount;
	
	@Column(nullable = true, name = "img")
	String img;
	
	@Column(name="user_uid")
	int userUid;
	
	@ManyToOne()
	@JoinColumn(name="boardList")
	private User user;
}
