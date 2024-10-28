package com.AIMLproject.backend.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
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
			List<Obj> allObjects = project.getObjects();
			List<Map<String, Object>> objects = new ArrayList<>();
			for (Obj object : allObjects) {
				Map<String, Object> entry = new LinkedHashMap<>(); // LinkedHashMap 사용
				entry.put("objectId", object.getObjectId());
				entry.put("geometry", objectMapper.readValue(object.getGeometry(), Map.class));
				entry.put("material", objectMapper.readValue(object.getMaterial(), Map.class));
				entry.put("others", objectMapper.readValue(object.getOthers(), Map.class));
				objects.add(entry);
			}
			ProjectDto projectDto = new ProjectDto(project);
			LoadProjectRes res = new LoadProjectRes(user, projectDto, objects);
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
			Map<String, Object> entry = new LinkedHashMap<>();
			entry.put("objectId", object.getObjectId());
			entry.put("geometry", objectMapper.readValue(geometry, Map.class));
			entry.put("material", objectMapper.readValue(material, Map.class));
			entry.put("others", objectMapper.readValue(others, Map.class));
			entry.put("peojectId", projectId);
			return ResponseEntity.ok(entry);
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
