package com.ssafy.api.response;

import java.util.Date;
import java.util.List;

import com.ssafy.db.entity.GameConferenceRoom;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("RoomListResponse")
public class RoomListResponse {
	@ApiModelProperty(name = "room list")
	List<GameConferenceRoom> roomList;

	public static RoomListResponse of(Integer statusCode, String message, List<GameConferenceRoom> roomList) {
		if (roomList == null) {
			return null;
		} else {
			RoomListResponse res = new RoomListResponse();
			res.setRoomList(roomList);
			return res;
		}
	}

}
