package com.skilldistillery.guitartech.entities;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Setup {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "string_gauge")
	private String stringGauge;
	
	@Column(name = "string_brand")
	private String stringBrand;
	
	@Column(name = "date_of_setup")
	private LocalDate dateOfSetup;
	
	@Column(name = "action_treble")
	private int actionTreble;
	
	@Column(name = "action_bass")
	private int actionBass;
	
	private String notes;
	
	@ManyToOne
	@JoinColumn(name = "guitar_id")
	private Guitar guitar;
	
	@ManyToOne
	@JoinColumn(name = "tuning_id")
	private Tuning tuning;
	
	public Setup() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStringGauge() {
		return stringGauge;
	}

	public void setStringGauge(String stringGauge) {
		this.stringGauge = stringGauge;
	}

	public String getStringBrand() {
		return stringBrand;
	}

	public void setStringBrand(String stringBrand) {
		this.stringBrand = stringBrand;
	}

	public LocalDate getDateOfSetup() {
		return dateOfSetup;
	}

	public void setDateOfSetup(LocalDate dateOfSetup) {
		this.dateOfSetup = dateOfSetup;
	}

	public int getActionTreble() {
		return actionTreble;
	}

	public void setActionTreble(int actionTreble) {
		this.actionTreble = actionTreble;
	}

	public int getActionBass() {
		return actionBass;
	}

	public void setActionBass(int actionBass) {
		this.actionBass = actionBass;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public Guitar getGuitar() {
		return guitar;
	}

	public void setGuitar(Guitar guitar) {
		this.guitar = guitar;
	}

	public Tuning getTuning() {
		return tuning;
	}

	public void setTuning(Tuning tuning) {
		this.tuning = tuning;
	}

	@Override
	public String toString() {
		return "Setup [id=" + id + ", stringGauge=" + stringGauge + ", stringBrand=" + stringBrand + ", dateOfSetup="
				+ dateOfSetup + ", actionTreble=" + actionTreble + ", actionBass=" + actionBass + ", notes=" + notes
				+ ", guitar=" + guitar + ", tuning=" + tuning + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Setup other = (Setup) obj;
		return id == other.id;
	}
	
	
}
