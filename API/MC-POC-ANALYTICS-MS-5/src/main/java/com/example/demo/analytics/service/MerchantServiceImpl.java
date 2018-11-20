package com.example.demo.analytics.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.analytics.model.MerchantCategoryRepository;
import com.example.demo.analytics.model.Merctranscategory;

@Service
public class MerchantServiceImpl implements MerchantService{
	
	@Autowired
	MerchantCategoryRepository mercRepo;

	@Override
	public Iterable<Merctranscategory> getAvailableMerchants() {
		
		return this.mercRepo.findAll();
	}

}
