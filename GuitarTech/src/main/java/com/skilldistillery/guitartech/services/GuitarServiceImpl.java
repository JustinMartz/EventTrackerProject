package com.skilldistillery.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.guitartech.entities.Guitar;
import com.skilldistillery.guitartech.repositories.GuitarRepository;

@Service
public class GuitarServiceImpl implements GuitarService {

	@Autowired
	private GuitarRepository guitarRepo;

	@Override
	public Guitar findGuitar(int id) {
		Guitar guitar = null;
		Optional<Guitar> guitarOpt = guitarRepo.findById(id);
		if (guitarOpt.isPresent()) {
			guitar = guitarOpt.get();
		}
		return guitar;
	}

	@Override
	public List<Guitar> findAllGuitars() {
		return guitarRepo.findAll();
	}
	
	
}
