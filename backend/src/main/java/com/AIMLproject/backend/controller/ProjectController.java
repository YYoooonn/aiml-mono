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

import com.AIMLproject.backend.domain.Mesh;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.dto.req.MeshReq;
import com.AIMLproject.backend.dto.req.ProjectReq;
import com.AIMLproject.backend.dto.res.MeshRes;
import com.AIMLproject.backend.dto.res.ProjectRes;
import com.AIMLproject.backend.service.MeshService;
import com.AIMLproject.backend.service.ProjectService;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class ProjectController {

	private final UserService userService;
	private final ProjectService projectService;
	private final MeshService meshService;

	@Autowired
	public ProjectController(UserService userService, ProjectService projectService, MeshService meshService) {
		this.userService = userService;
		this.projectService = projectService;
		this.meshService = meshService;
	}

	@PostMapping("/projects")
	public ResponseEntity<ProjectRes> createProject(@AuthenticationPrincipal UserDetails userDetails,
		@RequestBody ProjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.addProject(user, req.getTitle(), req.getSubtitle(), req.getIsPublic());
		List<Mesh> objects = meshService.getAllObjects(project);
		List<UserProject> participants = userService.findParticipantsByProject(project);
		ProjectRes res = new ProjectRes(project, objects, participants);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<ProjectRes> readProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user =
			(userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null; // to do: request
		Project project = projectService.getProject(user, projectId);
		List<Mesh> objects = meshService.getAllObjects(project);
		List<UserProject> participants = userService.findParticipantsByProject(project);
		ProjectRes res = new ProjectRes(project, objects, participants);
		return ResponseEntity.ok(res);
	}

	@PutMapping("/projects/{projectId}")
	public ResponseEntity<ProjectRes> updateProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @RequestBody ProjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.updateProject(user, projectId, req.getTitle(), req.getSubtitle(),
			req.getIsPublic());
		List<Mesh> objects = meshService.getAllObjects(project);
		List<UserProject> participants = userService.findParticipantsByProject(project);
		ProjectRes res = new ProjectRes(project, objects, participants);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/projects/{projectId}")
	public ResponseEntity<?> deleteProject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		projectService.deleteProject(user, projectId);
		return ResponseEntity.ok().build();
	}

	/**
	 * OBJECT
	 */

	@GetMapping("/projects/{projectId}/objects/{objectId}") // to do
	public ResponseEntity<MeshRes> readObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @PathVariable Long objectId) {
		User user =
			(userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null; // to do: request
		Project project = projectService.getProject(user, projectId);
		Mesh object = meshService.getObject(project, objectId);
		MeshRes res = new MeshRes(object);
		return ResponseEntity.ok(res);
	}

	@PostMapping("/projects/{projectId}/objects")
	public ResponseEntity<MeshRes> createObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @RequestBody MeshReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.getProject(user, projectId);
		Mesh object = meshService.createObject(project, req.getMatrix(), req.getGeometry(), req.getMaterial());
		MeshRes res = new MeshRes(object);
		return ResponseEntity.ok(res);
	}

	@PutMapping("/projectId/{projectId}/objects/{objectId}")
	public ResponseEntity<?> updateObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @PathVariable Long objectId, @RequestBody MeshReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.getProject(user, projectId);
		Mesh object = meshService.updateObject(project, objectId, req.getMatrix(), req.getGeometry(),
			req.getMaterial());
		MeshRes res = new MeshRes(object);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/projectId/{projectId}/objects/{objectId}")
	public ResponseEntity<Void> deleteObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @PathVariable Long objectId) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		Project project = projectService.getProject(user, projectId);
		meshService.deleteObject(project, objectId);
		return ResponseEntity.ok().build();
	}
}
