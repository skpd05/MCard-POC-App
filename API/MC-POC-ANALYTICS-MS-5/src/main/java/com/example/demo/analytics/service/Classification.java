package com.example.demo.analytics.service;

public class Classification implements Comparable<Classification> {
	 
	 private String classType;
	 private  int transcount;
	 private double amount;
	 
	 Classification(String classType, int transcount, double amount){
		    this.classType = classType;
		    this.transcount = transcount;
		    this.amount = amount;
	 }
	 
	 Classification(String classType, int transcount){
		    this.classType = classType;
		    this.transcount = transcount;
		    this.amount = 0.00;
	 }
	 
	 Classification(){
		    this.amount = 0.00;
	 }
	 
	  /**
	 * @return the classType
	 */
	public String getClassType() {
		return classType;
	}


	/**
	 * @param classType the classType to set
	 */
	public void setClassType(String classType) {
		this.classType = classType;
	}


	/**
	 * @return the transcount
	 */
	public int getTranscount() {
		return transcount;
	}


	/**
	 * @param transcount the transcount to set
	 */
	public void setTranscount(int transcount) {
		int tempTransaction = this.transcount;
		this.transcount = transcount + tempTransaction;
	}


	/**
	 * @return the amount
	 */
	public double getAmount() {
		return amount;
	}


	/**
	 * @param amount the amount to set
	 */
	public void setAmount(double amount) {
		double tempAmount = this.amount;
		this.amount = tempAmount + amount;
	}

	@Override
	public int compareTo(Classification classObj) {
		 return classObj.transcount- this.transcount;
	}
	
	@Override
	public String toString(){
		return "   Classification: "+this.classType +"    transCount:  "+this.transcount +"   Amount : "+this.amount   ;
	}
	}

