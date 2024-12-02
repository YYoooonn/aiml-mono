package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.repository.MeshRepository;
import com.AIMLproject.backend.repository.ProjectRepository;
import com.AIMLproject.backend.repository.UserProjectRepository;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class ProjectService {

	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;
	private final UserProjectRepository userProjectRepository;
	private final MeshRepository meshRepository;

	@Autowired
	public ProjectService(UserRepository userRepository, ProjectRepository projectRepository,
		UserProjectRepository userProjectRepository, MeshRepository meshRepository) {
		this.userRepository = userRepository;
		this.projectRepository = projectRepository;
		this.userProjectRepository = userProjectRepository;
		this.meshRepository = meshRepository;
	}

	public List<UserProject> findInvolvedProjectsByUser(User user) {
		return userProjectRepository.findByUser(user);
	}

	public List<Project> findAllProjectsByUser(User user) {
		return projectRepository.findByUser(user);
	}

	public Project loadProjectById(Long projectId) throws RuntimeException {
		return projectRepository.findById(projectId)
			.orElseThrow(() -> new RuntimeException("해당 프로젝트의 id는 존재하지도 않음.")); // to do: handle exception
	}

	public Project getProject(User user, Long projectId) throws RuntimeException {
		Project project = loadProjectById(projectId);
		if (!project.getIsPublic()) {
			if (user == null) { // 비회원 차단
				throw new RuntimeException("Unauthorized access: Project not public");
			}
			if (!userProjectRepository.existsByUserAndProject(user, project)) {
				throw new RuntimeException("Unauthorized access: 당신은 참여자가 아닙니다.");
			}
		}
		return project;
	}

	public Project addProject(User user, String title, String subtitle, Boolean isPublic) {
		Project savedProject = projectRepository.save(new Project(user, isPublic, title, subtitle));
		userProjectRepository.save(new UserProject(user, savedProject, true, false));
		return savedProject;
	}

	public Project updateProject(User user, Long projectId, String title, String subTitle, Boolean isPublic) throws
		RuntimeException {

		Project project = loadProjectById(projectId);

		if (!user.equals(project.getUser())) {
			throw new RuntimeException("딴사람 프로젝트임"); // to do: handle Exception
		}
		if (title != null) {
			project.setTitle(title);
		}
		if (subTitle != null) {
			project.setSubtitle(subTitle);
		}
		if (isPublic != null) {
			project.setIsPublic(isPublic);
		}

		return projectRepository.save(project);
	}

	public void deleteProject(User user, Long projectId) throws UsernameNotFoundException {
		Project project = loadProjectById(projectId);
		if (!user.equals(project.getUser())) {
			throw new RuntimeException("딴사람 프로젝트임"); // to do: handle Exception
		}
		projectRepository.deleteById(projectId);
	}

	public void inviteUser(User invitor, Long projectId, Long inviteeId, Boolean readOnly) throws RuntimeException {
		Project project = projectRepository.findById(projectId)
			.orElseThrow(() -> new RuntimeException("해당 아이디의 프로젝트 없음."));
		if (!project.getUser().equals(invitor)) {
			throw new RuntimeException("프로젝트 초대 권한이 없습ㄴ니다.");
		}
		User invitee = userRepository.findById(inviteeId).orElseThrow(() -> new RuntimeException(
			"초대하려는 사람의 아이디가 없습니다."
		));

		if (userProjectRepository.existsByUserAndProject(invitee, project)) {
			throw new RuntimeException("이미 참여하고 있는 사람입니다.");
		}

		userProjectRepository.save(new UserProject(invitee, project, false, readOnly));
	}
}
