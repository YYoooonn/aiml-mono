package com.AIMLproject.backend.domain;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long projectId;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String subtitle;

	@ManyToOne(fetch = FetchType.LAZY)    // to do
	@JoinColumn(name = "userId")        // to do
	private User user;

	@OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)    // to do
	private List<Obj> objects;

	public Project(String title, String subtitle, User user) {
		this.title = title;
		this.subtitle = subtitle;
		this.user = user;
		this.objects = new ArrayList<>();
	}

	public Project() {
	}
}
