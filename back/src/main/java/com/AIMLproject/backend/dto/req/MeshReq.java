package com.AIMLproject.backend.dto.req;

import java.util.List;

import lombok.Getter;

@Getter
public class MeshReq {

	private List<Double> matrix;
	private String geometry;
	private String material;
}
