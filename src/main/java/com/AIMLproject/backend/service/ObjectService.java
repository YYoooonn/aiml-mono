package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.CustomObject;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.repository.ObjectRepository;
import com.AIMLproject.backend.repository.UserProjectRepository;

@Service
public class ObjectService {

	private final ObjectRepository objectRepository;
	private final UserProjectRepository userProjectRepository;

	@Autowired
	public ObjectService(ObjectRepository objectRepository, UserProjectRepository userProjectRepository) {
		this.objectRepository = objectRepository;
		this.userProjectRepository = userProjectRepository;
	}

	public List<CustomObject> getAllObjects(Project project) {
		return objectRepository.findByProject(project);
	}

	public CustomObject createObject(User user, Long projectId, List<Double> matrix, String geometry, String material) {

		UserProject userProject = userProjectRepository.findByUserAndProjectId(user, projectId)
			.orElseThrow(() -> new RuntimeException("user is not participant"));

		return objectRepository.save(new CustomObject(userProject.getProject(), matrix, geometry, material));

	}

	public CustomObject updateObject(User user, Long objectId, List<Double> matrix, String geometry,
		String material) {

		CustomObject object = checkUserObject(user, objectId);

		UserProject userProject = userProjectRepository.findByUserAndProject(user, object.getProject())
			.orElseThrow(() -> new RuntimeException("User is not Participant"));

		if (userProject.getReadOnly()) {
			throw new RuntimeException("User is read-only");
		}

		if (matrix != null) {
			object.setMatrix(matrix);
		}
		if (geometry != null) {
			object.setGeometry(geometry);
		}
		if (material != null) {
			object.setMaterial(material);
		}

		return objectRepository.save(object);
	}

	public void deleteObject(User user, Long objectId) {
		CustomObject object = checkUserObject(user, objectId);

		UserProject userProject = userProjectRepository.findByUserAndProject(user, object.getProject())
			.orElseThrow(() -> new RuntimeException("User is not Participant"));

		if (userProject.getReadOnly()) {
			throw new RuntimeException("User is read-only");
		}

		objectRepository.deleteById(objectId);
	}

	public CustomObject checkUserObject(User user, Long objectId) {
		CustomObject object = objectRepository.findById(objectId)
			.orElseThrow(() -> new RuntimeException("Object not found"));
		if (!userProjectRepository.existsByUserAndProject(user, object.getProject())) {
			throw new RuntimeException("User is not Participant");
		}
		return object;
	}

	public CustomObject getPublicObject(User user, Long objectId) {
		CustomObject object = objectRepository.findById(objectId)
			.orElseThrow(() -> new RuntimeException("Object not found"));
		Project project = object.getProject();
		if (!project.getIsPublic()) {
			if (user == null) {
				throw new RuntimeException("is not public");
			}
			if (!userProjectRepository.existsByUserAndProject(user, project)) {
				throw new RuntimeException("해당 유저는 권한이 없습니다.");
			}
		}
		return object;
	}

}
