package com.ssafy.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.api.response.TopicsWinnerRes;
import com.ssafy.db.entity.Player;
import com.ssafy.db.repository.PlayerRepository;
import com.ssafy.db.repository.PlayerRepositorySupport;
import com.ssafy.db.repository.SelectedTopicRepository;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("gameService")
public class GameServiceImpl implements GameService {
	@Autowired
	PlayerRepository playerRepository;
	@Autowired
	SelectedTopicRepository selectedTopicRepository;
	
	@Autowired
	PlayerRepositorySupport playerRepositorySupport;

	@Override
	public Player getPlayerByUserId(String userId) {
		Player player = playerRepositorySupport.findPlayerByUserId(userId).get();
		System.out.println(player);
		return player;
	}

	@Override
	public void changePlayerReady(String userId) {
		playerRepositorySupport.changePlayerReadyByUserId(userId);
		return;
	}

	@Override
	public void gameStart(int gameConferenceRoomUid) {
		playerRepositorySupport.gameStart(gameConferenceRoomUid);
		return;
	}
	@Override
	public void changePenalty(int gameConferenceRoomUid, String userID, int penalty) {
		playerRepositorySupport.changePenalty(gameConferenceRoomUid, userID, penalty);
		return;
	}
	@Override
	public void makeRandomKing(int gameConferenceRoomUid) {
		playerRepositorySupport.makeRandomKing(gameConferenceRoomUid);
		return;
	}

	@Override
	public void makeRandomTeam(int gameConferenceRoomUid) {
		playerRepositorySupport.makeRandomTeam(gameConferenceRoomUid);
		return;
	}

	@Override
	public TopicsWinnerRes getRoundStart(int gameConferenceRoomUid) {
		TopicsWinnerRes res = playerRepositorySupport.getRoundStart(gameConferenceRoomUid);
		return res;
	}

	@Override
	public void getRoundEnd(int gameConferenceRoomUid, String winTeam) {
		playerRepositorySupport.getRoundEnd(gameConferenceRoomUid, winTeam);
		return;
	}

	@Override
	public void normalGameEnd(int gameConferenceRoomUid, String userId) {
		playerRepositorySupport.normalGameEnd(gameConferenceRoomUid, userId);
		return;
	}
	
	@Override
	public void timeOutEnd(int gameConferenceRoomUid) {
		playerRepositorySupport.timeOutEnd(gameConferenceRoomUid);
	}

	@Override
	public void customGameEnd(int gameConferenceRoomUid) {
		playerRepositorySupport.customGameEnd(gameConferenceRoomUid);
		return;
	}

	@Override
	public void accusation(int gameConferenceRoomUid, int attackerUid, int reporterUid, int accusationUid) {
		playerRepositorySupport.accusation(gameConferenceRoomUid, attackerUid, reporterUid, accusationUid);
		return;
	}

	@Override
	public void join(String userId, int gameConferenceRoomUid) {
		playerRepositorySupport.join(userId, gameConferenceRoomUid);
		return;
	}

	@Override
	public void quit(String userId, int gameConferenceRoomUid) {
		playerRepositorySupport.quit(userId, gameConferenceRoomUid);
		return;
	}

	

	

}
