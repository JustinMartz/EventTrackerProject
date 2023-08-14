package com.skilldistillery.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.guitartech.entities.Guitar;
import com.skilldistillery.guitartech.entities.Setup;
import com.skilldistillery.guitartech.entities.Tuning;
import com.skilldistillery.guitartech.repositories.GuitarRepository;
import com.skilldistillery.guitartech.repositories.SetupRepository;

@Service
public class GuitarServiceImpl implements GuitarService {

	@Autowired
	private GuitarRepository guitarRepo;
	
	@Autowired
	private SetupRepository setupRepo;

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

	@Override
	public List<Guitar> findAllByTuning(int tuningId) {
		if (guitarRepo.existsById(tuningId)) {
			List<Guitar> guitars = guitarRepo.findByTuning_Id(tuningId);
			return guitars;
		}
		return null;
	}

	@Override
	public List<Guitar> findAllByBridge(String bridge) {
		if (bridge != null) {
			return guitarRepo.findByBridge(bridge);
		}
		return null;
	}

	@Override
	public List<Guitar> findAllByColor(String color) {
		if (color != null) {
			color = "%" + color + "%";
			return guitarRepo.findByColorLike(color);
		}
		return null;
	}

	@Override
	public Guitar createNewGuitar(Guitar guitar) {
		System.out.println("**********************************");
		System.out.println(guitar);
		if (guitar != null && !guitarRepo.existsById(guitar.getId())) {
			if (guitar.getMake() == "" || guitar.getMake() == null) {
				return null;
			}
			
			if (guitar.getModel() == "" || guitar.getModel() == null) {
				return null;
			}
			
			if (guitar.getTuning() == null) {
				// FIXME use tuningRepo to pull existing tuning entity
				Tuning tuning = new Tuning();
				tuning.setId(1);
				guitar.setTuning(tuning);
			}
			
			return guitarRepo.saveAndFlush(guitar);
		}
		
		return null;
	}

	@Override
	public Guitar updateGuitar(int guitarId, Guitar guitar) {
		if (guitarRepo.existsById(guitarId)) {
			Optional<Guitar> existingOpt = guitarRepo.findById(guitarId);
			Guitar existing = existingOpt.get();
			
			if (guitar.getMake() == "" || guitar.getMake() == null) {
				guitar.setMake(existing.getMake());
			}
			
			if (guitar.getModel() == "" || guitar.getMake() == null) {
				guitar.setModel(existing.getModel());
			}
			
			if (guitar.getTuning() == null) {
				guitar.setTuning(existing.getTuning());
			}
			
			guitar.setId(guitarId);
			return guitarRepo.saveAndFlush(guitar);
		}
		return null;
	}

	@Override
	public boolean deleteGuitar(int guitarId) {
		// if setup(s) exist for this guitar, delete those first
		List<Setup> setups = setupRepo.findByGuitar_Id(guitarId);
		if (setups.size() > 0) {
			for (Setup setup : setups) {
				// delete em all
				setupRepo.delete(setup);
			}
		}
		if (guitarRepo.existsById(guitarId)) {
			guitarRepo.deleteById(guitarId);
			if (!guitarRepo.existsById(guitarId)) {
				System.out.print("Guitar " + guitarId + " is deleted!");
				return true;
			}
		}
		return false;
	}
	
	
	
}
