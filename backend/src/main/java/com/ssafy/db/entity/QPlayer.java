package com.ssafy.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;
import com.ssafy.db.qentity.QBaseEntity;
import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QPlayer extends EntityPathBase<Player> {

    private static final long serialVersionUID = 846542478L;

    public static final QPlayer player = new QPlayer("player");

    public final QBaseEntity _super = new QBaseEntity(this);

    //inherited
    public final NumberPath<Long> uid = createNumber("uid", Long.class);

    public final NumberPath<Long> usersUid = createNumber("usersUid", Long.class);

    public final NumberPath<Long> gameConferenceRoomUid = createNumber("gameConferenceRoomUid", Long.class);
    
    public final NumberPath<Long> goldfinch = createNumber("goldfinch", Long.class);
    
    public final StringPath role = createString("role");

    public final NumberPath<Long> kingCount = createNumber("kingCount", Long.class);

    public final StringPath team = createString("team");

    public final NumberPath<Long> accusationCount = createNumber("accusationCount", Long.class);
    
    public final NumberPath<Long> totalGoldfinch = createNumber("totalGoldfinch", Long.class);

    public final BooleanPath randomKing = createBoolean("randomKing");
    
    public final BooleanPath readyState = createBoolean("readyState");
    
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

