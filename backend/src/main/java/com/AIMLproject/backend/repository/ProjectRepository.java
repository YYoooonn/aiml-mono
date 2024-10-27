package com.AIMLproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
}
