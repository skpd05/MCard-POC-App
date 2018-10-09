package com.example.demo.analytics.model;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Cardtransaction {

	@Id
	private String transactionid;
	private String accountnumber;
	private String merchantname;
	private String merchantid;
	private double pointscaluclated;
	private String transcationtype;
	private Timestamp transactiontimestamp;
	private String transactionamount;
	private String currencycode;
	private String city;
	private String state;
	private Timestamp created_at;
	private Timestamp updated_at;

	/**
	 * @return the transactionid
	 */
	public String getTransactionid() {
		return transactionid;
	}

	/**
	 * @param transactionid
	 *            the transactionid to set
	 */
	public void setTransactionid(String transactionid) {
		this.transactionid = transactionid;
	}

	/**
	 * @return the accountnumber
	 */
	public String getAccountnumber() {
		return accountnumber;
	}

	/**
	 * @param accountnumber
	 *            the accountnumber to set
	 */
	public void setAccountnumber(String accountnumber) {
		this.accountnumber = accountnumber;
	}

	/**
	 * @return the merchantid
	 */
	public String getMerchantid() {
		return merchantid;
	}

	/**
	 * @param merchantid
	 *            the merchantid to set
	 */
	public void setMerchantid(String merchantid) {
		this.merchantid = merchantid;
	}

	/**
	 * @return the transcationtype
	 */
	public String getTranscationtype() {
		return transcationtype;
	}

	/**
	 * @param transcationtype
	 *            the transcationtype to set
	 */
	public void setTranscationtype(String transcationtype) {
		this.transcationtype = transcationtype;
	}

	/**
	 * @return the transactiontimestamp
	 */
	public Timestamp getTransactiontimestamp() {
		return transactiontimestamp;
	}

	/**
	 * @param transactiontimestamp
	 *            the transactiontimestamp to set
	 */
	public void setTransactiontimestamp(Timestamp transactiontimestamp) {
		this.transactiontimestamp = transactiontimestamp;
	}

	/**
	 * @return the transactionamount
	 */
	public String getTransactionamount() {
		return transactionamount;
	}

	/**
	 * @param transactionamount
	 *            the transactionamount to set
	 */
	public void setTransactionamount(String transactionamount) {
		this.transactionamount = transactionamount;
	}

	/**
	 * @return the currencycode
	 */
	public String getCurrencycode() {
		return currencycode;
	}

	/**
	 * @param currencycode
	 *            the currencycode to set
	 */
	public void setCurrencycode(String currencycode) {
		this.currencycode = currencycode;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return the state
	 */
	public String getState() {
		return state;
	}

	/**
	 * @param state
	 *            the state to set
	 */
	public void setState(String state) {
		this.state = state;
	}

	/**
	 * @return the created_at
	 */
	public Timestamp getCreated_at() {
		return created_at;
	}

	/**
	 * @param created_at
	 *            the created_at to set
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
	 * @param updated_at
	 *            the updated_at to set
	 */
	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}

	/**
	 * @return the merchantname
	 */
	public String getMerchantname() {
		return merchantname;
	}

	/**
	 * @param merchantname
	 *            the merchantname to set
	 */
	public void setMerchantname(String merchantname) {
		this.merchantname = merchantname;
	}

	/**
	 * @return the pointscaluclated
	 */
	public double getPointscaluclated() {
		return pointscaluclated;
	}

	/**
	 * @param pointscaluclated
	 *            the pointscaluclated to set
	 */
	public void setPointscaluclated(double pointscaluclated) {
		this.pointscaluclated = pointscaluclated;
	}

}
