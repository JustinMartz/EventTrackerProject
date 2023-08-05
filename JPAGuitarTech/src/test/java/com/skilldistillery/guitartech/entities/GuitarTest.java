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

class GuitarTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Guitar guitar;
	
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
		guitar = em.find(Guitar.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		guitar = null;
	}

	@Test
	void test_Guitar_entity_mapping() {
		assertNotNull(guitar);
		assertEquals("Gibson", guitar.getMake());
		assertEquals("Les Paul Custom", guitar.getModel());
		assertEquals(2017, guitar.getYear());
		assertEquals("Black", guitar.getColor());
		assertEquals(24.75, guitar.getScaleLength());
		assertEquals(22, guitar.getNumberOfFrets());
		assertEquals(true, guitar.isHasCase());
		assertEquals("https://media.sweetwater.com/api/i/q-82__ha-84928b3fd694f1b9__hmac-eeb407415f6410b95c9b686d351900334bc1b4a7/images/closeup/750-LPCustEBGH_front.jpg", guitar.getImageUrl());
		assertEquals("Tune-O-Matic", guitar.getBridge());
	}
	
	@Test
	void test_Guitar_to_Tuning_relational_mapping() {
		assertNotNull(guitar);
		assertNotNull(guitar.getTuning());
		assertEquals("Eb Standard", guitar.getTuning().getName());
	}
	
	@Test
	void test_Guitar_to_List_of_Setup_relational_mapping() {
		assertNotNull(guitar);
		assertNotNull(guitar.getSetups());
		assertTrue(guitar.getSetups().size() > 0);
	}

}
