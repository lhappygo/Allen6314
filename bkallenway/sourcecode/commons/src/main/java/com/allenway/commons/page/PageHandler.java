package com.allenway.commons.page;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;


public class PageHandler implements Pageable {

	private int pageSize;
	private int currentPage;
	
	public PageHandler(final int pageSize,final int currentPage ) {
		this.pageSize = pageSize;
		this.currentPage = currentPage;
	}
	
	@Override
	public int getPageNumber() {
		return this.currentPage;
	}

	@Override
	public int getPageSize() {
		return this.pageSize;
	}

	@Override
	public int getOffset() {
		if( this.currentPage == 0 )
			return 0;
		return this.pageSize * (this.currentPage-1);
	}

	@Override
	public Sort getSort() {
		return null;
	}

	@Override
	public Pageable next() {
		this.currentPage ++;
		return this;
	}

	@Override
	public Pageable previousOrFirst() {
		if( this.currentPage <= 1 )
			return this;
		this.currentPage --;
		return this;
	}

	@Override
	public Pageable first() {
		this.currentPage = 1;
		return this;
	}

	@Override
	public boolean hasPrevious() {
		return this.currentPage>1;
	}
}
