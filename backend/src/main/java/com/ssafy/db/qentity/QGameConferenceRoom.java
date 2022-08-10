package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import java.util.Date;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.BooleanPath;
import com.querydsl.core.types.dsl.DatePath;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.GameConferenceRoom;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGameConferenceRoom extends EntityPathBase<GameConferenceRoom> {

	private static final long serialVersionUID = 846542477L;
	public static final QGameConferenceRoom gameConferenceRoom = new QGameConferenceRoom("gameConferenceRoom");

	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);

	public final BooleanPath normal = createBoolean("normal");
	// public final NumberPath<Integer> Normal = createNumber("Normal",
	// Integer.class);

	public final NumberPath<Integer> gameCategoriesUid = createNumber("gameCategoriesUid", Integer.class);
	public final NumberPath<Integer> gameCategoryTopicsUid = createNumber("gameCategoryTopicsUid", Integer.class);

	public final NumberPath<Integer> roomAdminUserUid = createNumber("roomAdminUserUid", Integer.class);
	public final StringPath conferenceRoomUrl = createString("conferenceRoomUrl");

	public final DatePath<Date> startTime = createDate("startTime", Date.class);
	public final DatePath<Date> endTime = createDate("endTime", Date.class);

	public final StringPath customPassword = createString("customPassword");
	public final StringPath title = createString("title");

	public final StringPath customTopic = createString("customTopic");
	public final StringPath customAnswerA = createString("customAnswerA");
	public final StringPath customAnswerB = createString("customAnswerB");
	public final BooleanPath gameStart = createBoolean("gameStart");

	public QGameConferenceRoom(String variable) {
		super(GameConferenceRoom.class, forVariable(variable));
	}

	public QGameConferenceRoom(Path<? extends GameConferenceRoom> path) {
		super(path.getType(), path.getMetadata());
	}

	public QGameConferenceRoom(PathMetadata metadata) {
		super(GameConferenceRoom.class, metadata);
	}

}
