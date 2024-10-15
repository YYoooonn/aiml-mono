package com.AIMLproject.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public String saveUser(String username, String password) throws Exception {
		if (userRepository.findByUsername(username).isPresent()) {
			throw new Exception("User already exists");
		}
		final String encodedPassword = passwordEncoder.encode(password);
		User user = new User(username, encodedPassword);
		userRepository.save(user);
		return encodedPassword;
	}
}
