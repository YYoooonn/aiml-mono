package com.AIMLproject.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}

	public User saveUser(String username, String password, String firstName, String lastName, String email) throws
		RuntimeException {
		if (userRepository.findByUsername(username).isPresent()) {
			throw new RuntimeException("User already exist"); // to do: handle exception
		}
		String encodedPassword = passwordEncoder.encode(password);
		User user = new User(username, encodedPassword, firstName, lastName, email);
		return userRepository.save(user);
	}

	public User getUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException(username));
	}

	public User deleteUser(String username) {
		User user = getUserByUsername(username);
		userRepository.delete(user);
		return user;
	}
}
