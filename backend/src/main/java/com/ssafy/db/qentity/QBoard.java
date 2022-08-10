package com.ssafy.db.qentity;

import static com.querydsl.core.types.PathMetadataFactory.forVariable;

import java.util.Date;

import javax.annotation.Generated;
import javax.persistence.Column;

import com.querydsl.core.types.Path;
import com.querydsl.core.types.PathMetadata;
import com.querydsl.core.types.dsl.DatePath;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import com.ssafy.db.entity.Board;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QBoard extends EntityPathBase<Board> {

	private static final long serialVersionUID = 846542477L;

	public static final QBoard board = new QBoard("board");
	
	public final NumberPath<Integer> uid = createNumber("uid", Integer.class);
	public final NumberPath<Integer> userUid = createNumber("userUid", Integer.class);


	public final NumberPath<Integer> categoryLarge = createNumber("categoryLarge", Integer.class);
	public final NumberPath<Integer> categoryMiddle = createNumber("categoryMiddle", Integer.class);

	public final StringPath title = createString("title");

	public final StringPath content = createString("content");

	// 2022.07.27 13:23 되는 지는 모르지만 일단 syntex 에러는 없음
	public final DatePath<Date> regTime = createDate("regTime", Date.class);

	public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

	public final StringPath img = createString("img");

	///////////////
	public QBoard(String variable) {
		super(Board.class, forVariable(variable));
	}

	public QBoard(Path<? extends Board> path) {
		super(path.getType(), path.getMetadata());
	}

	public QBoard(PathMetadata metadata) {
		super(Board.class, metadata);
	}

}
