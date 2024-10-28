package com.AIMLproject.backend.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Obj;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.repository.ObjectRepository;
import com.AIMLproject.backend.repository.ProjectRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProjectService {

	private final ObjectMapper objectMapper;
	private final ProjectRepository projectRepository;
	private final ObjectRepository objectRepository;

	@Autowired
	public ProjectService(ProjectRepository projectRepository, ObjectRepository objectRepository,
		ObjectMapper objectMapper) {
		this.projectRepository = projectRepository;
		this.objectRepository = objectRepository;
		this.objectMapper = objectMapper;
	}

	public Project getProject(Long projectId) throws Exception {
		return projectRepository.findById(projectId)
			.orElseThrow(() -> new Exception("Project Not Found with projectId: " + projectId));  // check
	}

	public Obj addNewObject(Long projectId, String geometry, String material, String others) throws Exception {
		Project project = getProject(projectId);
		Obj object = new Obj(geometry, material, others, project);
		return objectRepository.save(object);
	}

	public List<Map<String, Object>> getAllObjects(Long projectId) throws Exception {
		Project project = getProject(projectId);
		List<Obj> allObjects = project.getObjects();
		List<Map<String, Object>> convertObjects = new ArrayList<>();
		for (Obj object : allObjects) {
			try {
				Map<String, Object> entry = new LinkedHashMap<>(); // LinkedHashMap 사용
				entry.put("objectId", object.getObjectId());
				entry.put("geometry", objectMapper.readValue(object.getGeometry(), Map.class));
				entry.put("material", objectMapper.readValue(object.getMaterial(), Map.class));
				entry.put("others", objectMapper.readValue(object.getOthers(), Map.class));
				convertObjects.add(entry);
			} catch (Exception e) {
				throw e;
			}
		}
		return convertObjects;
	}
}
