package com.skilldistillery.guitartech.entities;

import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"setups"})
public class Guitar {
	
	// FIXME consider tuning as part of setup, not guitar
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String make;
	
	private String model;
	
	private Integer year;
	
	private String color;
	
	@Column(name = "scale_length")
	private Double scaleLength;
	
	@Column(name = "number_of_frets")
	private Integer numberOfFrets;
	
	@Column(name = "has_case")
	private Boolean hasCase;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	private String bridge;
	
	@ManyToOne
	@JoinColumn(name = "tuning_id")
	private Tuning tuning;
	
	@OneToMany(mappedBy = "guitar")
	private List<Setup> setups;
	
	public Guitar() {
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getMake() {
		return make;
	}

	public void setMake(String make) {
		this.make = make;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public Double getScaleLength() {
		return scaleLength;
	}

	public void setScaleLength(Double scaleLength) {
		this.scaleLength = scaleLength;
	}

	public Integer getNumberOfFrets() {
		return numberOfFrets;
	}

	public void setNumberOfFrets(Integer numberOfFrets) {
		this.numberOfFrets = numberOfFrets;
	}

	public Boolean isHasCase() {
		return hasCase;
	}

	public void setHasCase(Boolean hasCase) {
		this.hasCase = hasCase;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBridge() {
		return bridge;
	}

	public void setBridge(String bridge) {
		this.bridge = bridge;
	}

	public Tuning getTuning() {
		return tuning;
	}

	public void setTuning(Tuning tuning) {
		this.tuning = tuning;
	}

	public List<Setup> getSetups() {
		return setups;
	}

	public void setSetups(List<Setup> setups) {
		this.setups = setups;
	}

	@Override
	public String toString() {
		return "Guitar [id=" + id + ", make=" + make + ", model=" + model + ", year=" + year + ", color=" + color
				+ ", scaleLength=" + scaleLength + ", numberOfFrets=" + numberOfFrets + ", hasCase=" + hasCase
				+ ", imageUrl=" + imageUrl + ", bridge=" + bridge + "]";
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
		Guitar other = (Guitar) obj;
		return id == other.id;
	}
	
	

}
