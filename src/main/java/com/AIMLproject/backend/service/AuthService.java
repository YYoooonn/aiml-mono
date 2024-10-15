package com.AIMLproject.backend.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.jwt.JwtUtil;

@Service
public class AuthService {

	private final AuthenticationManager authManager;
	private final JwtUtil jwtUtil;

	@Autowired
	public AuthService(AuthenticationManager authManager, JwtUtil jwtUtil) {
		this.authManager = authManager;
		this.jwtUtil = jwtUtil;
	}

	public String generateToken(String username, String password) throws Exception {
		try {
			authManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		} catch (Exception e) {
			throw new Exception("Invalid username or password");
		}
		UserDetails userDetails = new User(username, password, new ArrayList<>());
		return jwtUtil.generateToken(userDetails);
	}
}
