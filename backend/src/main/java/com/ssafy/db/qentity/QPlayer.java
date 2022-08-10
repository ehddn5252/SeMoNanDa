package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.BooleanPath;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.Player;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

	private static final long serialVersionUID = 846542478L;

	public static final QPlayer player = new QPlayer("player");

	public final QBaseEntity _super = new QBaseEntity(this);

	// inherited
	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);

	public final NumberPath<Integer> usersUid = createNumber("usersUid", Integer.class);

	public final NumberPath<Integer> gameConferenceRoomUid = createNumber("gameConferenceRoomUid", Integer.class);

	public final NumberPath<Integer> goldfinch = createNumber("goldfinch", Integer.class);
	public final NumberPath<Integer> roleUid = createNumber("roleUid", Integer.class);


	public final NumberPath<Integer> kingCount = createNumber("kingCount", Integer.class);

	public final StringPath team = createString("team");

	public final NumberPath<Integer> accusationCount = createNumber("accusationCount", Integer.class);

	public final NumberPath<Integer> totalGoldfinch = createNumber("totalGoldfinch", Integer.class);

	public final BooleanPath randomKing = createBoolean("randomKing");

	public final BooleanPath readyState = createBoolean("readyState");
	public final BooleanPath isMuted = createBoolean("isMuted");
	public final BooleanPath isCamOff = createBoolean("isCamOff");
	public final BooleanPath isChangeVoice = createBoolean("isChangeVoice");

	public QPlayer(String variable) {
		super(Player.class, forVariable(variable));
	}

	public QPlayer(Path<? extends Player> path) {
		super(path.getType(), path.getMetadata());
	}

	public QPlayer(PathMetadata metadata) {
		super(Player.class, metadata);
	}

}
