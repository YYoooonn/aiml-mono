package com.AIMLproject.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Project;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectDto {
	private Long projectId;
	private String title;
	private String subtitle;
	private Long userId;
	private List<ObjectDto> objects;

	public ProjectDto(Project project) {
		this.projectId = project.getProjectId();
		this.title = project.getTitle();
		this.subtitle = project.getSubtitle();
		this.userId = project.getUser().getUserId();
		this.objects = project.getObjects().stream()
			.map(ObjectDto::new)
			.collect(Collectors.toList());
	}
}
