package com.AIMLproject.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Project;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectsDto {
	private List<ProjectDto> projects;

	public ProjectsDto(List<Project> projects) {
		this.projects = projects.stream()
			.map(ProjectDto::new)
			.collect(Collectors.toList());
	}
}
