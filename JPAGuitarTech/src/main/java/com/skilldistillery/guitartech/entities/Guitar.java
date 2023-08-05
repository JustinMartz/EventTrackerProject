package com.skilldistillery.guitartech.entities;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Guitar {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String make;
	
	private String model;
	
	private int year;
	
	private String color;
	
	@Column(name = "scale_length")
	private double scaleLength;
	
	@Column(name = "number_of_frets")
	private int numberOfFrets;
	
	@Column(name = "has_case")
	private boolean hasCase;
	
	@Column(name = "image_url")
	private String imageUrl;
	
	private String bridge;
	
	@ManyToOne
	@JoinColumn(name = "tuning_id")
	private Tuning tuning;
	
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

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public double getScaleLength() {
		return scaleLength;
	}

	public void setScaleLength(double scaleLength) {
		this.scaleLength = scaleLength;
	}

	public int getNumberOfFrets() {
		return numberOfFrets;
	}

	public void setNumberOfFrets(int numberOfFrets) {
		this.numberOfFrets = numberOfFrets;
	}

	public boolean isHasCase() {
		return hasCase;
	}

	public void setHasCase(boolean hasCase) {
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
