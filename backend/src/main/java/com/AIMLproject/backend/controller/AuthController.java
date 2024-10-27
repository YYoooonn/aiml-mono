package com.AIMLproject.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.UserDto;
import com.AIMLproject.backend.dto.req.LoginReq;
import com.AIMLproject.backend.dto.res.LoginRes;
import com.AIMLproject.backend.service.AuthService;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {

	private final AuthService authService;
	private final UserService userService;

	@Autowired
	public AuthController(AuthService authService, UserService userService) {
		this.authService = authService;
		this.userService = userService;
	}

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody LoginReq req) { // check
		try {
			String jwtToken = authService.generateJwtToken(req.getUsername(), req.getPassword());
			User user = userService.getUser(req.getUsername());
			return ResponseEntity.status(HttpStatus.OK).body(new LoginRes(jwtToken, new UserDto(user)));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
	}
}
