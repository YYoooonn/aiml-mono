package com.AIMLproject.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;

public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
	List<UserProject> findByUser(User user);

	List<UserProject> findByProject(Project project);

	Boolean existsByUserAndProject(User user, Project project);

}
