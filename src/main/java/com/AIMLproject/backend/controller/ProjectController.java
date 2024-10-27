package com.AIMLproject.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.Obj;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.dto.ObjectDto;
import com.AIMLproject.backend.dto.ObjectsDto;
import com.AIMLproject.backend.dto.ProjectDto;
import com.AIMLproject.backend.dto.req.CreateNewObjectReq;
import com.AIMLproject.backend.service.ProjectService;

@RestController
@RequestMapping("/api")
public class ProjectController {

	private final ProjectService projectService;

	@Autowired
	public ProjectController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<?> loadProject(@PathVariable Long projectId) {
		try {
			Project project = projectService.getProject(projectId);
			ProjectDto res = new ProjectDto(project);
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping("/projects/{projectId}/objects")
	public ResponseEntity<?> createNewObject(@PathVariable Long projectId, @RequestBody CreateNewObjectReq req) {
		try {
			Obj object = projectService.addNewObject(projectId, req.getData());
			ObjectDto res = new ObjectDto(object);
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping("/projects/{projectId}/objects")
	public ResponseEntity<?> readAllObjects(@PathVariable Long projectId) {
		try {
			List<Obj> objs = projectService.getAllObjects(projectId);
			ObjectsDto res = new ObjectsDto(objs);
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
