package com.AIMLproject.backend.dto.res;

public class CreateNewObjectRes {
	private Long objectId;
	private Object geometry;
	private Object material;
	private Object others;
	private Long projectId;

	public CreateNewObjectRes() {
	}

	public CreateNewObjectRes(Long objectId, Object geometry, Object material, Object others, Long projectId) {
		this.objectId = objectId;
		this.geometry = geometry;
		this.material = material;
		this.others = others;
		this.projectId = projectId;
	}
}
