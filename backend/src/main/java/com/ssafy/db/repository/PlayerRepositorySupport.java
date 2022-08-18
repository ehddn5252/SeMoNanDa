package com.ssafy.db.repository;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.Random;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.api.response.TopicsWinnerRes;
import com.ssafy.db.entity.Accusation;
import com.ssafy.db.entity.GameCategoryTopic;
import com.ssafy.db.entity.GameConferenceRoom;
import com.ssafy.db.entity.GameRecord;
import com.ssafy.db.entity.Player;
import com.ssafy.db.entity.SelectedTopic;
import com.ssafy.db.entity.User;
import com.ssafy.db.qentity.QGameCategory;
import com.ssafy.db.qentity.QGameCategoryTopic;
import com.ssafy.db.qentity.QGameConferenceRoom;
import com.ssafy.db.qentity.QGameRecord;
import com.ssafy.db.qentity.QPlayer;
import com.ssafy.db.qentity.QSelectedTopic;
import com.ssafy.db.qentity.QUser;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class PlayerRepositorySupport {
	@Autowired
	private SelectedTopicRepository selectedTopicRepository;
	@Autowired
	private PlayerRepository playerRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private GameRecordRepository gameRecordRepository;
	@Autowired
	private AccusationRepository accusationRepository;

	@Autowired
	private JPAQueryFactory jpaQueryFactory;
	QPlayer qPlayer = QPlayer.player;
	QUser qUser = QUser.user;
	QGameConferenceRoom qGameConferenceRoom = QGameConferenceRoom.gameConferenceRoom;
	QGameCategoryTopic qGameCategoryTopic = QGameCategoryTopic.gameCategoryTopic;
	QSelectedTopic qSelectedTopic = QSelectedTopic.selectedTopic;
	QGameRecord qGameRecord = QGameRecord.gameRecord;
	QGameCategory qGameCategory = QGameCategory.gameCategory;

	static int calcRankPoint(int totalGoldFinch, boolean isWinner, boolean isRandomKing) {
		int rankPoint = 0;
		if (isWinner) {
			rankPoint = totalGoldFinch * 10 + 20;
		} else {
			rankPoint = totalGoldFinch * 10 - 20;
		}
		if (isRandomKing) {
			rankPoint += 10;
		}
		return rankPoint;
	}

	public Optional<Player> findPlayerByUserId(String userId) {
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where((qUser.id).eq(userId)).fetchOne();
		Player player = jpaQueryFactory.select(qPlayer).from(qPlayer).where(qPlayer.usersUid.eq(userUid)).fetchOne();
		if (player == null)
			return Optional.empty();
		return Optional.ofNullable(player);
	}

	@Transactional
	public void changePlayerReadyByUserId(String userId) {
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where((qUser.id).eq(userId)).fetchOne();
		Player player = jpaQueryFactory.select(qPlayer).from(qPlayer).where(qPlayer.usersUid.eq(userUid)).fetchOne();
		jpaQueryFactory.update(qPlayer)
				.set(qPlayer.readyState, jpaQueryFactory.select(qPlayer.readyState).from(qPlayer)
						.where(qPlayer.usersUid.eq(userUid)).fetchOne() ? false : true)
				.where(qPlayer.usersUid.eq(userUid)).execute();
	}

	@Transactional
	public void gameStart(int gameConferenceRoomUid) {
		jpaQueryFactory.update(qGameConferenceRoom).set(qGameConferenceRoom.gameStart, true)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
		GameConferenceRoom g = jpaQueryFactory.selectFrom(qGameConferenceRoom)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).fetchFirst();
		int categoryUid = g.getGameCategoriesUid();
		long sel = jpaQueryFactory.select(qGameCategory.subjectCount).from(qGameCategory)
				.where(qGameCategory.uid.eq(categoryUid)).fetchOne();
		jpaQueryFactory.update(qGameCategory).set(qGameCategory.subjectCount, (int) sel + 1)
				.where(qGameCategory.uid.eq(categoryUid)).execute();
		System.out.println("UID " + g.getUid() + "번방 게임 시작");
		System.out.println("방제목: " + g.getTitle());
	}

	@Transactional
	public void changePenalty(int gameConferenceRoomUid, String userID, int penalty) {// penalty 0:스피커, 1:카메라, 2:음성변조
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where((qUser.id).eq(userID)).fetchOne();
		Player player = jpaQueryFactory.selectFrom(qPlayer).where(qPlayer.usersUid.eq(userUid)).fetchOne();
		switch (penalty) {// 제한 내용에 따른 스위치 문
		case 0:
			// 이전 제한 여부
			boolean beforeMuted = jpaQueryFactory.select(qPlayer.isMuted).from(qPlayer)
					.where(qPlayer.usersUid.eq(userUid)).fetchOne();
			// 제한 여부 변경
			jpaQueryFactory.update(qPlayer).set(qPlayer.isMuted, beforeMuted ? false : true)
					.where(qPlayer.usersUid.eq(userUid)).execute();
			// 로그 츨력
			if (beforeMuted)
				System.out.println("아이디 " + userID + "음소거 해제 됨");
			else
				System.out.println("아이디 " + userID + "음소거 됨");
			break;
		case 1:
			// 이전 제한 여부
			boolean beforeCamOff = jpaQueryFactory.select(qPlayer.isCamOff).from(qPlayer)
					.where(qPlayer.usersUid.eq(userUid)).fetchOne();
			// 제한 여부 변경
			jpaQueryFactory.update(qPlayer).set(qPlayer.isCamOff, beforeCamOff ? false : true)
					.where(qPlayer.usersUid.eq(userUid)).execute();
			// 로그 츨력
			if (beforeCamOff)
				System.out.println("아이디 " + userID + "카메라 제한 해제 됨");
			else
				System.out.println("아이디 " + userID + "카메라 제한 됨");
			break;
		default:
			// 이전 제한 여부
			boolean beforeChangeVoice = jpaQueryFactory.select(qPlayer.isChangeVoice).from(qPlayer)
					.where(qPlayer.usersUid.eq(userUid)).fetchOne();
			// 제한 여부 변경
			jpaQueryFactory.update(qPlayer).set(qPlayer.isChangeVoice, beforeChangeVoice ? false : true)
					.where(qPlayer.usersUid.eq(userUid)).execute();
			// 로그 츨력
			if (beforeChangeVoice)
				System.out.println("아이디 " + userID + "음성 변조 해제 됨");
			else
				System.out.println("아이디 " + userID + "음성 변조 됨");
			break;
		}
		jpaQueryFactory.update(qPlayer)
				.set(qPlayer.readyState, jpaQueryFactory.select(qPlayer.readyState).from(qPlayer)
						.where(qPlayer.usersUid.eq(userUid)).fetchOne() ? false : true)
				.where(qPlayer.usersUid.eq(userUid)).execute();
	}

	@Transactional
	public void makeRandomKing(int gameConferenceRoomUid) {
		Random random = new Random();
		ArrayList<Player> playerList = new ArrayList();
		// 해당 게임에 참가중이면서 왕을 안 해본 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.randomKing.isFalse())
				.fetchResults().getResults();
		// 랜덤 왕의 인덱스
		int randomIndex = random.nextInt(playerList.size());
		// 랜덤 왕
		Player randomKingPlayer = playerList.get(randomIndex);
		// 왕이된 플레이어의 randomKing true
		jpaQueryFactory.update(qPlayer).set(qPlayer.randomKing, true)
				.where(qPlayer.usersUid.eq(randomKingPlayer.getUsersUid())).execute();
		// 모든 플레이어 역할 신하(2)으로 초기화
		jpaQueryFactory.update(qPlayer).set(qPlayer.roleUid, 2)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).execute();
		// 랜덤 왕 역할을 왕(1)으로 설정
		jpaQueryFactory.update(qPlayer).set(qPlayer.roleUid, 1).set(qPlayer.goldfinch, 0)
				.where(qPlayer.usersUid.eq(randomKingPlayer.getUsersUid())).execute();
		// 랜덤 왕을 맡은 유저 정보
		User randomKingUser = jpaQueryFactory.selectFrom(qUser).where(qUser.uid.eq(randomKingPlayer.getUsersUid()))
				.fetchOne();
		// 서버 로그 출력
		System.out.println("UID" + gameConferenceRoomUid + "번방의 의 랜덤 왕이 " + randomKingUser.getNickname() + "으로 선정됨.");
	}

	@Transactional
	public void makeRandomTeam(int gameConferenceRoomUid) {
		Random random = new Random();
		ArrayList<Player> playerList = new ArrayList();
		// 해당 게임에 참가중이면서 신하인 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2))
				.fetchResults().getResults();
		// 신하의 수
		int playerNum = playerList.size();
		// 각 진영 별 인원수
		int teamACount = playerNum / 2;
		int teamBCount = playerNum / 2;
		// 신하가 홀수일 시 한 명을 랜덤으로 배정
		if (playerNum % 2 != 0) {
			int randomAB = random.nextInt(2);
			if (randomAB == 0) {
				teamACount += 1;
			} else {
				teamBCount += 1;
			}
		}
		// 모든 신하의 팀 A로 설정
		jpaQueryFactory.update(qPlayer).set(qPlayer.team, "A")
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2)).execute();
		// 선택 여부 표시를 위한 배열
		boolean selected[] = new boolean[playerNum];
		// B팀의 수만큼 랜덤으로 선택하여 배정
		for (int i = 0; i < teamBCount; i++) {
			while (true) {
				int randomIndex = random.nextInt(playerNum);
				if (!selected[randomIndex]) {
					jpaQueryFactory.update(qPlayer).set(qPlayer.team, "B")
							.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2))
							.where(qPlayer.uid.eq(playerList.get(randomIndex).getUid())).execute();
					selected[randomIndex] = true;
					break;
				}
			}
		}
		ArrayList<Integer> teamA = new ArrayList<>();
		ArrayList<Integer> teamB = new ArrayList<>();
		for (int i = 0; i < playerNum; i++) {
			if (!selected[i]) {
				teamA.add(i);
			} else {
				teamB.add(i);
			}
		}
		// 서버 로그 출력
		StringBuilder sb = new StringBuilder();
		sb.append("A팀: ");
		for (int i = 0; i < teamACount; i++) {
			User teamAUser = jpaQueryFactory.selectFrom(qUser)
					.where(qUser.uid.eq(playerList.get(teamA.get(i)).getUsersUid())).fetchOne();
			sb.append(teamAUser.getNickname());
			sb.append(", ");
		}
		sb.setLength(sb.length() - 2);
		sb.append("\n");
		sb.append("B팀: ");
		for (int i = 0; i < teamBCount; i++) {
			User teamBUser = jpaQueryFactory.selectFrom(qUser)
					.where(qUser.uid.eq(playerList.get(teamB.get(i)).getUsersUid())).fetchOne();
			sb.append(teamBUser.getNickname());
			sb.append(", ");
		}
		sb.setLength(sb.length() - 2);
		sb.append("\n");
		System.out.println(sb);
	}

	@Transactional
	public TopicsWinnerRes getRoundStart(int gameConferenceRoomUid) {
		Random random = new Random();
		ArrayList<Player> playerList = new ArrayList();
		ArrayList<GameCategoryTopic> topicList = new ArrayList();
		ArrayList<Integer> selectedList = new ArrayList<>();
		int categoryUid = jpaQueryFactory.select(qGameConferenceRoom.gameCategoriesUid).from(qGameConferenceRoom)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).fetchOne();
		// 해당 게임에 참가중인 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();
		// 모든 플레이어 제한 풀기
		jpaQueryFactory.update(qPlayer).set(qPlayer.isCamOff, false).set(qPlayer.isMuted, false)
				.set(qPlayer.isChangeVoice, false).where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid))
				.execute();
		// 현재 카테고리의 토픽 리스트
		topicList = (ArrayList<GameCategoryTopic>) jpaQueryFactory.selectFrom(qGameCategoryTopic)
				.where(qGameCategoryTopic.categoryUid.eq(categoryUid)).fetchResults().getResults();
		// 현재 게임 방이 했었던 주제들
		if (jpaQueryFactory.select(qSelectedTopic.gameCategoryTopicsUid).from(qSelectedTopic)
				.where(qSelectedTopic.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchCount() != 0)
			selectedList = (ArrayList<Integer>) jpaQueryFactory.select(qSelectedTopic.gameCategoryTopicsUid)
					.from(qSelectedTopic).where(qSelectedTopic.gameConferenceRoomUid.eq(gameConferenceRoomUid))
					.fetchResults().getResults();
		GameCategoryTopic randomTopic = topicList.get(0);
		// 남은 주제가 없을 떄
		if (topicList.size() == selectedList.size()) {
			System.out.println("남은 주제 없음!!");
//			주제 없을 시 db의 selected topic 리셋
			jpaQueryFactory.delete(qSelectedTopic).where(qSelectedTopic.gameConferenceRoomUid.eq(gameConferenceRoomUid))
					.execute();
		}
		for (int i = 0; i < topicList.size(); i++) {
			int randomIndex = random.nextInt(topicList.size());
			// 랜덤 토픽
			randomTopic = topicList.get(randomIndex);
			// 선택된 토픽과 겹치지 않을 때
			if (!selectedList.contains(randomTopic.getUid())) {
				// selectedTopic table에 추가
				SelectedTopic selectedTopic = new SelectedTopic();
				selectedTopic.setGameCategoryTopicsUid(randomTopic.getUid());
				selectedTopic.setGameConferenceRoomUid(gameConferenceRoomUid);
				selectedTopicRepository.save(selectedTopic);
				// 현재 게임 컨퍼런스룸의 주제 uid 변경
				jpaQueryFactory.update(qGameConferenceRoom)
						.set(qGameConferenceRoom.gameCategoryTopicsUid, randomTopic.getUid())
						.set(qGameConferenceRoom.gameCategoriesUid, randomTopic.getCategoryUid())
						.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
				System.out.println(gameConferenceRoomUid + "번방의 주제가 " + randomTopic.getTopic() + " \""
						+ randomTopic.getAnswerA() + "\" VS \"" + randomTopic.getAnswerB() + "\"(으)로 변경되었습니다.");
				break;
			}
		}
		// 2. 새로운 왕 선정
		// 다음턴 왕을 할 플레이어
		Player nextKing = new Player();
		// 골드를 2개 이상 가지고 있는 플레이어 리스트
		ArrayList<Player> twoCoinList = new ArrayList();
		for (int i = 0; i < playerList.size(); i++) {
			if (playerList.get(i).getGoldfinch() >= 2) {
				twoCoinList.add(playerList.get(i));
			}
		}
		boolean isRandomKing = true;
		// 2개 이상 가지고 있는 플레이어가 존재할 경우
		if (twoCoinList.size() != 0) {
			// 그중에서 랜덤으로 왕을 선정
			int randomIndex = random.nextInt(twoCoinList.size());
			nextKing = twoCoinList.get(randomIndex);
			isRandomKing = false;
		} else { // 2개 이상 가지고 있는 플레이어가 없을 경우.
			try {
				playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
						.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid))
						.where(qPlayer.randomKing.isFalse()).fetchResults().getResults();
			} catch (Exception e) {
				System.out.println("모든 플레이어가 랜덤왕을 해봤습니다.");
				playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
						.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();
			}
			int randomIndex = random.nextInt(playerList.size());
			nextKing = playerList.get(randomIndex);
			// 왕이된 플레이어의 randomKing true
			jpaQueryFactory.update(qPlayer).set(qPlayer.randomKing, true)
					.where(qPlayer.usersUid.eq(nextKing.getUsersUid())).execute();
		}
		// 모든 플레이어 역할 신하(2)으로 초기화
		jpaQueryFactory.update(qPlayer).set(qPlayer.roleUid, 2)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).execute();
		// 랜덤 왕 역할을 왕(1)으로 설정
		if (isRandomKing) {
			jpaQueryFactory.update(qPlayer).set(qPlayer.roleUid, 1).where(qPlayer.usersUid.eq(nextKing.getUsersUid()))
					.execute();
		} else {
			jpaQueryFactory.update(qPlayer).set(qPlayer.roleUid, 1)
					.set(qPlayer.goldfinch,
							jpaQueryFactory.select(qPlayer.goldfinch).from(qPlayer)
									.where(qPlayer.uid.eq(nextKing.getUid())).fetchOne() - 2)
					.set(qPlayer.kingCount, nextKing.getKingCount() + 1)
					.where(qPlayer.usersUid.eq(nextKing.getUsersUid())).execute();
		}
		// 랜덤 왕을 맡은 유저 정보
		User randomKingUser = jpaQueryFactory.selectFrom(qUser).where(qUser.uid.eq(nextKing.getUsersUid())).fetchOne();
		// 서버 로그 출력
		User winner = null;
		System.out.println("UID" + gameConferenceRoomUid + "번방의 의 왕이 " + randomKingUser.getNickname() + "으로 선정됨.");
		if (jpaQueryFactory.select(qPlayer.kingCount).from(qPlayer).where(qPlayer.usersUid.eq(randomKingUser.getUid()))
				.fetchOne() >= 3) {
			winner = randomKingUser;
		}
		// 팀 배정
		playerList = new ArrayList();
		// 해당 게임에 참가중이면서 신하인 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2))
				.fetchResults().getResults();
		// 신하의 수
		int playerNum = playerList.size();
		// 각 진영 별 인원수
		int teamACount = playerNum / 2;
		int teamBCount = playerNum / 2;
		// 신하가 홀수일 시 한 명을 랜덤으로 배정
		if (playerNum % 2 != 0) {
			int randomAB = random.nextInt(2);
			if (randomAB == 0) {
				teamACount += 1;
			} else {
				teamBCount += 1;
			}
		}
		// 모든 신하의 팀 A로 설정
		jpaQueryFactory.update(qPlayer).set(qPlayer.team, "A")
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2)).execute();
		// 선택 여부 표시를 위한 배열
		boolean selected[] = new boolean[playerNum];
		// B팀의 수만큼 랜덤으로 선택하여 배정
		for (int i = 0; i < teamBCount; i++) {
			while (true) {
				int randomIndex = random.nextInt(playerNum);
				if (!selected[randomIndex]) {
					jpaQueryFactory.update(qPlayer).set(qPlayer.team, "B")
							.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).where(qPlayer.roleUid.eq(2))
							.where(qPlayer.uid.eq(playerList.get(randomIndex).getUid())).execute();
					selected[randomIndex] = true;
					break;
				}
			}
		}
		ArrayList<Integer> teamA = new ArrayList<>();
		ArrayList<Integer> teamB = new ArrayList<>();
		for (int i = 0; i < playerNum; i++) {
			if (!selected[i]) {
				teamA.add(i);
			} else {
				teamB.add(i);
			}
		}
		// 서버 로그 출력
		StringBuilder sb = new StringBuilder();
		sb.append("A팀: ");
		for (int i = 0; i < teamACount; i++) {
			User teamAUser = jpaQueryFactory.selectFrom(qUser)
					.where(qUser.uid.eq(playerList.get(teamA.get(i)).getUsersUid())).fetchOne();
			sb.append(teamAUser.getNickname());
			sb.append(", ");
		}
		sb.setLength(sb.length() - 2);
		sb.append("\n");
		sb.append("B팀: ");
		for (int i = 0; i < teamBCount; i++) {
			User teamBUser = jpaQueryFactory.selectFrom(qUser)
					.where(qUser.uid.eq(playerList.get(teamB.get(i)).getUsersUid())).fetchOne();
			sb.append(teamBUser.getNickname());
			sb.append(", ");
		}
		sb.setLength(sb.length() - 2);
		sb.append("\n");
		System.out.println(sb);

		return TopicsWinnerRes.of(randomTopic, winner);
	}

	@Transactional
	public void getRoundEnd(int gameConferenceRoomUid, String winTeam) {
		Random random = new Random();
		ArrayList<Player> playerList = new ArrayList();
		ArrayList<Player> winPlayerList = new ArrayList();
		// 왕을 제외한 모든 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer).where(qPlayer.roleUid.eq(2))
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();
		// 1. 이긴 팀에게 goldfinch 지급, totalgoldfinch도 수정
		for (int i = 0; i < playerList.size(); i++) {
			if ((playerList.get(i).getTeam()).compareTo(winTeam) == 0) {
				winPlayerList.add(playerList.get(i));
			}
		}
		for (int i = 0; i < winPlayerList.size(); i++) {
			jpaQueryFactory.update(qPlayer)
					.set(qPlayer.goldfinch,
							jpaQueryFactory.select(qPlayer.goldfinch).from(qPlayer)
									.where(qPlayer.uid.eq(winPlayerList.get(i).getUid())).fetchOne() + 1)
					.set(qPlayer.totalGoldfinch,
							jpaQueryFactory.select(qPlayer.totalGoldfinch).from(qPlayer)
									.where(qPlayer.uid.eq(winPlayerList.get(i).getUid())).fetchOne() + 1)
					.where(qPlayer.uid.eq(winPlayerList.get(i).getUid())).execute();
		}
		// 골드가 업데이트 되어서 다시 불러옴
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer).where(qPlayer.roleUid.eq(2))
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();

		// 2. 주제 테이블을 업데이트한다.
		// 이 라운드의 주제 Uid
		int topicUid = jpaQueryFactory.select(qGameConferenceRoom.gameCategoryTopicsUid).from(qGameConferenceRoom)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).fetchOne();
		// 이 라운드의 주제
		GameCategoryTopic thisTopic = jpaQueryFactory.selectFrom(qGameCategoryTopic)
				.where(qGameCategoryTopic.uid.eq(topicUid)).fetchOne();
		// 주제에 게임 결과를 저장
		if (winTeam.compareTo("A") == 0) {
			jpaQueryFactory.update(qGameCategoryTopic)
					.set(qGameCategoryTopic.teamAWinCount, thisTopic.getTeamAWinCount() + 1)
					.where(qGameCategoryTopic.uid.eq(topicUid)).execute();
		} else {
			jpaQueryFactory.update(qGameCategoryTopic)
					.set(qGameCategoryTopic.teamBWinCount, thisTopic.getTeamBWinCount() + 1)
					.where(qGameCategoryTopic.uid.eq(topicUid)).execute();
		}
	}

	@Transactional
	public void normalGameEnd(int gameConferenceRoomUid, String userId) {
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where(qUser.id.eq(userId)).fetchFirst();
		// 1. 게임 방의 game-start 상태를 false로 바꾼다.
		jpaQueryFactory.update(qGameConferenceRoom).set(qGameConferenceRoom.gameStart, false)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
		ArrayList<Player> playerList = new ArrayList();
		// 게임에 참가한 모든 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();
		// 현재 게임방
		GameConferenceRoom thisRoom = jpaQueryFactory.selectFrom(qGameConferenceRoom)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).fetchOne();
		Date endtime = Calendar.getInstance().getTime();
		// 각 플레이어마다 랭크 포인트 부여
		for (int i = 0; i < playerList.size(); i++) {
			User user = jpaQueryFactory.selectFrom(qUser).where(qUser.uid.eq(playerList.get(i).getUsersUid()))
					.fetchOne();
			// 2. total_gold_finch 대로 점수를 배분한다.
			jpaQueryFactory.update(qUser)
					.set(qUser.rankpoint,
							user.getRankpoint() + calcRankPoint(playerList.get(i).getTotalGoldfinch(),
									user.getUid() == userUid, playerList.get(i).isRandomKing()))
					.set(qUser.numberOfWins,
							user.getUid() == userUid ? user.getNumberOfWins() + 1 : user.getNumberOfWins())
					.set(qUser.numberOfLoses,
							user.getUid() == userUid ? user.getNumberOfLoses() : user.getNumberOfLoses() + 1)
					.where(qUser.uid.eq(user.getUid())).execute();

			// 3. game_records에 게임 기록을 추가한다.
			GameRecord gameRecord = new GameRecord();
			gameRecord.setGameCategoryTopicsUid(thisRoom.getGameCategoryTopicsUid());
			gameRecord.setGameConferenceRoomUid(gameConferenceRoomUid);
			gameRecord.setStartTime(thisRoom.getStartTime());
			gameRecord.setTotalGoldfinch(playerList.get(i).getTotalGoldfinch());
			gameRecord.setWinner(userUid == user.getUid());
			gameRecord.setEndTime(endtime);
			gameRecord.setUserUid(playerList.get(i).getUsersUid());
			gameRecordRepository.save(gameRecord);
		}
		// 4. 모든 플레이어의 게임 정보를 초기화한다.
