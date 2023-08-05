package com.skilldistillery.guitartech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.guitartech.entities.Guitar;

public interface GuitarRepository extends JpaRepository<Guitar, Integer> {
	
}
