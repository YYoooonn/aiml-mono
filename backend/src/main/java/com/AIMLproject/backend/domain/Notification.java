package com.AIMLproject.backend.domain;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
public class Notification {

	@Id
	@GeneratedValue
	private Long notificationId;

	@ManyToOne
	private User sender;

	@ManyToOne
	private User receiver;

	private String message;

}
