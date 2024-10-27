package com.AIMLproject.backend.dto.res;

import com.AIMLproject.backend.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginRes {
	private String token;
	private String username;
}
