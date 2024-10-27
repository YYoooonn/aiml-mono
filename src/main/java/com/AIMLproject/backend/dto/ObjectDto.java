package com.AIMLproject.backend.dto;

import com.AIMLproject.backend.domain.Obj;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ObjectDto {
	private Long objectId;
	private String data;                // to do
	private Long projectId;

	public ObjectDto(Obj object) {
		objectId = object.getObjectId();
		data = object.getData();
		projectId = object.getProject().getProjectId();
	}
}
