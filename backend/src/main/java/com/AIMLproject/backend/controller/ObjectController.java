package com.AIMLproject.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.AIMLproject.backend.domain.CustomObject;
import com.AIMLproject.backend.domain.User;
import com.AIMLproject.backend.dto.req.ObjectReq;
import com.AIMLproject.backend.dto.res.ObjectRes;
import com.AIMLproject.backend.service.ObjectService;
import com.AIMLproject.backend.service.ProjectService;
import com.AIMLproject.backend.service.UserService;

@RestController
@RequestMapping("/api")
public class ObjectController {

	private final UserService userService;
	private final ProjectService projectService;
	private final ObjectService objectService;

	@Autowired
	public ObjectController(UserService userService, ProjectService projectService, ObjectService objectService) {
		this.userService = userService;
		this.projectService = projectService;
		this.objectService = objectService;
	}

	@PostMapping("/projects/{projectId}/objects")
	public ResponseEntity<ObjectRes> createObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long projectId, @RequestBody ObjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		CustomObject newObject = objectService.createObject(user, projectId, req.getMatrix(), req.getGeometry(),
			req.getMaterial());
		ObjectRes res = new ObjectRes(newObject);
		return ResponseEntity.ok(res);
	}

	@GetMapping("/objects/{objectId}") // *******************************************************
	public ResponseEntity<ObjectRes> afs(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long objectId) {
		User user = (userDetails != null) ? userService.findUserByUsername(userDetails.getUsername()) : null;
		CustomObject object = objectService.getPublicObject(user, objectId);
		ObjectRes res = new ObjectRes(object);
		return ResponseEntity.ok(res);
	}

	@PutMapping("/objects/{objectId}")
	public ResponseEntity<ObjectRes> updateObject(@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable Long objectId, @RequestBody ObjectReq req) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		CustomObject updatedObject = objectService.updateObject(user, objectId, req.getMatrix(), req.getGeometry(),
			req.getMaterial());
		ObjectRes res = new ObjectRes(updatedObject);
		return ResponseEntity.ok(res);
	}

	@DeleteMapping("/objects/{objectId}")
	public ResponseEntity<Void> method(@AuthenticationPrincipal UserDetails userDetails, @PathVariable Long objectId) {
		User user = userService.findUserByUsername(userDetails.getUsername());
		objectService.deleteObject(user, objectId);
		return ResponseEntity.ok().build();
	}
}
