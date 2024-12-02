package com.AIMLproject.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.dto.req.InviteReq;
import com.AIMLproject.backend.dto.req.UserReq;
import com.AIMLproject.backend.dto.res.UserRes;
import com.AIMLproject.backend.service.ProjectService;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	private final UserService userService;
	private final ProjectService projectService;

	@Autowired
	public UserController(UserService userService, ProjectService projectService) {
		this.userService = userService;
		this.projectService = projectService;
	}

	@PostMapping("/users/register")
	public ResponseEntity<UserRes> createUser(@RequestBody UserReq req) {
		User user = userService.saveUser(req.getUsername(), req.getPassword(), req.getFirstName(), req.getLastName(),
			req.getEmail());
		List<Project> projects = projectService.findAllProjectsByUser(user);
		List<UserProject> involvedProjects = projectService.findInvolvedProjectsByUser(user);
		UserRes res = new UserRes(user, projects, involvedProjects);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/users/profile")
	public ResponseEntity<UserRes> readUser(@AuthenticationPrincipal UserDetails userDetails) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		List<Project> projects = projectService.findAllProjectsByUser(user);
		List<UserProject> involvedProjects = projectService.findInvolvedProjectsByUser(user);
		UserRes res = new UserRes(user, projects, involvedProjects);
		return ResponseEntity.ok(res);
	}

	@PutMapping("/users/profile")
	public ResponseEntity<UserRes> updateUser(@AuthenticationPrincipal UserDetails userDetails,
		@RequestBody UserReq req) {
		User user = userService.updateUser(userDetails.getUsername(), req.getFirstName(), req.getLastName(),
			req.getEmail());
		List<Project> projects = projectService.findAllProjectsByUser(user);
		List<UserProject> involvedProjects = projectService.findInvolvedProjectsByUser(user);
		UserRes res = new UserRes(user, projects, involvedProjects);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/users/delete")
	public ResponseEntity<Void> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
		userService.deleteUser(userDetails.getUsername());
		return ResponseEntity.ok().build();
	}

	@PostMapping("/users/invite")
	public ResponseEntity<Void> invite(@AuthenticationPrincipal UserDetails userDetails, @RequestBody InviteReq req) {
		// sender, reciever, projectId, userId;
		User invitor = userService.findUserByUsername(userDetails.getUsername());
		projectService.inviteUser(invitor, req.getProjectId(), req.getUserId(), req.getReadOnly());
		return ResponseEntity.ok().build();
	}
}
