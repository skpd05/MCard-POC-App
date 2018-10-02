package com.example.demo.dummydata.model;

import java.sql.Timestamp;

import javax.persistence.Entity;

import javax.persistence.Id;


@Entity
public class Account {
	
	 
	@Id
	private String accountnumber; 
	private String custid;
	private String bankprdcode; 
	private String programid; 
	private String accountstatusid; 
	private double pointsaccured; 
	private String householdid; 
	private String accounttype; 
	private Timestamp created_at ;
	private Timestamp updated_at;
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
	 * @return the accountnumber
	 */
	public String getAccountnumber() {
		return accountnumber;
	}
	/**
	 * @param accountnumber the accountnumber to set
	 */
	public void setAccountnumber(String accountnumber) {
		this.accountnumber = accountnumber;
	}
	/**
	 * @return the bankprdcode
	 */
	public String getBankprdcode() {
		return bankprdcode;
	}
	/**
	 * @param bankprdcode the bankprdcode to set
	 */
	public void setBankprdcode(String bankprdcode) {
		this.bankprdcode = bankprdcode;
	}
	/**
	 * @return the programid
	 */
	public String getProgramid() {
		return programid;
	}
	/**
	 * @param programid the programid to set
	 */
	public void setProgramid(String programid) {
		this.programid = programid;
	}
	/**
	 * @return the accountstatusid
	 */
	public String getAccountstatusid() {
		return accountstatusid;
	}
	/**
	 * @param accountstatusid the accountstatusid to set
	 */
	public void setAccountstatusid(String accountstatusid) {
		this.accountstatusid = accountstatusid;
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
	 * @return the accounttype
	 */
	public String getAccounttype() {
		return accounttype;
	}
	/**
	 * @param accounttype the accounttype to set
	 */
	public void setAccounttype(String accounttype) {
		this.accounttype = accounttype;
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
	public double getPointsaccured() {
		return pointsaccured;
	}
	public void setPointsaccured(double pointsaccured) {
		this.pointsaccured = pointsaccured;
	}

	
	
	
	

}

