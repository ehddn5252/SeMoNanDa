package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.Accusation;

/**
 * QAccusation is a Querydsl query type for Accusation
 * 
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QAccusation extends EntityPathBase<Accusation> {
	// serialVersionUID 바꿔야 하는가?
	private static final long serialVersionUID = 846542477L;

	public static final QAccusation accusation = new QAccusation("accusation");

	public final QBaseEntity _super = new QBaseEntity(this);
	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);
	public final NumberPath<Integer> accusationInfosUid = createNumber("accusationInfosUid", Integer.class);
	public final NumberPath<Integer> reporterUid= createNumber("reporterUid",Integer.class);
	public final NumberPath<Integer> attackerUid= createNumber("attackerUid",Integer.class);

	public QAccusation(String variable) {
		super(Accusation.class, forVariable(variable));
	}

	public QAccusation(Path<? extends Accusation> path) {
		super(path.getType(), path.getMetadata());
	}

	public QAccusation(PathMetadata metadata) {
		super(Accusation.class, metadata);
	}

}
