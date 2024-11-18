package com.AIMLproject.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.req.RegisterReq;
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

	@GetMapping("/users/profile")
	public ResponseEntity<User> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
		User user = userService.getUserByUsername(userDetails.getUsername()); // to do: handle exception
		return ResponseEntity.ok(user);
	}

	@PostMapping("/users/register")
	public ResponseEntity<User> register(@RequestBody RegisterReq req) {
		User user = userService.saveUser(req.getUsername(), req.getPassword(), req.getFirstName(), req.getLastName(),
			req.getEmail()); // to do: handle exception
		return ResponseEntity.ok(user);
	}

	@DeleteMapping("/users/delete")
	public ResponseEntity<?> deleteUser(@AuthenticationPrincipal UserDetails userDetails) {
		userService.deleteUser(userDetails.getUsername()); // to do: handle exception
		return ResponseEntity.ok().build();
	}

	@PutMapping("/users/{username}/projects/{projectId}/invite")
	public ResponseEntity<?> inviteUser(@PathVariable String username, @PathVariable Long projectId,
		@AuthenticationPrincipal UserDetails userDetails) {
		projectService.inviteUser(userDetails.getUsername(), projectId, username);
		return ResponseEntity.ok().build();
	}
}
