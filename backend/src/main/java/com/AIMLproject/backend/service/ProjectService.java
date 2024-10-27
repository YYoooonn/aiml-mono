package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Obj;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.repository.ObjectRepository;
import com.AIMLproject.backend.repository.ProjectRepository;

@Service
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final ObjectRepository objectRepository;

	@Autowired
	public ProjectService(ProjectRepository projectRepository, ObjectRepository objectRepository) {
		this.projectRepository = projectRepository;
		this.objectRepository = objectRepository;
	}

	public Project getProject(Long projectId) throws Exception {
		return projectRepository.findById(projectId)
			.orElseThrow(() -> new Exception("Project Not Found with projectId: " + projectId));  // check
	}

	public Obj addNewObject(Long projectId, String data) throws Exception {
		Obj object = new Obj(data, getProject(projectId));
		return objectRepository.save(object);
	}

	public List<Obj> getAllObjects(Long projectId) throws Exception {
		Project project = getProject(projectId);
		return project.getObjects();
	}
}
