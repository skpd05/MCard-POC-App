package com.example.demo.analytics.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.analytics.model.Account;
import com.example.demo.analytics.model.AccountRepository;
import com.example.demo.analytics.model.CardTransacRepository;
import com.example.demo.analytics.model.Cardtransaction;
import com.example.demo.analytics.model.Customer;
import com.example.demo.analytics.model.CustomerRepository;
import com.example.demo.analytics.model.MerchantCategoryRepository;
import com.example.demo.analytics.model.Merctranscategory;

@Service("analyticsService")
public class AnalysticsServiceImpl implements AnalyticsService {
	
	@Autowired
	AccountRepository accountRepo;
	

	@Autowired
	CustomerRepository custReop;
	
	@Autowired
	CardTransacRepository cardTransRepo;
	
	@Autowired
	MerchantCategoryRepository mercRepo;
	
	private Map<String,String> catMap ;
	
	
	@Override
	public List<CustomerProfile> getAllCustomerProfiles() {
		Map<String, List<Account>> custMap = getCustomerMap();
		return buildProfile( custMap);
	}




	@Override
	public CustomerProfile getCustomerProfile(String custid) {
		Map<String, List<Account>> custMap = getCustomerMap(custid);
		List<CustomerProfile> profileList =  buildProfile( custMap);
		if (profileList.isEmpty()){
			return new CustomerProfile();	
		}
		return profileList.get(0);
		
	}


	
	private List<CustomerProfile> buildProfile(Map<String, List<Account>> custMap)
	{
		List<CustomerProfile> analyzedProfiles = new ArrayList<>();
		for (Map.Entry<String, List<Account>> entry : custMap.entrySet()) {
			String custId = entry.getKey();
			CustomerProfile custProfile = new CustomerProfile();
			custProfile.setCustid(custId);
	
			List<Account> accountList = entry.getValue();
			List<String> creditCardList = new ArrayList<>();
			
			
			accountList.forEach(account -> {
				String cardnumber = account.getAccountnumber();
				creditCardList.add(cardnumber);
			});
			
			custProfile.setCreditcards(creditCardList);
			buildCustomerProfile(custProfile);
			analyzedProfiles.add(custProfile);
		}
		return analyzedProfiles;
	}


	
	
	private Map<String, List<Account>> getCustomerMap(){
		Map<String, List<Account>> customerMap = new HashMap<>();
		List<Customer> custList = (List<Customer>) custReop.findAll();
		custList.forEach(customer -> {
			String custid = customer.getCustid();
			List<Account> accountList = accountRepo.findByCustid(custid);
			customerMap.put(custid, accountList);

		});
		return customerMap;
	}
	
	private Map<String, List<Account>> getCustomerMap(String custid) {
		Map<String, List<Account>> customerMap = new HashMap<>();
		List<Account> accountList = accountRepo.findByCustid(custid);
		customerMap.put(custid, accountList);
		return customerMap;
	}
	
	
	
	private Map<String,String> getMerchantRefMap()
	{
		if (this.catMap == null){
			catMap = new HashMap<>();
			List<Merctranscategory> categories = (List<Merctranscategory>) mercRepo.findAll();
			categories.forEach(category ->{
				catMap.put(String.valueOf(category.getMerchantid()), category.getClassification());
			});
		}
		return catMap;
	}
	
	
	
	private void buildCustomerProfile(CustomerProfile custProfile)
	{
		List<String> creditcards = custProfile.getCreditcards();
		
		 Map<String,String> catMap1 = getMerchantRefMap();
		 
		 creditcards.forEach(cardNumber -> {
		
			 List<Cardtransaction> cardTransList = cardTransRepo.findTransactionByAccountnumber(cardNumber);
			 Map<String,Classification> objClassificationMap = new HashMap<>();
			
			 cardTransList.forEach(transaction ->{
				 Classification cardClasiffication = null;
				 String catType = catMap1.get(transaction.getMerchantid());
				 if(catType == null ){
					 catType = "Others/Not Listed";
				 }
				 double amount =  Double.parseDouble(transaction.getTransactionamount());
				 String trType =  transaction.getTranscationtype();
				 cardClasiffication = objClassificationMap.get(catType);
				 if(cardClasiffication == null ){
					 cardClasiffication = new Classification(catType,1,amount);
				 }else{
					 cardClasiffication.setAmount(amount);
					 cardClasiffication.setTranscount(1);
				 }
				 objClassificationMap.put(catType, cardClasiffication);
				
			 });
			 
			 List<Classification> result2 = new ArrayList<>(objClassificationMap.values());
			 Collections.sort(result2);
			 custProfile.addCardProfile(cardNumber, result2);
		 });
	}






	
	
}
