package com.AIMLproject.backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.CustomObject;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.dto.req.ProjectReq;
import com.AIMLproject.backend.dto.res.ObjectRes;
import com.AIMLproject.backend.dto.res.ParticipantRes;
import com.AIMLproject.backend.dto.res.ProjectRes;
import com.AIMLproject.backend.service.ObjectService;
import com.AIMLproject.backend.service.ProjectService;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class ProjectController {

	private final UserService userService;
	private final ProjectService projectService;
	private final ObjectService objectService;

	@Autowired
	public ProjectController(UserService userService, ProjectService projectService, ObjectService objectService) {
		this.userService = userService;
		this.projectService = projectService;
		this.objectService = objectService;
	}

	@PostMapping("/projects")
	public ResponseEntity<ProjectRes> createProject(@AuthenticationPrincipal UserDetails userDetails,
		@RequestBody ProjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.createProject(user, req.getTitle(), req.getSubtitle(), req.getIsPublic());
		ProjectRes res = new ProjectRes(project);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/projects/{projectId}") // ***********************************
	public ResponseEntity<ProjectRes> readProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user = (userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null;
		Project project = projectService.getProject(user, projectId);
		ProjectRes res = new ProjectRes(project);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/projects/{projectId}/participants") // ***********************************
	public ResponseEntity<Map<String, List<ParticipantRes>>> ara(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user = (userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null;
		Project project = projectService.getProject(user, projectId);
		List<UserProject> userProjects = userService.findParticipantsByProject(project);
		List<ParticipantRes> res = userProjects.stream().map(ParticipantRes::new).collect(Collectors.toList());
		Map<String, List<ParticipantRes>> newRes = new HashMap<>();
		newRes.put("participants", res);
		return ResponseEntity.ok(newRes);
	}

	@GetMapping("/projects/{projectId}/objects") // ***********************************
	public ResponseEntity<Map<String, List<ObjectRes>>> adg(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user = (userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null;
		Project project = projectService.getProject(user, projectId);
		List<CustomObject> objects = objectService.getAllObjects(project);
		List<ObjectRes> res = objects.stream().map(ObjectRes::new).collect(Collectors.toList());
		Map<String, List<ObjectRes>> newRes = new HashMap<>();
		newRes.put("objects", res);
		return ResponseEntity.ok(newRes);
	}

	@GetMapping("/projects/search")
	public ResponseEntity<?> searchPublicProjects(@RequestParam String keyword,
		@RequestParam(defaultValue = "0") int pageNumber,
		@RequestParam(defaultValue = "10") int pageSize) {
		Page<Project> res = projectService.getPublicProjects(keyword, pageNumber, pageSize);
		// List<ProjectRes> res = pageProjects.stream().map(ProjectRes::new).collect(Collectors.toList()); // to do
		return ResponseEntity.ok(res);
	}

	@PutMapping("/projects/{projectId}")
	public ResponseEntity<?> updateProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @RequestBody ProjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.updateProject(user, projectId, req.getTitle(), req.getSubtitle(),
			req.getIsPublic());
		ProjectRes res = new ProjectRes(project);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<Void> deleteProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		projectService.deleteProject(user, projectId);
		return ResponseEntity.ok().build();
	}
}
