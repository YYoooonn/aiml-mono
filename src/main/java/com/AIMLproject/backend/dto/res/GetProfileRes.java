package com.AIMLproject.backend.dto.res;

import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.dto.ProjectDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetProfileRes {
	private Long userId;
	private String username;
	private String firstName;
	private String lastName;
	private List<ProjectDto> projects;

	public GetProfileRes() {
	}

	public GetProfileRes(Long userId, String username, String firstName, String lastName, List<Project> projects) {
		this.userId = userId;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.projects = projects.stream()
			.map(ProjectDto::new)
			.collect(Collectors.toList());
	}
}
