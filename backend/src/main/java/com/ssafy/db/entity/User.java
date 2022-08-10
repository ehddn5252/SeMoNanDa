package com.ssafy.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@ToString
@Table(name="users")
public class User extends BaseEntity{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int uid;
	
	@Column(name="id")
	String id;
	String name;
    
	@JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;
    String phonenumber;
    int rankpoint;
    

    String nickname;
    String img;
    String description;

	@Column(name="number_of_wins")
    int numberOfWins;
	@Column(name="number_of_loses")
    int numberOfLoses;
    
    
    String authority;
    
    @OneToMany(mappedBy="userUid")
    private List<Board> boardList = new ArrayList<Board>();
    
    public void add(Board board) {
    	this.boardList.add(board);
    }
    
}
