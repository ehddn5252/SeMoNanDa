package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.AccusationInfo;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAccusationInfo extends EntityPathBase<AccusationInfo> {

	private static final long serialVersionUID = 846542477L;

	public final QBaseEntity _super = new QBaseEntity(this);

	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);
	public final StringPath accusationInfo = createString("accusationInfo");

	public QAccusationInfo(String variable) {
		super(AccusationInfo.class, forVariable(variable));
	}

	public QAccusationInfo(Path<? extends AccusationInfo> path) {
		super(path.getType(), path.getMetadata());
	}

	public QAccusationInfo(PathMetadata metadata) {
		super(AccusationInfo.class, metadata);
	}

}
