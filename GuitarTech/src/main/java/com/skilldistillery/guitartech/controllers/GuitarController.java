package com.skilldistillery.guitartech.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.guitartech.entities.Guitar;
import com.skilldistillery.guitartech.services.GuitarService;

@RestController
@RequestMapping("api")
public class GuitarController {

	@Autowired
	private GuitarService guitarServ;
	
	
	@GetMapping("guitars/{guitarId}")
	public Guitar getGuitar(@PathVariable int guitarId) {
		return guitarServ.findGuitar(guitarId);
	}
	
	@GetMapping("guitars")
	public List<Guitar> getAllGuitars() {
		return guitarServ.findAllGuitars();
	}
}
