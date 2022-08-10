package com.ssafy.api.response;

import java.util.List;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("userListResponse")
public class UserListResponse {
	@ApiModelProperty(name = "user list")
	List<User> userList;

	public static UserListResponse of(Integer statusCode, String message, List<User> userList) {
		if (userList == null) {
			return null;
		} else {
			UserListResponse res = new UserListResponse();
			res.setUserList(userList);
			return res;
		}
	}

}
