package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.GameCategoryTopic;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QGameCategoryTopic extends EntityPathBase<GameCategoryTopic> {

    private static final long serialVersionUID = 846542477L;
	public static final QGameCategoryTopic gameCategoryTopic = new QGameCategoryTopic("gameCategoryTopic");

	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);

	public final NumberPath<Integer> categoryUid = createNumber("categoryUid",Integer.class);
    
    public final StringPath topic = createString("topic");
    public final StringPath answerA = createString("answerA");

    public final StringPath answerB = createString("answerB");
	public final NumberPath<Integer> teamAWinCount = createNumber("teamAWinCount", Integer.class);
	public final NumberPath<Integer> teamBWinCount = createNumber("teamBWinCount", Integer.class);

    public QGameCategoryTopic(String variable) {
        super(GameCategoryTopic.class, forVariable(variable));
    }

    public QGameCategoryTopic(Path<? extends GameCategoryTopic> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGameCategoryTopic(PathMetadata metadata) {
        super(GameCategoryTopic.class, metadata);
    }

}

