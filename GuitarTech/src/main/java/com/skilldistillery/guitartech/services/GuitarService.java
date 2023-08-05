package com.skilldistillery.guitartech.services;

import java.util.List;

import com.skilldistillery.guitartech.entities.Guitar;

public interface GuitarService {
	public Guitar findGuitar(int id);
	public List<Guitar> findAllGuitars();
}
