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

import com.skilldistillery.guitartech.entities.Setup;
import com.skilldistillery.guitartech.services.SetupService;

@RestController
@RequestMapping("api")
public class SetupController {

	@Autowired
	private SetupService setupServ;
	
	@GetMapping("setups")
	public List<Setup> getAllSetups(HttpServletResponse response) {
		List<Setup> setups = setupServ.findAllSetups();
		if (setups == null) {
			response.setStatus(404);
		} else {
			response.setStatus(200);
		}
		return setups;
	}
	
	@GetMapping("setups/{setupId}")
	public Setup getSetup(@PathVariable int setupId, HttpServletResponse response) {
		Setup setup = setupServ.findSetupById(setupId);
		if (setup == null) {
			response.setStatus(404);
		} else {
			response.setStatus(200);
		}
		
		return setup;
	}
	
	@GetMapping("setups/tuning/{tuningId}")
	public List<Setup> getSetupsByTuning(@PathVariable int tuningId, HttpServletResponse response) {
		List<Setup> setups = setupServ.findSetupsByTuning(tuningId);
		if (setups == null) {
			response.setStatus(404);
		} else {
			response.setStatus(200);
		}
		
		return setups;
	}
	
	@GetMapping("setups/guitar/{guitarId}")
	public List<Setup> getSetupsByGuitar(@PathVariable int guitarId, HttpServletResponse response) {
		List<Setup> setups = setupServ.findSetupsByGuitar(guitarId);
		if (setups == null) {
			response.setStatus(404);
		} else {
			response.setStatus(200);
		}
		
		return setups;
	}
	
	@GetMapping("setups/current/{guitarId}")
	public Setup getCurrentSetup(@PathVariable int guitarId, HttpServletResponse response) {
		Setup setup = setupServ.findMostRecent(guitarId);
		if (setup == null) {
			response.setStatus(404);
		} else {
			response.setStatus(200);
		}
		
		return setup;
	}
	
	@PostMapping("setups")
	public Setup createSetup(@RequestBody Setup setup, HttpServletResponse response, HttpServletRequest request) {
		System.out.println("**************** setup coming into controller");
		System.out.println(setup);
		Setup newSetup = setupServ.create(setup);
		if (newSetup == null) {
			response.setStatus(400);
			return null;
		} else {
			StringBuffer url = request.getRequestURL();
			url.append("/" + newSetup.getId());
			response.setHeader("Location", url.toString());
			response.setStatus(201);
		}
		
		return newSetup;
	}
	
	@PutMapping("setups/{setupId}")
	public Setup updateSetup(@PathVariable int setupId, @RequestBody Setup setup, HttpServletResponse response) {
		Setup updated = setupServ.update(setupId, setup);
		if (updated == null) {
			response.setStatus(400);
		} else {
			response.setStatus(200);
		}
		
		return updated;
	}
	
	@DeleteMapping("setups/{setupId}")
	public void deleteSetup(@PathVariable int setupId, HttpServletResponse response) {
		if (setupServ.delete(setupId)) {
			response.setStatus(204);
		} else {
			response.setStatus(400);
		}
	}
}
