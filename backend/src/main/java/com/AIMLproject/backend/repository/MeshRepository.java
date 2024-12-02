package com.AIMLproject.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Mesh;
import com.AIMLproject.backend.domain.Project;

public interface MeshRepository extends JpaRepository<Mesh, Long> {
	List<Mesh> findByProject(Project project);
}
