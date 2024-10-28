package com.AIMLproject.backend.controller;

import java.util.List;
import java.util.Map;

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
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.ObjectDto;
import com.AIMLproject.backend.dto.ProjectDto;
import com.AIMLproject.backend.dto.req.CreateNewObjectReq;
import com.AIMLproject.backend.dto.res.LoadProjectRes;
import com.AIMLproject.backend.service.ProjectService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")
public class ProjectController {

	private final ProjectService projectService;
	private final ObjectMapper objectMapper;

	@Autowired
	public ProjectController(ProjectService projectService, ObjectMapper objectMapper) {
		this.projectService = projectService;
		this.objectMapper = objectMapper;
	}

	@GetMapping("/projects/{projectId}")
	public ResponseEntity<?> loadProject(@PathVariable Long projectId) {
		try {
			Project project = projectService.getProject(projectId);
			User user = project.getUser();
			ProjectDto projectDto = new ProjectDto(project);
			LoadProjectRes res = new LoadProjectRes(user, projectDto);
			return ResponseEntity.ok(res);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@PostMapping("/projects/{projectId}/objects")
	public ResponseEntity<?> createNewObject(@PathVariable Long projectId, @RequestBody CreateNewObjectReq req) {
		try {
			String geometry = objectMapper.writeValueAsString(req.getGeometry());
			String material = objectMapper.writeValueAsString(req.getMaterial());
			String others = objectMapper.writeValueAsString(req.getOthers());
			Obj object = projectService.addNewObject(projectId, geometry, material, others);
			return ResponseEntity.ok(new ObjectDto(object));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping("/projects/{projectId}/objects")
	public ResponseEntity<?> readAllObjects(@PathVariable Long projectId) {
		try {
			List<Map<String, Object>> objs = projectService.getAllObjects(projectId);
			return ResponseEntity.ok(objs);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
}
