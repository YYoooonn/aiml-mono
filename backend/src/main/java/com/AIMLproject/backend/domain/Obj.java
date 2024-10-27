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

	@Column(nullable = false)            // to do
	private String data;                // to do

	@ManyToOne(fetch = FetchType.LAZY)    // to do
	@JoinColumn(name = "projectId")        // to do
	private Project project;

	public Obj(String data, Project project) {
		this.data = data;
		this.project = project;
	}

	public Obj() {
	}
}
