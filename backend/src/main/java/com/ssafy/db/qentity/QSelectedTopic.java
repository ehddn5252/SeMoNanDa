package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.BooleanPath;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.ssafy.db.entity.SelectedTopic;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QSelectedTopic extends EntityPathBase<SelectedTopic> {

    private static final long serialVersionUID = 846542477L;
	public static final QSelectedTopic selectedTopic = new QSelectedTopic("selectedTopic");

//    public static final _QSelectedTopic user = new _QSelectedTopic("user");
//    public final QBaseEntity _super = new QBaseEntity(this);
    
    public final NumberPath<Integer> uid = createNumber("uid", Integer.class);
    public final NumberPath<Integer> gameConferenceRoomUid = createNumber("gameConferenceRoomUid", Integer.class);
    public final NumberPath<Integer> gameCategoryTopicsUid = createNumber("gameCategoryTopicsUid", Integer.class);
 
   
    public QSelectedTopic(String variable) {
        super(SelectedTopic.class, forVariable(variable));
    }

    public QSelectedTopic(Path<? extends SelectedTopic> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSelectedTopic(PathMetadata metadata) {
        super(SelectedTopic.class, metadata);
    }

}

