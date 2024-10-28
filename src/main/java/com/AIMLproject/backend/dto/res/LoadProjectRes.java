package com.AIMLproject.backend.dto.res;

import java.util.List;
import java.util.Map;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.ProjectDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoadProjectRes {
	private Long userId;
	private String username;
	private String firstName;
	private String lastName;
	private Long projectId;
	private String title;
	private String subtitle;
	private List<Map<String, Object>> objects;

	public LoadProjectRes() {
	}

	public LoadProjectRes(User user, ProjectDto projectDto, List<Map<String, Object>> objects) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.projectId = projectDto.getProjectId();
		this.title = projectDto.getTitle();
		this.subtitle = projectDto.getSubtitle();
		this.objects = objects;
	}
}
