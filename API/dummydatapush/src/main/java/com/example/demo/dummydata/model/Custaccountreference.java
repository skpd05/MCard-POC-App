package com.example.demo.dummydata.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Custaccountreference {
	
	@Id
	private String id;
	private String fromrange;
	private String torange;
	private String programid;
	private String ica;
	private Timestamp created_at;
	private Timestamp updated_at;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFromrange() {
		return fromrange;
	}
	public void setFromrange(String fromrange) {
		this.fromrange = fromrange;
	}
	public String getTorange() {
		return torange;
	}
	public void setTorange(String torange) {
		this.torange = torange;
	}
	public String getProgramid() {
		return programid;
	}
	public void setProgramid(String programid) {
		this.programid = programid;
	}
	public String getIca() {
		return ica;
	}
	public void setIca(String ica) {
		this.ica = ica;
	}
	public Timestamp getCreated_at() {
		return created_at;
	}
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}

	

}
