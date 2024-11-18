package com.AIMLproject.backend.controller;

import java.util.List;

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

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.dto.req.CreateProjectReq;
import com.AIMLproject.backend.service.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectController {

	private final ProjectService projectService;

	@Autowired
	public ProjectController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@GetMapping("/projects")
	public ResponseEntity<?> readAllProjects(@AuthenticationPrincipal UserDetails userDetails) {
		List<Project> projects = projectService.getAllProjects(userDetails.getUsername());
		return ResponseEntity.ok(projects);
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<Project> readProject(@PathVariable Long projectId,
		@AuthenticationPrincipal UserDetails userDetails) {
		String username = (userDetails != null) ? userDetails.getUsername() : null;
		Project project = projectService.getProject(projectId, username);
		return ResponseEntity.ok(project);
	}

	@PostMapping("/projects")
	public ResponseEntity<Project> createProject(@RequestBody CreateProjectReq req,
		@AuthenticationPrincipal UserDetails userDetails) {
		Project project = projectService.addProject(req.getTitle(), req.getSubtitle(), userDetails.getUsername());
		return ResponseEntity.ok(project);
	}

	@PutMapping("/projects/{projectId}")
	public ResponseEntity<?> authorizeProject(@PathVariable Long projectId, @RequestBody Boolean auth,
		@AuthenticationPrincipal UserDetails userDetails) {
		projectService.authorizeProject(projectId, auth, userDetails.getUsername());
		return ResponseEntity.ok().build();
	}

	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<?> deleteProject(@PathVariable Long projectId,
		@AuthenticationPrincipal UserDetails userDetails) {
		projectService.deleteProject(projectId, userDetails.getUsername());
		return ResponseEntity.ok().build();
	}
}
