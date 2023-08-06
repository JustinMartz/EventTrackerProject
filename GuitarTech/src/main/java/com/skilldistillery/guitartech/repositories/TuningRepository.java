package com.skilldistillery.guitartech.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.guitartech.entities.Tuning;

public interface TuningRepository extends JpaRepository<Tuning, Integer> {

}
