package com.example.demo.analytics.service;

import java.util.List;

public interface AnalyticsService {
	
	
	public List<CustomerProfile> getAllCustomerProfiles();
	
	public CustomerProfile getCustomerProfile(String custid);

}
