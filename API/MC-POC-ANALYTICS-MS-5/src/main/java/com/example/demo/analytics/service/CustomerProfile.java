package com.example.demo.analytics.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CustomerProfile {
	
	private String custid;
	private String firstname;
	private String lastname;
	private List<String> creditcards;
	private List<Profile> profiles;
	private List<Classification> mergedClassification;
	
	

	CustomerProfile(){
		super();
		profiles = new ArrayList<>();
		mergedClassification = new ArrayList<>();
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
	 * @return the firstname
	 */
	public String getFirstname() {
		return firstname;
	}
	/**
	 * @param firstname the firstname to set
	 */
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	/**
	 * @return the lastname
	 */
	public String getLastname() {
		return lastname;
	}
	/**
	 * @param lastname the lastname to set
	 */
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	/**
	 * @return the creditcards
	 */
	public List<String> getCreditcards() {
		return creditcards;
	}
	/**
	 * @param creditcards the creditcards to set
	 */
	public void setCreditcards(List<String> creditcards) {
		this.creditcards = creditcards;
	}
	/**
	 * @return the profile
	 */
	public List<Profile> getProfiles() {
		return profiles;
	}
	
	/**
	 * @return the mergedClassification
	 */
	public List<Classification> getMergedClassification() {
		return mergedClassification;
	}

	
	public void addCardProfile(String cardnumber, List<Classification> classfications ){
		Profile profile = new Profile(cardnumber, classfications);
		profiles.add(profile);
	}
	
	public void mergeProfile(){
		Map<String,Classification> objClassificationMap = new HashMap<>();

		profiles.forEach(profile ->{
		
			List<Classification> classfyList =	profile.getTransClassification();
		
			classfyList.forEach(classfy ->{
				Classification cardClasiffication = null;
				String classType = classfy.getClassType();
				cardClasiffication = objClassificationMap.get(classType);	
				if(cardClasiffication == null ){
					 cardClasiffication = new Classification(classType,classfy.getTranscount(),classfy.getAmount());
				 }else{
					 cardClasiffication.setAmount(classfy.getAmount());
					 cardClasiffication.setTranscount(classfy.getTranscount());
				 }
				 objClassificationMap.put(classType, cardClasiffication);
			});
			
		});
		
		mergedClassification = new ArrayList<>(objClassificationMap.values());
		Collections.sort(mergedClassification);
	}
	
}

class Profile {
	
	private String cardnumber;
	private List<Classification> transClassification;
	
	
	public Profile(String cardnumber,  List<Classification> classfications){
		this.cardnumber = cardnumber;
		this.transClassification = classfications;
	}
	/**
	 * @return the cardnumber
	 */
	public String getCardnumber() {
		return cardnumber;
	}
//	/**
//	 * @param cardnumber the cardnumber to set
//	 */
//	public void setCardnumber(String cardnumber) {
//		this.cardnumber = cardnumber;
//	}
	/**
	 * @return the transClassification
	 */
	public List<Classification> getTransClassification() {
		return transClassification;
	}
//	/**
//	 * @param transClassification the transClassification to set
//	 */
//	public void setTransClassification(List<Classification> transClassification) {
//		this.transClassification = transClassification;
//	}
//	
	
}
