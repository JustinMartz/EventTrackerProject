package com.skilldistillery.guitartech.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.guitartech.entities.Setup;

public interface SetupRepository extends JpaRepository<Setup, Integer>{
	public List<Setup> findAll();
	public List<Setup> findByTuning_Id(int tuningId);
	public List<Setup> findByGuitar_Id(int guitarId);
	public List<Setup> findByGuitar_IdOrderByDateOfSetupDesc(int guitarId);
}
