package com.AIMLproject.backend.domain;

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
public class Participant {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long participantId;

	@Column(nullable = false)
	private String username;

	@Column(nullable = false)
	private Boolean isOwner;

	@Column(nullable = false)
	private Boolean readOnly;

	public Participant(String username, Boolean isOwner, Boolean readOnly) {
		this.username = username;
		this.isOwner = isOwner;
		this.readOnly = readOnly;
	}

	public Participant() {
	}
}
