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

class TuningTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Tuning tuning;
	
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
		tuning = em.find(Tuning.class, 2);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tuning = null;
	}

	@Test
	void test_Tuning_entity_mapping() {
		assertNotNull(tuning);
		assertEquals("Eb Standard", tuning.getName());
	}
	
	@Test
	void test_Tuning_to_List_of_Guitar_relational_mapping() {
		assertNotNull(tuning);
		assertNotNull(tuning.getGuitars());
		assertTrue(tuning.getGuitars().size() > 0);
		
	}

}
