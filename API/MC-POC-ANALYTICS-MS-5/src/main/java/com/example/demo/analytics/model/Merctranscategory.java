package com.example.demo.analytics.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Merctranscategory {
	
	@Id
	@GeneratedValue
	int id;
	String classification;
	String type;
	String merchantname;
	int merchantid;
	String description;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}
	/**
	 * @return the classification
	 */
	public String getClassification() {
		return classification;
	}
	/**
	 * @param classification the classification to set
	 */
	public void setClassification(String classification) {
		this.classification = classification;
	}
	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}
	/**
	 * @param type the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * @return the merchantname
	 */
	public String getMerchantname() {
		return merchantname;
	}
	/**
	 * @param merchantname the merchantname to set
	 */
	public void setMerchantname(String merchantname) {
		this.merchantname = merchantname;
	}
	/**
	 * @return the merchantid
	 */
	public int getMerchantid() {
		return merchantid;
	}
	/**
	 * @param merchantid the merchantid to set
	 */
	public void setMerchantid(int merchantid) {
		this.merchantid = merchantid;
	}
	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

}
