package com.AIMLproject.backend.domain;

import java.util.Date;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Obj {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long objectId;

	@Column(columnDefinition = "json")
	private String geometry;

	@Column(columnDefinition = "json")
	private String material;

	@Column(columnDefinition = "json")
	private String others;

	@CreatedDate
	private Date createdAt;

	@LastModifiedDate
	private Date lastModifiedAt;

	@CreatedBy
	private String createdBy; // username

	@LastModifiedBy
	private String lastModifiedBy; // username

	public Obj(String geometry, String material, String others, Project project, String username) {
		this.geometry = geometry;
		this.material = material;
		this.others = others;
		this.createdBy = username;
		this.lastModifiedBy = username;
	}

	public Obj() {
	}
}
