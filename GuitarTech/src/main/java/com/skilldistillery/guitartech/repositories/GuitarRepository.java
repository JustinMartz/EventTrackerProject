package com.skilldistillery.guitartech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.guitartech.entities.Guitar;

public interface GuitarRepository extends JpaRepository<Guitar, Integer> {
	public List<Guitar> findByTuning_Id(int tuningId);
	public List<Guitar> findByBridge(String bridge);
	public List<Guitar> findByColorLike(String color);
}
