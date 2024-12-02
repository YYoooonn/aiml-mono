package com.AIMLproject.backend.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.dto.req.UserReq;
import com.AIMLproject.backend.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

	private final AuthService authService;

	@Autowired
	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/auth/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody UserReq req) {
		String token = authService.generateToken(req.getUsername(), req.getPassword());
		Map<String, String> res = new HashMap<>();
		res.put("token", token);
		return ResponseEntity.ok(res);
	}
}
