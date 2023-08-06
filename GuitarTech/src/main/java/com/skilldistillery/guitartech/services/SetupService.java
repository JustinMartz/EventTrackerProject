package com.skilldistillery.guitartech.services;

import java.util.List;

import com.skilldistillery.guitartech.entities.Setup;

public interface SetupService {
	public List<Setup> findAllSetups();
	public Setup findSetupById(int setupId);
	public List<Setup> findSetupsByTuning(int tuningId);
	public List<Setup> findSetupsByGuitar(int guitarId);
	public Setup findMostRecent(int guitarId);
	public Setup create(Setup setup);
	public Setup update(int setupId, Setup setup);
	public boolean delete(int setupId);
}
