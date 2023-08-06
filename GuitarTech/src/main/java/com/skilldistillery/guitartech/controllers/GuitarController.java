package com.skilldistillery.guitartech.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping("guitars/tuning/{tuningId}")
	public List<Guitar> getAllGuitarsTuning(@PathVariable int tuningId) {
		return guitarServ.findAllByTuning(tuningId);
	}
	
	@GetMapping("guitars/bridge/{bridge}")
	public List<Guitar> getAllGuitarsBridge(@PathVariable String bridge) {
		return guitarServ.findAllByBridge(bridge);
	}
	
	@GetMapping("guitars/color/{color}")
	public List<Guitar> getAllGuitarsColor(@PathVariable String color, HttpServletResponse response) {
		List<Guitar> guitars = guitarServ.findAllByColor(color);
		response.setStatus(200);
		if (guitars == null) {
			response.setStatus(404);
		}
		return guitars;
	}
	
	@PostMapping("guitars")
	public Guitar createNewGuitar(@RequestBody Guitar guitar, HttpServletResponse response, HttpServletRequest request) {
		Guitar newGuitar = guitarServ.createNewGuitar(guitar);
		if (newGuitar == null) {
			response.setStatus(400);
		} else {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL().append("/" + newGuitar.getId());
			response.setHeader("Location", url.toString());
		}
		
		return newGuitar;
	}
	
	@PutMapping("guitars/{guitarId}")
	public Guitar updateGuitar(@PathVariable int guitarId, @RequestBody Guitar guitar, HttpServletResponse response) {
		Guitar updatedGuitar = guitarServ.updateGuitar(guitarId, guitar);
		if (updatedGuitar == null) {
			response.setStatus(400);
		} else {
			response.setStatus(200);
		}
		
		return updatedGuitar;
	}
	
	@DeleteMapping("guitars/{guitarId}")
	public void deleteGuitar(@PathVariable int guitarId, HttpServletResponse response) {
		if (guitarServ.deleteGuitar(guitarId)) {
			response.setStatus(204);
		} else {
			response.setStatus(400);
		}
	}
}
