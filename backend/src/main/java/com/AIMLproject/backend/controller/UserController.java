package com.AIMLproject.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.ProjectDto;
import com.AIMLproject.backend.dto.ProjectsDto;
import com.AIMLproject.backend.dto.UserDto;
import com.AIMLproject.backend.dto.req.CreateNewProjectReq;
import com.AIMLproject.backend.dto.req.RegisterReq;
import com.AIMLproject.backend.dto.res.RegisterRes;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping("/users/register")
	public ResponseEntity<?> register(@RequestBody RegisterReq req) {
		try {
			User user = userService.saveUser(req.getUsername(), req.getFirstName(), req.getLastName(),
				req.getPassword());
			return ResponseEntity.status(HttpStatus.CREATED).body(new RegisterRes(user));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}

	@GetMapping("/users/profile")
	public ResponseEntity<?> getProfile(Authentication auth) {
		User user = userService.getUser(auth.getName());
		UserDto res = new UserDto(user);
		return ResponseEntity.ok(res);
	}

	@PostMapping("/users/projects")
	public ResponseEntity<?> createNewProject(@RequestBody CreateNewProjectReq req, Authentication authentication) {
		Project project = userService.addNewProject(authentication.getName(), req.getTitle(), req.getSubtitle());
		ProjectDto res = new ProjectDto(project);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/users/projects")
	public ResponseEntity<?> readAllProjects(Authentication authentication) {
		List<Project> projects = userService.getAllProjects(authentication.getName());
		ProjectsDto res = new ProjectsDto(projects);
		return ResponseEntity.ok(res);
	}
}
