package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.domain.UserProject;
import com.AIMLproject.backend.repository.UserProjectRepository;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final UserProjectRepository userProjectRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
		UserProjectRepository userProjectRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.userProjectRepository = userProjectRepository;
	}

	public List<UserProject> findParticipantsByProject(Project project) {
		return userProjectRepository.findByProject(project);
	}

	public User findUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
	}

	public User saveUser(String username, String password, String firstName, String lastName, String email) throws
		RuntimeException {
		if (userRepository.findByUsername(username).isPresent()) {
			throw new RuntimeException("User already exists with username: " + username); // to do: handle Exception
		}
		String encodedPassword = passwordEncoder.encode(password);
		User user = new User(username, encodedPassword, firstName, lastName, email);
		return userRepository.save(user);
	}

	public User updateUser(String username, String firstName, String lastName, String email) {
		User user = findUserByUsername(username);
		if (firstName != null) {
			user.setFirstName(firstName);
		}
		if (lastName != null) {
			user.setLastName(lastName);
		}
		if (email != null) {
			user.setEmail(email);
		}
		return userRepository.save(user);
	}

	public void deleteUser(String username) {
		User user = findUserByUsername(username);
		userRepository.delete(user);
	}

	public void checkInvitorIsOwner(User invitor, Project project) {

		/**
		 *
		 *
		 *
		 *
		 *
		 *



		 */

	}
}
