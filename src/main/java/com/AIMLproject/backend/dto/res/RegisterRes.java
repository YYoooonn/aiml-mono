package com.AIMLproject.backend.dto.res;

import java.util.List;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRes {
	private Long userId;
	private String username;
	private String firstName;
	private String lastName;
	private List<Project> projects;

	public RegisterRes() {
	}

	public RegisterRes(User user) {
		UserDto userDto = new UserDto(user);
		this.userId = userDto.getUserId();
		this.username = userDto.getUsername();
		this.firstName = userDto.getFirstName();
		this.lastName = userDto.getLastName();
		this.projects = this.getProjects();
	}
}
