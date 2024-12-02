package com.AIMLproject.backend.dto.res;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Mesh;
import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.dto.ParticipantDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProjectRes {

	private Long projectId;

	private LocalDateTime createdAt;
	private LocalDateTime lastModifiedAt;
	// private Long createdBy;
	// private Long lastModifiedBy;
	private Boolean isPublic;
	private String title;
	private String subtitle;

	private List<Mesh> objects;

	private List<ParticipantDto> participants; // 해당 프로젝트를 참여하고 있는 유저정보 without Project

	public ProjectRes(Project project, List<Mesh> objects, List<UserProject> userProjects) {
		this.projectId = project.getProjectId();
		this.createdAt = project.getCreatedAt();
		this.lastModifiedAt = project.getLastModifiedAt();
		// this.createdBy = project.getCreatedBy();
		// this.lastModifiedBy = project.getLastModifiedBy();
		this.isPublic = project.getIsPublic();
		this.title = project.getTitle();
		this.subtitle = project.getSubtitle();
		this.objects = objects;
		this.participants = userProjects.stream()
			.map(ParticipantDto::new)
			.collect(Collectors.toList());
	}

}
