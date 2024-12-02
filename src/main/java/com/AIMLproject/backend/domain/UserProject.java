package com.AIMLproject.backend.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@EntityListeners(AuditingEntityListener.class)
public class UserProject {

	@Id
	@GeneratedValue
	private Long userProjectId;

	// Audit
	@CreatedDate
	private LocalDateTime createdAt;
	@LastModifiedDate
	private LocalDateTime lastModifiedAt;
	// @CreatedBy
	// private Long createdBy;
	// @LastModifiedBy
	// private Long lastModifiedBy;

	@JsonIgnore
	@ManyToOne
	private User user;
	@JsonIgnore
	@ManyToOne
	private Project project;

	// Auth
	private Boolean isOwner;
	private Boolean readOnly;

	public UserProject(User user, Project project, Boolean isOwner, Boolean readOnly) {
		this.user = user;
		this.project = project;
		this.isOwner = isOwner;
		this.readOnly = readOnly;
	}

	public UserProject() {

	}
}
