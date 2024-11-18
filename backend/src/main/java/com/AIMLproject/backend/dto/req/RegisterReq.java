package com.AIMLproject.backend.dto.req;

import lombok.Getter;

@Getter
public class RegisterReq {
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String email;
}
