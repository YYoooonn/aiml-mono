package com.AIMLproject.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.User;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
	private Long userId;
	private String username;
	private String firstName;
	private String lastName;
	private List<ProjectDto> projects;

	public UserDto(User user) {
		this.userId = user.getUserId();
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.projects = user.getProjects().stream()
			.map(ProjectDto::new)
			.collect(Collectors.toList());
	}

}
