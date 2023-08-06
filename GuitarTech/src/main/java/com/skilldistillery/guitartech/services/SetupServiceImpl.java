package com.skilldistillery.guitartech.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.guitartech.entities.Setup;
import com.skilldistillery.guitartech.repositories.GuitarRepository;
import com.skilldistillery.guitartech.repositories.SetupRepository;
import com.skilldistillery.guitartech.repositories.TuningRepository;

@Service
public class SetupServiceImpl implements SetupService {
	
	@Autowired
	private SetupRepository setupRepo;
	
	@Autowired
	private TuningRepository tuningRepo;
	
	@Autowired
	private GuitarRepository guitarRepo;

	@Override
	public List<Setup> findAllSetups() {
		return setupRepo.findAll();
	}

	@Override
	public Setup findSetupById(int setupId) {
		Optional<Setup> setupOpt = setupRepo.findById(setupId);
		if (setupOpt.isPresent()) {
			Setup setup = setupOpt.get();
			return setup;
		}
		return null;
	}

	@Override
	public List<Setup> findSetupsByTuning(int tuningId) {
		if (tuningRepo.existsById(tuningId)) {
			return setupRepo.findByTuning_Id(tuningId);
		}
		return null;
	}

	@Override
	public List<Setup> findSetupsByGuitar(int guitarId) {
		if (guitarRepo.existsById(guitarId)) {
			return setupRepo.findByGuitar_Id(guitarId);
		}
		return null;
	}

	@Override
	public Setup findMostRecent(int guitarId) {
		if (guitarRepo.existsById(guitarId)) {
			List<Setup> setups = setupRepo.findByGuitar_IdOrderByDateOfSetupDesc(guitarId);
			if (setups != null) {
				Setup setup = setups.get(0);
				return setup;
			}
		}
		return null;
	}

	@Override
	public Setup create(Setup setup) {
		if (!setupRepo.existsById(setup.getId())) {
			if (setup.getStringGauge() == null || setup.getStringGauge() == "") {
				return null;
			}
			
			if (setup.getDateOfSetup() == null) {
				return null;
			}
			
			if (setup.getGuitar() == null) {
				return null;
			} else if (guitarRepo.existsById(setup.getGuitar().getId())) {
				setup.setGuitar(guitarRepo.findById(setup.getGuitar().getId()).get());
			} else {
				return null;
			}
			
			if (setup.getTuning() == null) {
				return null;
			} else if (tuningRepo.existsById(setup.getTuning().getId())) {
				setup.setTuning(tuningRepo.findById(setup.getTuning().getId()).get());
			} else {
				return null;
			}
			
			return setupRepo.saveAndFlush(setup);
		}
		return null;
	}

	@Override
	public Setup update(int setupId, Setup setup) {
		if (setupRepo.existsById(setupId)) {
			Optional<Setup> setupOpt = setupRepo.findById(setupId);
			Setup exists = setupOpt.get();
			
			if (setup.getStringGauge() == null || setup.getStringGauge() == "") {
				setup.setStringGauge(exists.getStringGauge());
			}
			
			if (setup.getStringBrand() == null || setup.getStringBrand() == "") {
				setup.setStringBrand(exists.getStringBrand());
			}
			
			if (setup.getDateOfSetup() == null) {
				setup.setDateOfSetup(exists.getDateOfSetup());
			}
			
			if (setup.getActionTreble() == 0) {
				setup.setActionTreble(exists.getActionTreble());
			}
			
			if (setup.getActionBass() == 0) {
				setup.setActionBass(exists.getActionBass());
			}
			
			if (setup.getNotes() == null || setup.getNotes() == "") {
				setup.setNotes(exists.getNotes());
			}
			
			if (setup.getGuitar() == null) {
				setup.setGuitar(exists.getGuitar());
			}
			
			if (setup.getTuning() == null) {
				setup.setTuning(exists.getTuning());
			}
			
			setup.setId(exists.getId());
			return setupRepo.saveAndFlush(setup);
		}
		return null;
	}

	@Override
	public boolean delete(int setupId) {
		if (setupRepo.existsById(setupId)) {
			setupRepo.deleteById(setupId);
			if (!setupRepo.existsById(setupId)) {
				return true;
			}
		}
		return false;
	}

}
