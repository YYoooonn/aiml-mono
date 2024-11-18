package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Participant;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.repository.ProjectRepository;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class ProjectService {

	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;

	@Autowired
	public ProjectService(UserRepository userRepository, ProjectRepository projectRepository) {
		this.userRepository = userRepository;
		this.projectRepository = projectRepository;
	}

	public Project addProject(String title, String subtitle, String username) {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
		Project savedProject = projectRepository.save(new Project(title, subtitle, username));
		user.getProjects().add(savedProject);
		userRepository.save(user);
		return savedProject;
	}

	public List<Project> getAllProjects(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("to do"));
		return user.getProjects();
	}

	public Project getProject(Long projectId, String username) throws RuntimeException {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(() -> new RuntimeException("Project not found"));
		if (!project.getCreatedBy().equals(username) && !project.getIsPublic()) {
			if (username == null) { // 비회원 차단
				throw new RuntimeException("Unauthorized access: Project not public");
			}
			boolean isParticipant = project.getParticipants().stream()
				.anyMatch(participant -> participant.getUsername().equals(username));
			if (!isParticipant) { // 비참여자 차단
				throw new RuntimeException("Unauthorized access: User not participant");
			}
		}
		return project;
	}

	public void deleteProject(Long projectId, String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
		user.getProjects().removeIf(project -> project.getProjectId().equals(projectId)); // to do: if not exist
		userRepository.save(user);
		projectRepository.deleteById(projectId);
	}

	public void authorizeProject(Long projectId, Boolean authorization, String username) throws
		RuntimeException {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(() -> new RuntimeException("Project not found"));
		if (!project.getCreatedBy().equals(username)) {
			throw new RuntimeException("Unauthorized access");
		}
		project.setIsPublic(authorization);
		projectRepository.save(project);
	}

	public void inviteUser(String invitorUsername, Long projectId, String inviteeUsername) throws RuntimeException {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(() -> new RuntimeException("Project not found"));
		if (!project.getCreatedBy().equals(invitorUsername)) {
			throw new RuntimeException("Unauthorized access");
		}
		project.getParticipants().add(new Participant(inviteeUsername, false, false));
		projectRepository.save(project);
	}
}
