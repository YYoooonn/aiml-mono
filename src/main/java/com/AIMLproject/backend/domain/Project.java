package com.AIMLproject.backend.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
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

	@Column(nullable = true)
	private String subtitle;

	@Column(nullable = false)
	private Boolean isPublic;

	@CreatedDate
	private Date createdAt;

	@LastModifiedDate
	private Date lastModifiedAt;

	@CreatedBy
	private String createdBy; // username

	@LastModifiedBy
	private String lastModifiedBy; // username

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn
	private List<Participant> participants;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn
	private List<Obj> objects;

	public Project(String title, String subtitle, String username) {
		this.title = title;
		this.subtitle = subtitle;
		this.isPublic = true;
		this.createdBy = username;
		this.lastModifiedBy = username;
		this.participants = new ArrayList<>(List.of(new Participant(username, true, false)));
		this.objects = new ArrayList<>();
	}

	public Project() {
	}
}
