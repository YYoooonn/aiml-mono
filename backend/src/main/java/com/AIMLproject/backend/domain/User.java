package com.AIMLproject.backend.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
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
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userId;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(nullable = false)
	private String encodedPassword;

	@Column(nullable = true)
	private String firstName;

	@Column(nullable = true)
	private String lastName;

	@Column(nullable = true)
	private String email;

	@CreatedDate
	private Date createdAt;

	@LastModifiedDate
	private Date lastModifiedAt;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn
	private List<Project> projects;

	public User(String username, String encodedPassword, String firstName, String lastName, String email) {
		this.username = username;
		this.encodedPassword = encodedPassword;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.projects = new ArrayList<>();
	}

	public User() {
	}
}