//		for(int i=0; i<playerList.size(); i++) {
//			jpaQueryFactory.update(qPlayer)
//			.set(qPlayer.accusationCount, 0)
//			.set(qPlayer.goldfinch, 0)
//			.set(qPlayer.isCamOff, false)
//			.set(qPlayer.isChangeVoice, false)
//			.set(qPlayer.isMuted, false)
//			.set(qPlayer.kingCount, 0)
//			.set(qPlayer.randomKing, false)
//			.set(qPlayer.readyState, false)
//			.set(qPlayer.roleUid, 2)
//			.set(qPlayer.team, "A")
//			.set(qPlayer.totalGoldfinch, 0)
//			.execute();
//		}
		jpaQueryFactory.delete(qPlayer).where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).execute();
		// 5. 해당 방의 conference uid를 가지고 있는 selected topic을 삭제한다.
		jpaQueryFactory.delete(qSelectedTopic).where(qSelectedTopic.gameConferenceRoomUid.eq(gameConferenceRoomUid))
				.execute();
		jpaQueryFactory.delete(qPlayer).where(qPlayer.uid.in(jpaQueryFactory.select(qPlayer.uid).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)))).execute();
		// 해당 방을 삭제한다.
		jpaQueryFactory.delete(qGameConferenceRoom).where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
	}

	@Transactional
	public void customGameEnd(int gameConferenceRoomUid) {
		// 해당 게임의 gameStart 상태를 false로 바꿈
		jpaQueryFactory.update(qGameConferenceRoom).set(qGameConferenceRoom.gameStart, false)
				.where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
	}

	public void accusation(int gameConferenceRoomUid, int attackerUid, int reporterUid, int accusationUid) {
		// 신고 테이블에 추가
		Accusation accusation = new Accusation();
		accusation.setGameConferenceRoomUid(gameConferenceRoomUid);
		accusation.setAttackerUid(attackerUid);
		accusation.setReporterUid(reporterUid);
		accusation.setAccusationInfosUid(accusationUid);
		accusationRepository.save(accusation);
		// 플레이어 테이블 수정 (필요한지 모르겠음)
	}

	@Transactional
	public void join(String userId, int gameConferenceRoomUid) {
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where(qUser.id.eq(userId)).fetchFirst();
		Player player = new Player();
		player.setGameConferenceRoomUid(gameConferenceRoomUid);
		player.setUsersUid(userUid);
		player.setTeam("A");
		player.setRoleUid(2);
		playerRepository.save(player);

	}

	@Transactional
	public void quit(String userId, int gameConferenceRoomUid) {
		int userUid = jpaQueryFactory.select(qUser.uid).from(qUser).where(qUser.id.eq(userId)).fetchFirst();
		jpaQueryFactory.delete(qPlayer).where(qPlayer.usersUid.eq(userUid)).execute();
	}

	@Transactional
	public void timeOutEnd(int gameConferenceRoomUid) {
		Random random = new Random();
		ArrayList<Player> playerList = new ArrayList();
		// 왕을 제외한 모든 플레이어 리스트
		playerList = (ArrayList<Player>) jpaQueryFactory.select(qPlayer).from(qPlayer).where(qPlayer.roleUid.eq(2))
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)).fetchResults().getResults();
		// 왕을 제외한 모두에게 goldfinch 지급, totalgoldfinch도 수정

		for (int i = 0; i < playerList.size(); i++) {
			jpaQueryFactory.update(qPlayer)
					.set(qPlayer.goldfinch,
							jpaQueryFactory.select(qPlayer.goldfinch).from(qPlayer)
									.where(qPlayer.uid.eq(playerList.get(i).getUid())).fetchOne() + 1)
					.set(qPlayer.totalGoldfinch,
							jpaQueryFactory.select(qPlayer.totalGoldfinch).from(qPlayer)
									.where(qPlayer.uid.eq(playerList.get(i).getUid())).fetchOne() + 1)
					.where(qPlayer.uid.eq(playerList.get(i).getUid())).execute();
		}
	}

	public void delete(int gameConferenceRoomUid) {
		// 해당 방에 있는 플레이어를 삭제한다.
		jpaQueryFactory.delete(qPlayer).where(qPlayer.uid.in(jpaQueryFactory.select(qPlayer.uid).from(qPlayer)
				.where(qPlayer.gameConferenceRoomUid.eq(gameConferenceRoomUid)))).execute();
		// 해당 방을 삭제한다.
		jpaQueryFactory.delete(qGameConferenceRoom).where(qGameConferenceRoom.uid.eq(gameConferenceRoomUid)).execute();
	}

}
