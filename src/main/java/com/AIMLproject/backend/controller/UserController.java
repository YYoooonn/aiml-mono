package com.AIMLproject.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.ProjectDto;
import com.AIMLproject.backend.dto.ProjectsDto;
import com.AIMLproject.backend.dto.req.CreateNewProjectReq;
import com.AIMLproject.backend.dto.req.RegisterReq;
import com.AIMLproject.backend.dto.res.GetProfileRes;
import com.AIMLproject.backend.dto.res.RegisterRes;
import com.AIMLproject.backend.jwt.JwtUtil;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	private final UserService userService;
	private final JwtUtil jwtUtil;

	@Autowired
	public UserController(UserService userService, JwtUtil jwtUtil) {
		this.userService = userService;
		this.jwtUtil = jwtUtil;
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

	@GetMapping("/users/{username}/profile")
	public ResponseEntity<?> getProfile(@PathVariable String username, Authentication auth) {
		if (auth.getName().equals(username)) {
			User user = userService.getUser(auth.getName());
			GetProfileRes res = new GetProfileRes(user.getUserId(), user.getUsername(), user.getFirstName(),
				user.getLastName(), user.getProjects());
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}

	@PostMapping("/users/{username}/projects")
	public ResponseEntity<?> createNewProject(@PathVariable String username, @RequestBody CreateNewProjectReq req,
		Authentication auth) {
		if (auth.getName().equals(username)) {
			Project project = userService.addNewProject(auth.getName(), req.getTitle(), req.getSubtitle());
			ProjectDto res = new ProjectDto(project);
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
	}

	@GetMapping("/users/{username}/projects")
	public ResponseEntity<?> readAllProjects(@PathVariable String username, Authentication auth) {
		if (auth.getName().equals(username)) {
			List<Project> projects = userService.getAllProjects(auth.getName());
			ProjectsDto res = new ProjectsDto(projects);
			return ResponseEntity.ok(res);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");

	}
}
