package com.AIMLproject.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(UsernameNotFoundException.class)
	public ResponseEntity<String> handleUsernameNotFoundException(UsernameNotFoundException exp) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User Not Found with username: " + exp.getMessage());
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<String> handleRuntimeException(RuntimeException exp) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exp.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<String> handleAllExceptions(Exception exp) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body("Internal Server Error");
	}
}
