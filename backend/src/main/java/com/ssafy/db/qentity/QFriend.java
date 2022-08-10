package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import javax.annotation.Generated;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.Friend;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QFriend extends EntityPathBase<Friend> {

	private static final long serialVersionUID = 846542477L;
	public static final QFriend friend = new QFriend("friend");
	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);

	public final NumberPath<Integer> friendRequesterUid = createNumber("friendRequesterUid", Integer.class);

	public final NumberPath<Integer> friendReceiverUid = createNumber("friendReceiverUid", Integer.class);

	public QFriend(String variable) {
		super(Friend.class, forVariable(variable));
	}

	public QFriend(Path<? extends Friend> path) {
		super(path.getType(), path.getMetadata());
	}

	public QFriend(PathMetadata metadata) {
		super(Friend.class, metadata);
	}

}
