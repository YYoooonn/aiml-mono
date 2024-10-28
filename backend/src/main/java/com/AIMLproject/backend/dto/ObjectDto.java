package com.AIMLproject.backend.dto;

import com.AIMLproject.backend.domain.Obj;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ObjectDto {
	private Long objectId;
	private String geometry;
	private String material;
	private String others;
	private Long projectId;

	public ObjectDto() {
	}

	public ObjectDto(Long objectId, String geometry, String material, String others, Long projectId) {
		this.objectId = objectId;
		this.geometry = geometry;
		this.material = material;
		this.others = others;
		this.projectId = projectId;
	}

	public ObjectDto(Obj object) {
		this.objectId = object.getObjectId();
		this.geometry = object.getGeometry();
		this.material = object.getMaterial();
		this.others = object.getOthers();
		this.projectId = object.getProject().getProjectId();
	}
}
