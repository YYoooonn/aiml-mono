package com.AIMLproject.backend.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
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
public class Project {

	@Id
	@GeneratedValue
	private Long projectId;

	// Audit // to do: how to audit CreatedBy and LastModifiedBy
	@CreatedDate
	private LocalDateTime createdAt;
	@LastModifiedDate
	private LocalDateTime lastModifiedAt;
	// @CreatedBy
	// private Long createdBy;
	// @LastModifiedBy
	// private Long lastModifiedBy;

	@JsonIgnore
	@ManyToOne(cascade = CascadeType.REMOVE)
	private User user;

	// Auth
	private Boolean isPublic;

	// Info
	private String title;
	private String subtitle;

	public Project(User user, Boolean isPublic, String title, String subtitle) {
		this.user = user;
		this.isPublic = isPublic;
		this.title = title;
		this.subtitle = subtitle;
	}

	public Project() {

	}
}
