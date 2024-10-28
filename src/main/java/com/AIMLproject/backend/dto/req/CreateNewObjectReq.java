package com.AIMLproject.backend.dto.req;

import lombok.Getter;

@Getter
public class CreateNewObjectReq {
	private Object geometry;
	private Object material;
	private Object others;
}
