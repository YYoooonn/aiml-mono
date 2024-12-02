package com.AIMLproject.backend.dto.res;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.dto.InvolvedProjectDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRes {

	private Long userId;
	private LocalDateTime createdAt;
	private LocalDateTime lastModifiedAt;
	private String username;
	private String firstName;
	private String lastName;
	private String email;
	private List<Project> projects;
	private List<InvolvedProjectDto> involvedProjects;

	public UserRes(User user, List<Project> projects, List<UserProject> userProjects) {
		this.userId = user.getUserId();
		this.createdAt = user.getCreatedAt();
		this.lastModifiedAt = user.getLastModifiedAt();
		this.username = user.getUsername();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		this.projects = projects;
		this.involvedProjects = userProjects.stream()
			.map(InvolvedProjectDto::new)
			.collect(Collectors.toList());
	}

}
