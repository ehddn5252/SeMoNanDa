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
import com.ssafy.db.entity.GameRecord;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGameRecord extends EntityPathBase<GameRecord> {

	private static final long serialVersionUID = 846542477L;

    public static final QGameRecord gameRecord = new QGameRecord("gameRecord");
	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);

	public final NumberPath<Integer> userUid = createNumber("userUid", Integer.class);

	public final NumberPath<Integer> totalGoldfinch = createNumber("totalGoldfinch", Integer.class);
	public final BooleanPath isWinner = createBoolean("isWinner");
	public final NumberPath<Integer> gameConferenceRoomUid = createNumber("gameConferenceRoomUid", Integer.class);
	public final NumberPath<Integer> gameCategoryTopicsUid = createNumber("gameCategoryTopicsUid", Integer.class);
	public final DatePath<Date> startTime = createDate("startTime", Date.class);
	public final DatePath<Date> endTime = createDate("endTime", Date.class);

	public QGameRecord(String variable) {
		super(GameRecord.class, forVariable(variable));
	}

	public QGameRecord(Path<? extends GameRecord> path) {
		super(path.getType(), path.getMetadata());
	}

	public QGameRecord(PathMetadata metadata) {
		super(GameRecord.class, metadata);
	}

}
