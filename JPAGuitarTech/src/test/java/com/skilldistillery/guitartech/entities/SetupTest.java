package com.skilldistillery.guitartech.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class SetupTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Setup setup;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("JPAGuitarTech");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		setup = em.find(Setup.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		setup = null;
	}

	@Test
	void test_Setup_entity_mapping() {
		assertNotNull(setup);
		assertEquals("10-46", setup.getStringGauge());
		assertEquals("D'Addario NYXL", setup.getStringBrand());
		assertEquals(2023, setup.getDateOfSetup().getYear());
		assertEquals(3, setup.getActionTreble());
		assertEquals(4, setup.getActionBass());
		assertEquals("A little light, maybe try 10-48/52 next time", setup.getNotes());
	}
	
	@Test
	void test_Setup_to__Guitar_relational_mapping() {
		assertNotNull(setup);
		assertNotNull(setup.getGuitar());
		assertEquals("Les Paul Custom", setup.getGuitar().getModel());
	}
	
	@Test
	void test_Setup_to_Tuning_relational_mapping() {
		assertNotNull(setup);
		assertNotNull(setup.getTuning());
		assertEquals("Eb Standard", setup.getTuning().getName());
	}

}
