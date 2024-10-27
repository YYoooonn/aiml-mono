package com.AIMLproject.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.repository.ProjectRepository;
import com.AIMLproject.backend.repository.UserRepository;

@Service
public class UserService {

	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final ProjectRepository projectRepository;

	@Autowired
	public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository,
		ProjectRepository projectRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.projectRepository = projectRepository;
	}

	public User saveUser(String username, String firstName, String lastName, String password) throws Exception {
		if (userRepository.findByUsername(username).isPresent()) {
			throw new Exception("User already exists");                                                        // to do
		}
		String encodedPassword = passwordEncoder.encode(password);
		User user = new User(username, firstName, lastName, encodedPassword);
		return userRepository.save(user);
	}

	public User getUser(String username) throws UsernameNotFoundException {
		return userRepository.findByUsername(username)
			.orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
	}

	public Project addNewProject(String username, String title, String subtitle) {
		Project project = new Project(title, subtitle, getUser(username));
		return projectRepository.save(project);
	}

	public List<Project> getAllProjects(String username) {
		User user = getUser(username);
		return user.getProjects();
	}
}
