package com.AIMLproject.backend.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findByUser(User user);

	Page<Project> findByIsPublicTrueAndTitleContainingIgnoreCase(String keyword, Pageable pageable);
}
