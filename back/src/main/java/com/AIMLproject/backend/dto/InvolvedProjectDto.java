package com.AIMLproject.backend.dto;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.UserProject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvolvedProjectDto {

	private Project project;
	private Boolean isOwner;
	private Boolean readOnly;

	public InvolvedProjectDto(UserProject userProject) {
		this.project = userProject.getProject();
		this.isOwner = userProject.getIsOwner();
		this.readOnly = userProject.getReadOnly();
	}
}
