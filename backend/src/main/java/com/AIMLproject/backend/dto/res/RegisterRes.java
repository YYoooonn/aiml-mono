package com.AIMLproject.backend.dto.res;

import com.AIMLproject.backend.domain.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterRes {
	private User user;
}
