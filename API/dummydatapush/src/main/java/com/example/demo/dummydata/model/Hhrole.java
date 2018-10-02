package com.example.demo.dummydata.model;

import javax.persistence.*;
import java.sql.*;

@Entity
public class Hhrole {
	  
	 @Id
	  private String id;
	  private String  custid;
	  private String householdid;
	  private String role;
	  private Timestamp created_at;
	  private Timestamp updated_at;
	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}
	/**
	 * @return the custid
	 */
	public String getCustid() {
		return custid;
	}
	/**
	 * @param custid the custid to set
	 */
	public void setCustid(String custid) {
		this.custid = custid;
	}
	/**
	 * @return the householdid
	 */
	public String getHouseholdid() {
		return householdid;
	}
	/**
	 * @param householdid the householdid to set
	 */
	public void setHouseholdid(String householdid) {
		this.householdid = householdid;
	}
	/**
	 * @return the role
	 */
	public String getRole() {
		return role;
	}
	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}
	/**
	 * @return the created_at
	 */
	public Timestamp getCreated_at() {
		return created_at;
	}
	/**
	 * @param created_at the created_at to set
	 */
	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}
	/**
	 * @return the updated_at
	 */
	public Timestamp getUpdated_at() {
		return updated_at;
	}
	/**
	 * @param updated_at the updated_at to set
	 */
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	  

}
