package com.AIMLproject.backend.dto;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ParticipantDto {

	private User user;
	private Boolean isOwner;
	private Boolean readOnly;

	public ParticipantDto(UserProject userProject) {
		this.user = userProject.getUser();
		this.isOwner = userProject.getIsOwner();
		this.readOnly = userProject.getReadOnly();
	}
}
