package com.AIMLproject.backend.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "projectId")
	private Project project;

	public Obj(String geometry, String material, String others, Project project) {
		this.geometry = geometry;
		this.material = material;
		this.others = others;
		this.project = project;
	}

	public Obj() {
	}
}
