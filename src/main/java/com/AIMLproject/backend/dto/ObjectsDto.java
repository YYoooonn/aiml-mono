package com.AIMLproject.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.AIMLproject.backend.domain.Obj;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ObjectsDto {
	private List<ObjectDto> objects;

	public ObjectsDto(List<Obj> objects) {
		this.objects = objects.stream()
			.map(ObjectDto::new)
			.collect(Collectors.toList());
	}
}
