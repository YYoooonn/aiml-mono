package com.AIMLproject.backend.controller;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.service.UserService;

@CrossOrigin(origins = {"http://ec2-15-165-90-147.ap-northeast-2.compute.amazonaws.com/"})
@RestController
@RequestMapping("/api/users")
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/{username}")
	public String register(@PathVariable String username) {
		Optional<User> findingUser = userService.findByUsername(username);
		if (findingUser.isPresent()) {
			return "Username is already taken";
		}
		return "no such user";

	}

	@PostMapping("/register")
	public String register(@RequestParam HashMap<String, String> user) {
		String username = user.get("username");
		String password = user.get("password");
		return userService.registerUser(username, password); // Return "success" or "fail"
	}
}
