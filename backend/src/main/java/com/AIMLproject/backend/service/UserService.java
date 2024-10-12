package com.AIMLproject.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public String registerUser(String username, String password) {
		// Check if the username already exists
		Optional<User> existingUser = userRepository.findByUsername(username);

		if (existingUser.isPresent()) {
			return "fail"; // If the user already exists, return "fail"
		}

		// Save new user
		User newUser = new User(username, password);
		userRepository.save(newUser);

		return "success"; // If the registration is successful, return "success"
	}

	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
}

