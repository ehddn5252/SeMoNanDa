package com.ssafy.api.response;

import javax.persistence.Column;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PlayerResponse")
public class PlayerRes{
	@ApiModelProperty(name="User UID")
	int usersUid;
	@ApiModelProperty(name="Gameroom UID")
	int gameConferenceRoomUid;
	@ApiModelProperty(name="Gold finch")
	int goldfinch;
	@ApiModelProperty(name="Role Uid")
	int roleUid;
	@ApiModelProperty(name="King Count")
	int kingCount;
	@ApiModelProperty(name="Team")
	String team;
	@ApiModelProperty(name="Accusation Count")
	int accusationCount;
	@ApiModelProperty(name="Total Gold Finch")
	int totalGoldfinch;
	@ApiModelProperty(name="Random King")
	boolean randomKing;
	@ApiModelProperty(name="Ready State")
	boolean readyState;
	@ApiModelProperty(name="is_muted")
	boolean isMuted;
	@ApiModelProperty(name="is_cam_off")
	boolean isCamOff;
	@ApiModelProperty(name="is_change_voice")
	boolean isChangeVoice;
	
	public static PlayerRes of(Player player) {
		PlayerRes res = new PlayerRes();
		res.setUsersUid(player.getUsersUid());
		res.setGameConferenceRoomUid(player.getGameConferenceRoomUid());
		res.setGoldfinch(player.getGoldfinch());
		res.setRoleUid(player.getRoleUid());
		res.setKingCount(player.getKingCount());
		res.setTeam(player.getTeam());
		res.setAccusationCount(player.getAccusationCount());
		res.setTotalGoldfinch(player.getTotalGoldfinch());
		res.setRandomKing(player.isRandomKing());
		res.setReadyState(player.isReadyState());
		res.setMuted(player.isMuted());
		res.setCamOff(player.isCamOff());
		res.setChangeVoice(player.isChangeVoice());
		return res;
	}
}
