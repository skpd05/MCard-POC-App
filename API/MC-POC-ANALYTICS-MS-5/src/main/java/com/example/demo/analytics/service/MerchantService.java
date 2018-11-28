package com.example.demo.analytics.service;

import org.springframework.stereotype.Service;

import com.example.demo.analytics.model.Merctranscategory;

@Service("merchantService")
public interface MerchantService {
	
	public Iterable<Merctranscategory> getAvailableMerchants();

}
