package com.AIMLproject.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Obj;

public interface ObjectRepository extends JpaRepository<Obj, Long> {
}
